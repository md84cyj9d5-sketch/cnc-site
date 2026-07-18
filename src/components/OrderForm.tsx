"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "pending" | "success" | "error";

export default function OrderForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus("pending");
    setMessage("");

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Ошибка отправки заявки");
      }

      setStatus("success");
      setMessage("Заявка отправлена, мы скоро свяжемся с вами.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Серверная ошибка. Попробуйте позже.");
    }
  }

  return (
    <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-[32px] border border-[#d9d9d4] bg-white p-10 shadow-[0_20px_50px_rgba(35,35,35,0.05)]"
      >
      <label className="block text-sm font-medium text-[#2c2c2a]">
        Имя
        <input
          name="name"
          type="text"
          required
          placeholder="Ваше имя"
          className="mt-2 h-12 w-full rounded-2xl border border-[#d8d8d4] bg-[#fbfcf9] px-4 text-sm text-[#232323] outline-none transition focus:border-[#4f7f3f]"
        />
      </label>

      <label className="block text-sm font-medium text-[#2c2c2a]">
        Телефон
        <input
          name="phone"
          type="text"
          required
          placeholder="Телефон"
          className="mt-2 h-12 w-full rounded-2xl border border-[#d8d8d4] bg-[#fbfcf9] px-4 text-sm text-[#232323] outline-none transition focus:border-[#4f7f3f]"
        />
      </label>

      <label className="block text-sm font-medium text-[#2c2c2a]">
        Предпочтительный способ связи
        <select
          name="preferredContact"
          className="mt-2 h-12 w-full rounded-2xl border border-[#d8d8d4] bg-[#fbfcf9] px-4 text-sm text-[#232323] outline-none transition focus:border-[#4f7f3f]"
        >
          <option value="">Не важно</option>
          <option value="Телефон">Телефон</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Telegram">Telegram</option>
          <option value="Email">Email</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-[#2c2c2a]">
        Материал
        <select
          name="material"
          className="mt-2 h-12 w-full rounded-2xl border border-[#d8d8d4] bg-[#fbfcf9] px-4 text-sm text-[#232323] outline-none transition focus:border-[#4f7f3f]"
        >
          <option value="">Выберите материал</option>
          <option value="Фанера">Фанера</option>
          <option value="МДФ">МДФ</option>
          <option value="Массив дерева">Массив дерева</option>
          <option value="Пластик">Пластик</option>
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#2c2c2a]">
          Размеры
          <input
            name="dimensions"
            type="text"
            placeholder="Длина × ширина × высота"
            className="mt-2 h-12 w-full rounded-2xl border border-[#d8d8d4] bg-[#fbfcf9] px-4 text-sm text-[#232323] outline-none transition focus:border-[#4f7f3f]"
          />
        </label>
        <label className="block text-sm font-medium text-[#2c2c2a]">
          Количество
          <input
            name="quantity"
            type="number"
            min="1"
            placeholder="1"
            className="mt-2 h-12 w-full rounded-2xl border border-[#d8d8d4] bg-[#fbfcf9] px-4 text-sm text-[#232323] outline-none transition focus:border-[#4f7f3f]"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-[#2c2c2a]">
        Описание заказа
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Укажите задачу, размеры, срок, особенности"
          className="mt-2 w-full rounded-3xl border border-[#d8d8d4] bg-[#fbfcf9] px-4 py-3 text-sm text-[#232323] outline-none transition focus:border-[#4f7f3f]"
        />
      </label>

      <label className="block text-sm font-medium text-[#2c2c2a]">
        Файл (необязательно)
        <input
          name="file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.dxf,.svg,.step,.stp,.stl,.zip"
          className="mt-2 w-full rounded-2xl border border-[#d8d8d4] bg-[#fbfcf9] px-4 py-3 text-sm text-[#232323] outline-none transition focus:border-[#4f7f3f]"
        />
      </label>

      <div className="rounded-[18px] border border-[#d9d9d4] bg-[#f7f8f3] p-4 text-sm text-[#4f4f4d]">
        Допустимые файлы: PDF, JPG, JPEG, PNG, DXF, SVG, STEP, STP, STL, ZIP. Максимальный размер 20 МБ.
      </div>

      <button
        type="submit"
        disabled={status === "pending"}
        className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#4f7f3f] px-6 text-base font-semibold text-white transition hover:bg-[#3e6b33] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "pending" ? "Отправляем..." : "Отправить заявку"}
      </button>

      {message ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-[#8ec77b] bg-[#ecf7e7] text-[#2a5c23]"
              : "border-[#e3b4b4] bg-[#f8e6e6] text-[#7a2727]"
          }`}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
