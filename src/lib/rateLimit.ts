type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const records = new Map<string, RateLimitRecord>();

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  if (records.size > 1_000) {
    for (const [recordKey, record] of records) {
      if (record.resetAt <= now) records.delete(recordKey);
    }
  }

  const current = records.get(key);

  if (!current || current.resetAt <= now) {
    records.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
