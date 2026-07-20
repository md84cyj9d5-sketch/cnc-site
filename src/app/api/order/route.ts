import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Неверный тип запроса" }, { status: 400 });
  }

  const formData = await request.formData();
  const name = formData.get("name");
  const phone = formData.get("phone");
  const preferredContact = formData.get("preferredContact") || "Не указано";
  const material = formData.get("material") || "Не указано";
  const dimensions = formData.get("dimensions") || "Не указано";
  const quantity = formData.get("quantity") || "Не указано";
  const sourceMaterial = formData.get("sourceMaterial") || "Не указано";
  const description = formData.get("description");
  const fileUrl = getBlobUrl(formData.get("fileUrl"));
  const fileName = formData.get("fileName");

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Поле имя обязательно" }, { status: 400 });
  }

  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ error: "Поле телефон обязательно" }, { status: 400 });
  }

  if (!description || typeof description !== "string" || !description.trim()) {
    return NextResponse.json({ error: "Поле описание заказа обязательно" }, { status: 400 });
  }

  if (fileName && typeof fileName === "string" && fileName.trim()) {
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
    `<b>Телефон:</b> ${formatTelegramValue(phone)}`,
    `<b>Предпочтительный способ связи:</b> ${formatTelegramValue(preferredContact)}`,
    `<b>Материал:</b> ${formatTelegramValue(material)}`,
    `<b>Примерные размеры:</b> ${formatTelegramValue(dimensions)}`,
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
    const errorText = error instanceof Error ? error.message : "Ошибка отправки в Telegram";
    return NextResponse.json({ error: errorText }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
