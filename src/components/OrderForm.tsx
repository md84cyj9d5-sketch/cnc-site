"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import {
  CONTACT_METHODS,
  isContactMethod,
  ORDER_LIMITS,
  type ContactMethod,
} from "@/lib/orderValidation";

type Status = "idle" | "pending" | "success" | "error";
type ApiResponse = { error?: string; success?: boolean };

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const fieldClass =
  "mt-2 min-h-13 w-full rounded-xl border border-[#d8d2c9] bg-[#fcfbf9] px-4 text-base text-ink outline-none transition placeholder:text-[#969087] hover:border-[#bdb3a6] focus:border-wood-dark focus:ring-3 focus:ring-wood/15 disabled:cursor-not-allowed disabled:opacity-60";

function formatRussianPhone(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (!digits.startsWith("7")) {
    digits = `7${digits}`;
  }

  const phone = digits.slice(1, 11);
  let formatted = "+7";
  if (phone.length > 0) formatted += ` (${phone.slice(0, 3)}`;
  if (phone.length >= 3) formatted += ")";
  if (phone.length > 3) formatted += ` ${phone.slice(3, 6)}`;
  if (phone.length > 6) formatted += `-${phone.slice(6, 8)}`;
  if (phone.length > 8) formatted += `-${phone.slice(8, 10)}`;
  return formatted;
}

async function readResponse(response: Response): Promise<ApiResponse> {
  const text = await response.text();
  try {
    return text ? (JSON.parse(text) as ApiResponse) : {};
  } catch {
    if (response.status === 413) {
      return { error: "Файл слишком большой. Максимальный размер — 20 МБ." };
    }
    return { error: response.ok ? "Некорректный ответ сервера" : "Сервер временно недоступен" };
  }
}

