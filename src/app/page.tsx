import Link from "next/link";
import CncProcessVisual from "@/components/CncProcessVisual";
import OrderForm from "@/components/OrderForm";
import PortfolioGallery from "@/components/PortfolioGallery";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/config/site";

const benefits = [
  ["01", "Работаем по вашим данным", "Подойдёт чертёж, эскиз, фотография или понятное описание задачи."],
  ["02", "Помогаем с файлом", "Проверим исходные данные и подскажем, что нужно подготовить для станка."],
  ["03", "Берём единичные изделия", "Можно обратиться за одной деталью, прототипом или небольшим тиражом."],
  ["04", "Точная обработка", "Повторяем заданные контуры, отверстия, пазы, выборки и рельеф."],
  ["05", "Расчёт до начала работ", "Сначала уточняем параметры, затем сообщаем стоимость и условия изготовления."],
  ["06", "Файл прямо в заявке", "Чертёж или эскиз можно прикрепить к форме — он придёт вместе с описанием."],
] as const;

const products = [
  ["Панели", "Декоративные панели", "Резные экраны, решётки и рельефные элементы для интерьера."],
  ["Знаки", "Вывески и надписи", "Таблички, буквы, адресные знаки и элементы оформления."],
  ["Мебель", "Мебельные детали", "Фасады, вставки, полки, накладки и детали нестандартной формы."],
  ["Интерьер", "Элементы интерьера", "Декор, стеновые элементы и детали для частных проектов."],
  ["Оснастка", "Шаблоны и формы", "Шаблоны, лекала, матрицы и вспомогательные элементы."],
  ["По файлу", "Детали по чертежам", "Индивидуальные детали по размерам, эскизу или готовой модели."],
] as const;

const materials = [
  ["01", "Фанера", "Контурная резка, пазы, выборки и гравировка для декора и деталей."],
  ["02", "МДФ", "Фасады, рельефные панели, накладки и элементы интерьера."],
  ["03", "Массив дерева", "Детали и изделия, где важны натуральная фактура и выразительный рельеф."],
  ["04", "Пластик", "Таблички, шаблоны, панели и технические детали разных форм."],
] as const;

const steps = [
  ["01", "Отправляете задачу", "Описываете изделие и прикладываете файл, эскиз или фотографию."],
  ["02", "Уточняем детали", "Обсуждаем материал, размеры, количество и требования к обработке."],
  ["03", "Делаем расчёт", "Сообщаем стоимость и условия изготовления до начала работ."],
  ["04", "Изготавливаем", "Фрезеруем детали и договариваемся о передаче готового заказа."],
] as const;

const priceFactors = [
  "Материал и его толщина",
  "Габариты изделия",
  "Сложность обработки",
  "Длина траектории фрезы",
  "Количество деталей",
  "Подготовка макета",
] as const;

