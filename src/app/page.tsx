import OrderForm from "@/components/OrderForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f3] text-[#232323] font-sans">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-20 px-6 py-10 sm:px-10 lg:px-16">
        <section className="grid gap-10 rounded-[32px] border border-[#d9d9d4] bg-white/90 p-8 shadow-[0_30px_90px_rgba(35,35,35,0.08)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-14">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-[#dee2db] bg-[#f2f5ef] px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.24em] text-[#4a6b41]">
              Ярославль и область
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#111111] sm:text-5xl">
              Фрезеровка по дереву и пластику на заказ
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4d4d4b] sm:text-xl">
              Работаем по файлу, эскизу или фотографии — изготовим корпусные детали, вывески, панели и декор с точной резкой и чистой отделкой.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#order"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#4f7f3f] px-8 text-base font-semibold text-white transition hover:bg-[#3e6b33]"
              >
                Отправить заявку
              </a>
              <div className="rounded-full border border-[#d9d9d4] bg-[#f6f7f2] px-6 py-3 text-sm text-[#535353]">
                Быстро отвечаем, производство в Ярославле, доставка по области.
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Фанера", subtitle: "легкая и прочная" },
              { title: "МДФ", subtitle: "гладкая поверхность" },
              { title: "Массив дерева", subtitle: "натуральный стиль" },
              { title: "Пластик", subtitle: "устойчивый к влаге" },
            ].map((item) => (
              <div key={item.title} className="rounded-[24px] border border-[#e5e5e1] bg-[#fafbf8] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-[#6b6b6a]">Материал</p>
                <h2 className="mt-4 text-2xl font-semibold text-[#161616]">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#555555]">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-[#5a5a58]">Как проходит заказ</p>
            <h2 className="text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">Три простых этапа до готового изделия</h2>
            <p className="max-w-xl text-base leading-7 text-[#545454]">
              Вы можете прислать чертёж, фотографию или эскиз, а мы подготовим технологическую карту, согласуем детали и запустим фрезеровку.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Заявка",
                description: "Отправляете файл, эскиз или фото, описываете задачу."
              },
              {
                title: "Согласование",
                description: "Уточняем размеры, материал и сроки."
              },
              {
                title: "Изготовление",
                description: "Начинаем резку и доводим деталь до готовности."
              },
            ].map((item, index) => (
              <div key={item.title} className="rounded-[24px] border border-[#dcdcd8] bg-white p-6 shadow-[0_12px_30px_rgba(29,29,29,0.06)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f1de] text-lg font-semibold text-[#3e6b33]">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#161616]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f5f5d]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-[#5a5a58]">Примеры работ</p>
            <h2 className="text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">Готовые проекты из дерева и пластика</h2>
            <p className="max-w-xl text-base leading-7 text-[#545454]">
              Показываем качество резки, аккуратные фаски и ровную поверхность. Примеры изделий подойдут для дверей, вывесок и декоративных деталей.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Вывеска с логотипом",
              "Декоративная панель",
              "Корпусная деталь",
              "Промо-панель"
            ].map((label) => (
              <div key={label} className="group relative overflow-hidden rounded-[28px] border border-[#e6e6e2] bg-[#f9faf7] p-6 text-sm text-[#4c4c4a] shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
                <div className="mb-4 h-44 rounded-[20px] bg-[#dde3d7]" />
                <p className="font-semibold text-[#1c1c1a]">{label}</p>
                <p className="mt-2 text-xs leading-5 text-[#61615f]">Чистая резка, профессиональная обработка кромок.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#dde1d8] bg-white p-10 shadow-[0_30px_80px_rgba(35,35,35,0.06)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#5a5a58]">Наши преимущества</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#111111] sm:text-4xl">Почему выбирают именно нас</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#575755]">
              Современное оборудование, стабильное качество и индивидуальный подход к каждому заказу.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Локальное производство",
              "Точный раскрой",
              "Быстрый расчет",
              "Контроль качества"
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-[#e8e8e3] bg-[#f6f7f2] p-6">
                <p className="text-base font-semibold text-[#1d1d1b]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="order" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6 rounded-[32px] border border-[#d9d9d4] bg-[#fafbf8] p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-[#5a5a58]">Заявка на заказ</p>
            <h2 className="text-3xl font-semibold text-[#111111] sm:text-4xl">Оставьте заявку — мы свяжемся в течение рабочего дня</h2>
            <p className="max-w-xl text-base leading-7 text-[#575755]">
              Заполните форму, укажите материал и назначение детали. Поможем выбрать оптимальный вариант в пределах бюджета.
            </p>
            <ul className="space-y-3 text-sm leading-6 text-[#4f4f4d]">
              <li>• Бесплатный предварительный расчёт по материалу и сложности.</li>
              <li>• Точные размеры и допуски для удобной сборки.</li>
              <li>• Возможность срочного изготовления по согласованию.</li>
            </ul>
          </div>
          <OrderForm />
        </section>

        <section className="rounded-[32px] border border-[#d9d9d4] bg-white p-10 shadow-[0_20px_50px_rgba(35,35,35,0.05)]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#5a5a58]">Контакты</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#111111] sm:text-4xl">Работаем в Ярославле и Ярославской области</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#575755]">
                Производство в пределах города, выезд на замер возможен. Обсудим проект по телефону или в мессенджерах.
              </p>
            </div>
            <div className="space-y-4 rounded-[28px] border border-[#e5e5e1] bg-[#f7f8f4] p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#5a5a58]">Телефон</p>
                <p className="mt-2 text-lg font-semibold text-[#222222]">+7 (999) 123-45-67</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#5a5a58]">Email</p>
                <p className="mt-2 text-lg font-semibold text-[#222222]">cnc.yaroslavl@example.com</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#5a5a58]">Адрес</p>
                <p className="mt-2 text-base text-[#4a4a48]">г. Ярославль, производственная зона</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
