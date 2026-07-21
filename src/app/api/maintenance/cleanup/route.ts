import { del, list } from "@vercel/blob";

import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ORDER_FILES_PREFIX = "orders/";
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!cronSecret || authorization !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleteBefore = new Date(
    Date.now() - siteConfig.dataRetentionDays * DAY_IN_MILLISECONDS,
  );
  let cursor: string | undefined;
  let deletedFiles = 0;

  do {
    const page = await list({
      cursor,
      limit: 1000,
      prefix: ORDER_FILES_PREFIX,
    });
    const expiredUrls = page.blobs
      .filter((blob) => blob.uploadedAt < deleteBefore)
      .map((blob) => blob.url);

    if (expiredUrls.length > 0) {
      await del(expiredUrls);
      deletedFiles += expiredUrls.length;
    }

    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return Response.json({
    deletedFiles,
    retentionDays: siteConfig.dataRetentionDays,
  });
}
