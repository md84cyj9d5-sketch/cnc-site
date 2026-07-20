import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-4 py-16 text-ink">
      <div className="max-w-xl text-center">
        <p className="eyebrow">Ошибка 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Страница не найдена</h1>
        <p className="mt-5 text-base leading-7 text-muted">Возможно, адрес изменился или в ссылке допущена ошибка.</p>
        <Link href="/" className="mt-8 inline-flex min-h-13 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#393733] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wood">
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
