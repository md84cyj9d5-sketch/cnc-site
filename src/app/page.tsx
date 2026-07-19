import OrderForm from "@/components/OrderForm";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const examples = [
  {
    title: "Фасады мебели",
    description: "Фасады из МДФ, фанеры и массива с узорами, пазами и рельефом.",
    mark: "▱",
  },
  {
    title: "Декоративные панели",
    description: "Резные панели, решётки и элементы декора для дома и интерьера.",
    mark: "◇",
  },
  {
    title: "Таблички и вывески",
    description: "Адресные таблички, надписи, буквы и логотипы из дерева или пластика.",
    mark: "А",
  },
  {
    title: "Детали по чертежу или фото",
    description: "Изготовление деталей на заказ по размерам, эскизу или фотографии.",
    mark: "✦",
  },
];

const materials = [
  {
    title: "Фанера",
    description: "Для декора, макетов, коробов и мебельных деталей.",
  },
  {
    title: "МДФ",
    description: "Для фасадов, панелей, вывесок и элементов интерьера.",
  },
  {
    title: "Массив дерева",
    description: "Для деталей, надписей и изделий с натуральной фактурой.",
  },
  {
    title: "Пластик",
    description: "Для табличек, шаблонов, панелей и технических деталей.",
  },
];

const steps = [
  {
    title: "Расскажите о задаче",
    description: "Пришлите чертёж, эскиз, фотографию или опишите идею своими словами.",
  },
  {
    title: "Согласуем детали",
    description: "Уточним материал, размеры и количество, затем согласуем стоимость.",
  },
  {
    title: "Изготовим заказ",
    description: "После согласования подготовим изделие и договоримся о получении.",
  },
];

