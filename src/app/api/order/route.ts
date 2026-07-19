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
const MAX_FILE_SIZE = 20 * 1024 * 1024;

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

async function sendTelegramDocument(file: File) {
  const token = getEnv("TELEGRAM_BOT_TOKEN");
  const chatId = getEnv("TELEGRAM_CHAT_ID");
  const url = `https://api.telegram.org/bot${token}/sendDocument`;

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("document", file, file.name);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendDocument failed: ${response.status} ${body}`);
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
  const file = formData.get("file");

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Поле имя обязательно" }, { status: 400 });
  }

  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ error: "Поле телефон обязательно" }, { status: 400 });
  }

  if (!description || typeof description !== "string" || !description.trim()) {
    return NextResponse.json({ error: "Поле описание заказа обязательно" }, { status: 400 });
  }

  let documentFile: File | null = null;

  if (file && file instanceof File && file.name) {
    const extension = getExtension(file.name);
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json({ error: `Недопустимый формат файла: ${extension}` }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Максимальный размер файла 20 МБ" }, { status: 400 });
    }

    documentFile = file;
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
  ].join("\n");

  try {
    await sendTelegramMessage(message);
    if (documentFile) {
      await sendTelegramDocument(documentFile);
    }
  } catch (error) {
    const errorText = error instanceof Error ? error.message : "Ошибка отправки в Telegram";
    return NextResponse.json({ error: errorText }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
