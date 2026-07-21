import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { isSameOriginRequest } from "@/lib/requestSecurity";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/vnd.dxf",
  "application/dxf",
  "application/x-dxf",
  "model/stl",
  "application/sla",
  "application/vnd.ms-pki.stl",
  "model/step",
  "application/step",
];

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const rateLimit = consumeRateLimit(`blob:${getClientIp(request)}`, 20, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Слишком много попыток загрузки. Попробуйте позже." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const body = (await request.json()) as HandleUploadBody;

    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!isSameOriginRequest(request)) {
          throw new Error("Запрос отклонён");
        }

        if (!pathname.startsWith("orders/")) {
          throw new Error("Недопустимый путь загрузки");
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
      onUploadCompleted: async () => {
        // The order endpoint receives the resulting Blob URL from the browser.
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ошибка загрузки файла";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
