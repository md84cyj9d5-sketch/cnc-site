export const ORDER_LIMITS = {
  name: 80,
  contact: 64,
  description: 2800,
  dimensions: 160,
  quantity: 10_000,
  fileName: 180,
} as const;

export const CONTACT_METHODS = ["Телефон", "Telegram"] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export const MATERIALS = ["Фанера", "МДФ", "Массив дерева", "Пластик", "Другой"] as const;
export const SOURCE_MATERIALS = ["Чертёж", "Эскиз", "Фотография", "Только идея"] as const;

export function isContactMethod(value: string): value is ContactMethod {
  return CONTACT_METHODS.some((method) => method === value);
}

export function isValidContact(value: string, method: ContactMethod): boolean {
  if (method === "Телефон") {
    return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
  }

  return /^@[a-zA-Z0-9_]{5,32}$/.test(value);
}

export function isAllowedValue<T extends readonly string[]>(
  value: string,
  allowed: T,
): value is T[number] {
  return allowed.some((item) => item === value);
}