const trustPoints = [
  {
    title: "По эскизу, фото или чертежу",
    description: "Не обязательно готовить сложную документацию — начнём с того, что у вас есть.",
  },
  {
    title: "Предварительное согласование",
    description: "До начала работы уточним материал, размеры, количество и согласуем стоимость.",
  },
  {
    title: "Точность изготовления",
    description: "ЧПУ-обработка помогает точно повторять размеры, контуры, пазы и отверстия.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f3] text-[#232323] font-sans">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-8 sm:gap-20 sm:px-10 sm:py-10 lg:px-16">
        <header className="flex flex-col gap-4 rounded-[24px] border border-[#d9d9d4] bg-white/90 px-5 py-4 shadow-[0_12px_30px_rgba(35,35,35,0.05)] sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="text-base font-semibold text-[#1d1d1b]">
            CNC · Ярославль
          </a>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm" aria-label="Контакты и навигация">
            <a href="#portfolio" className="font-medium text-[#4f4f4d] transition hover:text-[#35582d]">
              Наши работы
            </a>
            <a href={siteConfig.phoneHref} className="font-semibold text-[#35582d]">
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.telegramHref}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#35582d]"
            >
              Telegram
            </a>
            <a
              href="#order"
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#4f7f3f] px-5 font-semibold text-white transition hover:bg-[#3e6b33]"
            >
              Обсудить заказ
            </a>
          </nav>
        </header>

        <section className="grid gap-10 rounded-[32px] border border-[#d9d9d4] bg-white/90 p-8 shadow-[0_30px_90px_rgba(35,35,35,0.08)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-14">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-[#dee2db] bg-[#f2f5ef] px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#4a6b41]">
              Ярославль и область · частные заказы
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#111111] sm:text-5xl">
              Фрезеровка дерева и пластика на ЧПУ
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4d4d4b] sm:text-xl">
              Изготовим точно по вашим размерам — от одной детали до небольшой серии.
              Работаем с частными заказами в Ярославле и Ярославской области, поможем
              превратить чертёж, эскиз или фотографию в готовое изделие.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#order"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#4f7f3f] px-8 text-base font-semibold text-white shadow-[0_12px_28px_rgba(79,127,63,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3e6b33] hover:shadow-[0_16px_32px_rgba(79,127,63,0.34)]"
              >
                Рассчитать стоимость заказа
              </a>
              <a
                href="#examples"
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#bfc8b8] bg-[#f6f7f2] px-8 text-base font-semibold text-[#35582d] transition hover:bg-[#edf2e8]"
              >
                Что изготавливаем
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#dce3d7] bg-[#f2f5ef] p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#4a6b41]">
              С чего можно начать
            </p>
            <ul className="mt-6 space-y-4 text-base leading-7 text-[#3f493c]">
              {[
                "Готовый чертёж или файл",
                "Эскиз с размерами",
                "Фотография похожего изделия",
                "Описание идеи своими словами",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4f7f3f] text-xs text-white"
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="examples" className="scroll-mt-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#5a5a58]">
              Изделия на заказ
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
              Что изготавливаем
            </h2>
            <p className="mt-5 text-base leading-7 text-[#545454]">
              Выполняем изготовление деталей на заказ для дома, мебели, ремонта и декора.
              Если нужного изделия нет в списке, пришлите фото или опишите задачу.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {examples.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-[#e2e4df] bg-white p-6 shadow-[0_12px_24px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-[#e4eade] text-3xl font-semibold text-[#4f7f3f]">
                  {item.mark}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#1c1c1a]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#61615f]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="scroll-mt-8 rounded-[32px] border border-[#d9d9d4] bg-[#eef2e9] p-8 sm:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-[#5a5a58]">Портфолио</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
                Наши работы
              </h2>
              <p className="mt-5 text-base leading-7 text-[#545454]">
                Раздел подготовлен для фотографий готовых изделий. Добавьте реальные снимки работ,
                чтобы посетитель мог сразу оценить качество и диапазон задач.
              </p>
            </div>
            <a
              href="#order"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-[#9fac98] bg-white px-6 text-sm font-semibold text-[#35582d] transition hover:bg-[#f7f8f4]"
            >
              Хочу похожее изделие
            </a>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Мебельные фасады", "Декоративная панель", "Точная деталь по чертежу"].map(
              (title, index) => (
                <article
                  key={title}
                  className="group overflow-hidden rounded-[26px] border border-[#d6ddd1] bg-white shadow-[0_14px_30px_rgba(35,35,35,0.06)]"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(135deg,#e4eade_0%,#f8f9f5_52%,#dce6d5_100%)]">
                    <div className="flex h-28 w-28 rotate-3 items-center justify-center rounded-[28px] border border-[#aebda6] bg-white/65 text-4xl font-semibold text-[#4f7f3f] shadow-[0_16px_35px_rgba(79,127,63,0.12)]">
                      {index === 0 ? "▱" : index === 1 ? "◇" : "✦"}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#1c1c1a]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#61615f]">
                      Место для фотографии выполненной работы.
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section>
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#5a5a58]">
              Услуги и материалы
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
              Фрезеровка дерева и пластика
            </h2>
            <p className="mt-5 text-base leading-7 text-[#545454]">
              Фрезеровка дерева подходит для фасадов, декора и мебельных деталей, а
              фрезеровка пластика — для табличек, шаблонов и технических элементов.
              Вырезаем контуры, делаем пазы, отверстия, рельеф и надписи.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {materials.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-[#e5e5e1] bg-[#fafbf8] p-6"
              >
                <h3 className="text-xl font-semibold text-[#161616]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#555555]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#5a5a58]">
              Как проходит заказ
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
              От идеи до готовой детали
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#545454]">
              Начать можно с любой информации, которая у вас уже есть.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-[#dcdcd8] bg-white p-6 shadow-[0_12px_30px_rgba(29,29,29,0.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f1de] text-lg font-semibold text-[#3e6b33]">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#161616]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f5f5d]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#dde1d8] bg-white p-8 shadow-[0_30px_80px_rgba(35,35,35,0.06)] sm:p-10">
          <p className="text-sm uppercase tracking-[0.28em] text-[#5a5a58]">
            Почему нам доверяют
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-[#111111] sm:text-4xl">
            Понятный результат до начала работы
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trustPoints.map((item) => (
              <div key={item.title} className="rounded-[24px] bg-[#f6f7f2] p-6">
                <h3 className="text-lg font-semibold text-[#1d1d1b]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#575755]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="order" className="scroll-mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6 rounded-[32px] border border-[#d9d9d4] bg-[#fafbf8] p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-[#5a5a58]">
              Заявка на заказ
            </p>
            <h2 className="text-3xl font-semibold text-[#111111] sm:text-4xl">
              Расскажите, что нужно изготовить
            </h2>
            <p className="max-w-xl text-base leading-7 text-[#575755]">
              Заполните основные поля и приложите файл, если он есть. Детали можно уточнить
              после первого ответа.
            </p>
            <ul className="space-y-3 text-sm leading-6 text-[#4f4f4d]">
              <li>• Подойдёт чертёж, эскиз или фотография.</li>
              <li>• Если материал не выбран, обсудим подходящий вариант.</li>
              <li>• Стоимость согласуем до начала работы.</li>
            </ul>
          </div>
          <OrderForm />
        </section>

        <section className="rounded-[32px] border border-[#d9d9d4] bg-white p-8 shadow-[0_20px_50px_rgba(35,35,35,0.05)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#5a5a58]">Контакты</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#111111] sm:text-4xl">
                Фрезеровка ЧПУ в Ярославле и области
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#575755]">
                Свяжитесь удобным способом или отправьте заявку выше, чтобы обсудить задачу.
              </p>
            </div>
            <div className="space-y-4 rounded-[28px] border border-[#e5e5e1] bg-[#f7f8f4] p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#5a5a58]">Название</p>
                <p className="mt-2 text-lg font-semibold text-[#222222]">{siteConfig.name}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#5a5a58]">Телефон</p>
                <a href={siteConfig.phoneHref} className="mt-2 block text-base font-semibold text-[#35582d]">
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#5a5a58]">Telegram</p>
                <a
                  href={siteConfig.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-base font-semibold text-[#35582d]"
                >
                  {siteConfig.telegram}
                </a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#5a5a58]">Город</p>
                <p className="mt-2 text-base text-[#4a4a48]">{siteConfig.city}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#5a5a58]">Режим работы</p>
                <p className="mt-2 text-base text-[#4a4a48]">{siteConfig.workingHours}</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-[#d9d9d4] py-2 text-sm text-[#5f5f5d] sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.name}</p>
          <Link
            href="/privacy"
            className="font-medium text-[#35582d] underline decoration-[#9caf94] underline-offset-4 hover:text-[#294724]"
          >
            Политика конфиденциальности
          </Link>
        </footer>
      </div>
    </main>
  );
}