const buttonPrimary =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_28px_rgba(30,29,27,.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#393733] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wood";
const buttonSecondary =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-center text-sm font-semibold text-ink transition duration-200 hover:border-[#b7aa99] hover:bg-[#faf8f4] active:bg-[#f1ede7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wood";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <div className="overflow-hidden bg-canvas text-ink">
      <header className="sticky top-0 z-20 border-b border-line/80 bg-canvas/95 backdrop-blur-sm">
        <div className="page-shell flex min-h-20 items-center justify-between gap-5">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-[-0.02em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wood">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink font-mono text-xs text-white">CNC</span>
            <span className="hidden sm:block">Фрезеровка · Ярославль</span>
            <span className="text-sm sm:hidden">Ярославль</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted lg:flex" aria-label="Основная навигация">
            <a className="nav-link" href="#products">Изделия</a>
            <a className="nav-link" href="#materials">Материалы</a>
            <a className="nav-link" href="#portfolio">Примеры</a>
            <a className="nav-link" href="#process">Как работаем</a>
          </nav>
          <a href="#order" className={`${buttonPrimary} min-h-11 px-5 py-2.5`}>Отправить задачу</a>
        </div>
        <nav className="border-t border-line/70 lg:hidden" aria-label="Навигация по странице">
          <div className="page-shell flex gap-5 overflow-x-auto py-3 text-sm text-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <a className="nav-link shrink-0" href="#products">Изделия</a>
            <a className="nav-link shrink-0" href="#materials">Материалы</a>
            <a className="nav-link shrink-0" href="#portfolio">Примеры</a>
            <a className="nav-link shrink-0" href="#process">Как работаем</a>
            <a className="nav-link shrink-0" href="#price">Стоимость</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="page-shell grid gap-12 pb-20 pt-10 lg:grid-cols-[1.03fr_.97fr] lg:items-center lg:pb-28 lg:pt-16">
          <div>
            <p className="eyebrow"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-wood" />Ярославль и Ярославская область</p>
            <h1 className="mt-7 max-w-3xl text-balance text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[.94] tracking-[-0.065em]">
              Фрезеровка дерева и пластика <span className="text-wood-dark">на ЧПУ</span>
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl">
              Изготавливаем детали и изделия по чертежу, эскизу или фотографии. Поможем подготовить задачу — от одной детали до небольшой серии.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#order" className={buttonPrimary}>Отправить на расчёт <Arrow /></a>
              <a href="#products" className={buttonSecondary}>Что можем изготовить</a>
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-5 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
              {[["Формат", "От 1 детали"], ["Основа", "Ваш файл или эскиз"], ["Материалы", "Дерево и пластик"], ["Связь", "Форма или Telegram"]].map(([term, value]) => (
                <div key={term}><dt className="font-mono text-[.68rem] uppercase tracking-[.14em] text-faint">{term}</dt><dd className="mt-2 text-sm font-semibold leading-5">{value}</dd></div>
              ))}
            </dl>
          </div>
          <CncProcessVisual />
        </section>

        <section className="border-y border-line bg-white">
          <h2 className="sr-only">Преимущества работы с мастерской</h2>
          <div className="page-shell grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
            {benefits.map(([number, title, description]) => (
              <article key={number} className="bg-white py-7 md:px-7 xl:first:pl-0 xl:last:pr-0">
                <div className="flex items-start gap-5"><span className="font-mono text-xs text-wood-dark">{number}</span><div><h3 className="text-lg font-semibold tracking-[-0.02em]">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></div></div>
              </article>
            ))}
          </div>
        </section>

        <section id="products" className="page-shell section-space scroll-mt-24">
          <SectionHeading eyebrow="Возможности" title="Что можем изготовить" description="Фрезеровка подходит и для функциональных деталей, и для аккуратного интерьерного декора. Если вашей задачи нет в списке — пришлите описание на расчёт." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {products.map(([label, title, description], index) => (
              <article key={title} className="min-h-0 bg-white p-7 sm:min-h-64 sm:p-8">
                <div className="flex items-center justify-between"><span className="rounded-full border border-line px-3 py-1 font-mono text-[.68rem] uppercase tracking-[.12em] text-muted">{label}</span><span className="font-mono text-xs text-faint">0{index + 1}</span></div>
                <h3 className="mt-9 text-2xl font-semibold tracking-[-0.035em] sm:mt-14">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="materials" className="bg-ink text-white scroll-mt-20">
          <div className="page-shell section-space">
            <SectionHeading inverse eyebrow="Материалы" title="Подбираем обработку под материал и задачу" description="Работаем с распространёнными листовыми материалами и массивом. Возможность обработки конкретной заготовки уточним до расчёта." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {materials.map(([number, title, description]) => (
                <article key={number} className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[.045] p-7">
                  <div className="absolute -right-8 -top-9 h-32 w-32 rounded-full border border-wood/20" /><span className="font-mono text-xs text-wood-light">{number}</span><h3 className="mt-16 text-2xl font-semibold sm:mt-24">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PortfolioGallery />

        <section id="process" className="border-y border-line bg-white scroll-mt-20">
          <div className="page-shell section-space grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Порядок работы" title="От задачи до готовой детали — четыре шага" description="Не обязательно разбираться в технологии. Начните с того, что у вас уже есть, а технические параметры уточним вместе." />
            <ol className="border-t border-line">
              {steps.map(([number, title, description]) => (
                <li key={number} className="grid gap-3 border-b border-line py-7 sm:grid-cols-[3rem_12rem_1fr] sm:items-start"><span className="font-mono text-xs text-wood-dark">{number}</span><h3 className="font-semibold">{title}</h3><p className="text-sm leading-6 text-muted">{description}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section id="price" className="page-shell section-space grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div><SectionHeading eyebrow="Расчёт стоимости" title="Цена зависит от параметров конкретной детали" description="У фрезеровки нет универсальной цены за изделие: на расчёт влияет материал, объём обработки и подготовка исходных данных. Пришлите задачу — уточним параметры и сделаем предварительную оценку." /><a href="#order" className={`${buttonPrimary} mt-8`}>Перейти к форме расчёта <Arrow /></a></div>
          <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2">
            {priceFactors.map((factor, index) => <li key={factor} className="flex min-h-28 items-start gap-4 bg-white p-6"><span className="font-mono text-xs text-wood-dark">0{index + 1}</span><span className="font-semibold leading-6">{factor}</span></li>)}
          </ul>
        </section>

        <section id="order" className="scroll-mt-20 bg-[#e8e1d7]">
          <div className="page-shell section-space grid gap-10 lg:grid-cols-[.76fr_1.24fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start"><SectionHeading eyebrow="Заявка на расчёт" title="Расскажите, что нужно изготовить" description="Заполните основные поля и приложите файл, если он есть. Заявка и файл будут отправлены мастеру через Telegram." /><ul className="mt-8 space-y-3 text-sm leading-6 text-muted"><li>— Подойдёт чертёж, эскиз или фотография</li><li>— Материал можно уточнить после отправки</li><li>— Стоимость согласуем до начала работы</li></ul></div>
            <OrderForm />
          </div>
        </section>

        <section className="bg-ink py-16 text-white sm:py-20">
          <div className="page-shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow text-wood-light">Удобнее написать напрямую?</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">Обсудите задачу с мастером в Telegram</h2></div><a href={siteConfig.telegramHref} target="_blank" rel="noreferrer" className="inline-flex min-h-13 shrink-0 items-center justify-center rounded-full bg-wood px-6 py-3 text-sm font-semibold text-[#211b15] transition hover:bg-wood-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Открыть Telegram <Arrow /></a></div>
        </section>
      </main>

      <footer className="bg-[#171816] py-12 text-white/62">
        <div className="page-shell grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div><p className="text-lg font-semibold text-white">CNC · Ярославль</p><p className="mt-3 max-w-sm text-sm leading-6">ЧПУ-фрезеровка фанеры, МДФ, массива дерева и пластика для частных заказчиков.</p></div>
          <div><p className="font-mono text-[.68rem] uppercase tracking-[.16em] text-white/65">Контакты</p><div className="mt-4 space-y-2 text-sm"><a className="footer-link" href={siteConfig.phoneHref}>Телефон: {siteConfig.phone}</a><a className="footer-link" href={siteConfig.telegramHref} target="_blank" rel="noreferrer">Telegram: {siteConfig.telegram}</a><a className="footer-link" href={siteConfig.mapHref} target="_blank" rel="noreferrer">{siteConfig.city}</a><p>{siteConfig.workingHours}</p></div></div>
          <div><p className="font-mono text-[.68rem] uppercase tracking-[.16em] text-white/65">Информация</p><div className="mt-4 space-y-2 text-sm"><a className="footer-link" href="#products">Что изготавливаем</a><a className="footer-link" href="#price">Расчёт стоимости</a><Link className="footer-link" href="/privacy">Политика конфиденциальности</Link></div></div>
        </div>
      </footer>
    </div>
  );
}
