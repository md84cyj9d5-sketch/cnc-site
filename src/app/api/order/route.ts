import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import {
  isAllowedValue,
  isContactMethod,
  isValidContact,
  MATERIALS,
  ORDER_LIMITS,
  SOURCE_MATERIALS,
} from "@/lib/orderValidation";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { isSameOriginRequest } from "@/lib/requestSecurity";

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".dxf",
  ".svg",
  ".step",
  ".stp",
  ".stl",
  ".zip",
];
function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Не задано окружение ${name}`);
  }
  return value;
}

function getExtension(filename: string): string {
  const lower = filename.toLowerCase();
  const match = lower.match(/\.[^\.]+$/);
  return match ? match[0] : "";
}

function getStringField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function formatTelegramValue(value: FormDataEntryValue | null, fallback = "Не указано"): string {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  return value
    .trim()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function sendTelegramMessage(text: string) {
  const token = getEnv("TELEGRAM_BOT_TOKEN");
  const chatId = getEnv("TELEGRAM_CHAT_ID");
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`);
  }
}

function getBlobUrl(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const url = new URL(value);
    const isVercelBlob =
      url.protocol === "https:" &&
      (url.hostname.endsWith(".public.blob.vercel-storage.com") ||
        url.hostname.endsWith(".blob.vercel-storage.com"));

    return isVercelBlob ? url.toString() : null;
  } catch {
    return null;
  }
}

async function deleteUploadedFile(url: string) {
  try {
    await del(url);
  } catch (error) {
    console.error("Failed to delete an undelivered order file", error);
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Запрос отклонён" }, { status: 403 });
  }

  const rateLimit = consumeRateLimit(`order:${getClientIp(request)}`, 6, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Слишком много заявок. Попробуйте снова немного позже." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Неверный тип запроса" }, { status: 400 });
  }

  const formData = await request.formData();
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim()) {
    return NextResponse.json({ success: true });
  }

  const name = getStringField(formData, "name");
  const phone = getStringField(formData, "phone");
  const preferredContactValue = getStringField(formData, "preferredContact") || "Телефон";
  const materialValue = getStringField(formData, "material");
  const dimensions = getStringField(formData, "dimensions");
  const quantityValue = getStringField(formData, "quantity");
  const sourceMaterialValue = getStringField(formData, "sourceMaterial");
  const description = getStringField(formData, "description");
  const fileUrl = getBlobUrl(formData.get("fileUrl"));
  const fileName = getStringField(formData, "fileName");

  if (!name) {
    return NextResponse.json({ error: "Поле имя обязательно" }, { status: 400 });
  }
  if (name.length > ORDER_LIMITS.name) {
    return NextResponse.json({ error: "Имя слишком длинное" }, { status: 400 });
  }

  if (!isContactMethod(preferredContactValue)) {
    return NextResponse.json({ error: "Выберите способ связи" }, { status: 400 });
  }
  if (!phone || phone.length > ORDER_LIMITS.contact || !isValidContact(phone, preferredContactValue)) {
    const error = preferredContactValue === "Телефон"
      ? "Укажите телефон полностью"
      : "Укажите Telegram в формате @username";
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!description) {
    return NextResponse.json({ error: "Поле описание заказа обязательно" }, { status: 400 });
  }
  if (description.length > ORDER_LIMITS.description) {
    return NextResponse.json({ error: "Описание задачи слишком длинное" }, { status: 400 });
  }

  if (materialValue && !isAllowedValue(materialValue, MATERIALS)) {
    return NextResponse.json({ error: "Неизвестный материал" }, { status: 400 });
  }
  if (sourceMaterialValue && !isAllowedValue(sourceMaterialValue, SOURCE_MATERIALS)) {
    return NextResponse.json({ error: "Неизвестный тип исходных данных" }, { status: 400 });
  }
  if (dimensions.length > ORDER_LIMITS.dimensions) {
    return NextResponse.json({ error: "Описание размеров слишком длинное" }, { status: 400 });
  }

  let quantity = "Не указано";
  if (quantityValue) {
    const parsedQuantity = Number(quantityValue);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > ORDER_LIMITS.quantity) {
      return NextResponse.json({ error: "Укажите корректное количество деталей" }, { status: 400 });
    }
    quantity = String(parsedQuantity);
  }

  const preferredContact = preferredContactValue;
  const material = materialValue || "Не указано";
  const sourceMaterial = sourceMaterialValue || "Не указано";

  if (Boolean(fileUrl) !== Boolean(fileName)) {
    return NextResponse.json({ error: "Не удалось подтвердить загруженный файл" }, { status: 400 });
  }

  if (fileName) {
    if (fileName.length > ORDER_LIMITS.fileName) {
      return NextResponse.json({ error: "Имя файла слишком длинное" }, { status: 400 });
    }
    const extension = getExtension(fileName);
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json({ error: `Недопустимый формат файла: ${extension}` }, { status: 400 });
    }

    if (!fileUrl) {
      return NextResponse.json({ error: "Не удалось подтвердить загруженный файл" }, { status: 400 });
    }
  }

  const message = [
    `<b>Новая заявка на фрезеровку</b>`,
    `<b>Имя:</b> ${formatTelegramValue(name)}`,
    `<b>Телефон / Telegram:</b> ${formatTelegramValue(phone)}`,
    `<b>Предпочтительный способ связи:</b> ${formatTelegramValue(preferredContact)}`,
    `<b>Материал:</b> ${formatTelegramValue(material)}`,
    `<b>Примерные размеры:</b> ${formatTelegramValue(dimensions || null)}`,
    `<b>Количество деталей:</b> ${formatTelegramValue(quantity)}`,
    `<b>У клиента есть:</b> ${formatTelegramValue(sourceMaterial)}`,
    `<b>Описание:</b> ${formatTelegramValue(description)}`,
    fileUrl
      ? `<b>Файл:</b> <a href="${fileUrl}">${formatTelegramValue(fileName)}</a>`
      : `<b>Файл:</b> Не приложен`,
  ].join("\n");

  try {
    await sendTelegramMessage(message);
  } catch (error) {
    if (fileUrl) await deleteUploadedFile(fileUrl);
    console.error("Telegram order delivery failed", error);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте позже или напишите нам в Telegram." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