export default function OrderForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("Телефон");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("pending");
    setMessage("");

    const formData = new FormData(form);
    const fileEntry = formData.get("file");

    try {
      if (fileEntry instanceof File && fileEntry.name) {
        if (fileEntry.size > MAX_FILE_SIZE) throw new Error("Максимальный размер файла — 20 МБ.");

        const blob = await upload(`orders/${fileEntry.name}`, fileEntry, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
        });
        formData.set("fileUrl", blob.url);
        formData.set("fileName", fileEntry.name);
      }

      formData.delete("file");
      const response = await fetch("/api/order", { method: "POST", body: formData });
      const data = await readResponse(response);
      if (!response.ok) throw new Error(data.error || "Ошибка отправки заявки");

      setStatus("success");
      setMessage("Заявка отправлена. Мы свяжемся с вами, чтобы уточнить детали.");
      form.reset();
      setContactMethod("Телефон");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Серверная ошибка. Попробуйте позже.");
    }
  }

  const pending = status === "pending";

  return (
    <form onSubmit={handleSubmit} aria-busy={pending} className="rounded-[2rem] border border-[#d4ccc0] bg-white p-5 shadow-[0_24px_70px_rgba(53,43,33,.10)] sm:p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ink">
          Имя <span className="text-wood-dark" aria-hidden="true">*</span>
          <input name="name" type="text" autoComplete="name" required maxLength={ORDER_LIMITS.name} placeholder="Как к вам обращаться" disabled={pending} className={fieldClass} />
        </label>

        <label className="block text-sm font-semibold text-ink">
          Способ связи
          <select
            name="preferredContact"
            value={contactMethod}
            disabled={pending}
            className={fieldClass}
            onChange={(event) => {
              if (isContactMethod(event.currentTarget.value)) {
                setContactMethod(event.currentTarget.value);
              }
            }}
          >
            {CONTACT_METHODS.map((method) => <option key={method} value={method}>{method}</option>)}
          </select>
        </label>

        <label className="block text-sm font-semibold text-ink sm:col-span-2">
          {contactMethod === "Телефон" ? "Номер телефона" : "Имя пользователя в Telegram"}{" "}
          <span className="text-wood-dark" aria-hidden="true">*</span>
          <input
            key={contactMethod}
            name="phone"
            type={contactMethod === "Телефон" ? "tel" : "text"}
            inputMode={contactMethod === "Телефон" ? "tel" : "text"}
            autoComplete={contactMethod === "Телефон" ? "tel" : "off"}
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="next"
            required
            minLength={contactMethod === "Телефон" ? 18 : 2}
            maxLength={contactMethod === "Телефон" ? 18 : ORDER_LIMITS.contact}
            placeholder={contactMethod === "Телефон" ? "+7 (___) ___-__-__" : "@username"}
            disabled={pending}
            onChange={contactMethod === "Телефон" ? (event) => { event.currentTarget.value = formatRussianPhone(event.currentTarget.value); } : undefined}
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-semibold text-ink">
          Материал
          <select name="material" defaultValue="" disabled={pending} className={fieldClass}>
            <option value="">Не определился</option>
            <option value="Фанера">Фанера</option>
            <option value="МДФ">МДФ</option>
            <option value="Массив дерева">Массив дерева</option>
            <option value="Пластик">Пластик</option>
            <option value="Другой">Другой материал</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-ink">
          Количество
          <input name="quantity" type="number" inputMode="numeric" min="1" max={ORDER_LIMITS.quantity} placeholder="Например, 1" disabled={pending} className={fieldClass} />
        </label>
      </div>

      <label className="mt-5 block text-sm font-semibold text-ink">
        Описание задачи <span className="text-wood-dark" aria-hidden="true">*</span>
        <textarea name="description" required maxLength={ORDER_LIMITS.description} rows={5} placeholder="Что нужно изготовить? Укажите размеры и важные особенности, если они известны." disabled={pending} className={`${fieldClass} resize-y py-3.5`} />
      </label>

      <details className="mt-5 rounded-2xl border border-[#ddd7ce] bg-[#f8f6f2] p-4 open:pb-5">
        <summary className="cursor-pointer select-none text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wood">
          Дополнительные параметры
        </summary>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-ink">Примерные размеры<input name="dimensions" type="text" maxLength={ORDER_LIMITS.dimensions} placeholder="Длина × ширина × толщина" disabled={pending} className={fieldClass} /></label>
          <label className="block text-sm font-semibold text-ink">Что уже есть<select name="sourceMaterial" defaultValue="" disabled={pending} className={fieldClass}><option value="">Не выбрано</option><option value="Чертёж">Чертёж</option><option value="Эскиз">Эскиз</option><option value="Фотография">Фотография</option><option value="Только идея">Только идея</option></select></label>
        </div>
      </details>

      <div hidden aria-hidden="true">
        <label htmlFor="website">Не заполняйте это поле</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-5 block text-sm font-semibold text-ink">
        Прикрепить файл
        <input name="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.dxf,.svg,.step,.stp,.stl,.zip" disabled={pending} aria-describedby="file-help" className="mt-2 block w-full cursor-pointer rounded-xl border border-dashed border-[#c7bcae] bg-[#f8f6f2] p-2 text-sm text-muted file:mr-4 file:min-h-11 file:cursor-pointer file:rounded-lg file:border-0 file:bg-ink file:px-4 file:text-sm file:font-semibold file:text-white hover:border-wood-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood" />
      </label>
      <p id="file-help" className="mt-2 text-xs leading-5 text-muted">PDF, JPG, PNG, DXF, SVG, STEP, STP, STL или ZIP · до 20 МБ. Файл будет доступен мастеру по уникальной публичной ссылке.</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-[minmax(190px,.8fr)_1.2fr] sm:items-center">
        <button type="submit" disabled={pending} className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-ink px-6 text-base font-semibold text-white shadow-[0_12px_28px_rgba(30,29,27,.16)] transition hover:-translate-y-0.5 hover:bg-[#393733] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wood disabled:cursor-wait disabled:transform-none disabled:opacity-65">
          {pending ? "Отправляем…" : "Отправить на расчёт"}
        </button>
        <p className="text-xs leading-5 text-muted">Нажимая кнопку, вы соглашаетесь на обработку персональных данных. <Link href="/privacy" className="font-semibold text-ink underline decoration-[#b89b79] underline-offset-4 hover:text-wood-dark">Политика конфиденциальности</Link></p>
      </div>

      {message ? <div aria-live="polite" role="status" className={`mt-5 rounded-xl border px-4 py-3 text-sm ${status === "success" ? "border-[#9db792] bg-[#eef5eb] text-[#36512e]" : "border-[#d9aaa3] bg-[#fbefed] text-[#7a3028]"}`}>{message}</div> : null}
    </form>
  );
}
