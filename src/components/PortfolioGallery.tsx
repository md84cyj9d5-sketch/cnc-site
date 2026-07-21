"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";

type PortfolioImage = {
  src: string;
  alt: string;
  position?: string;
};

type PortfolioProject = {
  title: string;
  description: string;
  images: readonly PortfolioImage[];
};

const projects: readonly PortfolioProject[] = [
  {
    title: "Резная рама для иконы",
    description: "Изготовление декоративных элементов с детальной проработкой растительного орнамента.",
    images: [{ src: "/images/portfolio/work-01.webp", alt: "Резная деревянная рама для иконы с растительным орнаментом" }],
  },
  {
    title: "Декоративный киот",
    description: "Изготовление и реставрация элементов киота сложной фигурной формы.",
    images: [
      { src: "/images/portfolio/work-02.webp", alt: "Декоративный киот сложной фигурной формы" },
      { src: "/images/portfolio/work-10.webp", alt: "Отреставрированный фигурный киот с золочёными элементами" },
    ],
  },
  {
    title: "Реставрация царских врат",
    description: "Полная реставрация царских врат с изготовлением резного фона на ЧПУ.",
    images: [
      { src: "/images/portfolio/work-12.webp", alt: "Царские врата после реставрации с резным фоном" },
      { src: "/images/portfolio/work-05.webp", alt: "Резной фон для царских врат, изготовленный на ЧПУ" },
      { src: "/images/portfolio/work-08.webp", alt: "Фрагмент резного фона для царских врат" },
    ],
  },
  {
    title: "Арочная рама с орнаментом",
    description: "Изготовление рельефной рамы с повторяющимся растительным узором.",
    images: [{ src: "/images/portfolio/work-09.webp", alt: "Арочная рама с повторяющимся рельефным растительным орнаментом" }],
  },
  {
    title: "Навершие для киота",
    description: "Изготовление навершия для киота с гравировкой на цветном металле.",
    images: [
      { src: "/images/portfolio/work-06.webp", alt: "Навершие для киота с гравировкой на цветном металле" },
      { src: "/images/portfolio/work-04.webp", alt: "Навершие для киота с декоративной металлической накладкой" },
      { src: "/images/portfolio/work-03.webp", alt: "Гравированная деталь навершия для киота из цветного металла" },
      { src: "/images/portfolio/work-07.webp", alt: "Навершие в составе золочёной рамы киота" },
    ],
  },
  {
    title: "Фрезеровка технической детали",
    description: "Изготовление детали из пластика по заданным размерам.",
    images: [{ src: "/images/portfolio/work-11.webp", alt: "Длинная техническая деталь из чёрного пластика после фрезеровки", position: "center 64%" }],
  },
] as const;

const buttonPrimary =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_28px_rgba(30,29,27,.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#393733] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wood";

export default function PortfolioGallery() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<{ projectIndex: number; imageIndex: number } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  const currentProject = selected ? projects[selected.projectIndex] : null;
  const currentImage = currentProject && selected ? currentProject.images[selected.imageIndex] : null;

  function changeImage(direction: -1 | 1) {
    if (!selected || !currentProject) return;
    const nextIndex = (selected.imageIndex + direction + currentProject.images.length) % currentProject.images.length;
    setSelected({ ...selected, imageIndex: nextIndex });
  }

  return (
    <section id="portfolio" className="page-shell section-space scroll-mt-24">
      <SectionHeading
        eyebrow="Портфолио"
        title="Примеры наших работ"
        description="Реализованные проекты по ЧПУ-фрезеровке, изготовлению декоративных элементов и реставрации изделий."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, projectIndex) => {
          const cover = project.images[0];

          return (
            <article key={project.title} className="group overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_18px_50px_rgba(39,34,29,.07)]">
              <button
                type="button"
                onClick={() => setSelected({ projectIndex, imageIndex: 0 })}
                className="relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden border-b border-line bg-[#e9e3da] text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wood"
                aria-label={`Открыть фотографию: ${project.title}`}
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  style={{ objectPosition: cover.position ?? "center" }}
                />
                <span className="absolute bottom-4 right-4 rounded-full bg-ink/88 px-3 py-1.5 font-mono text-[.65rem] uppercase tracking-[.12em] text-white shadow-sm backdrop-blur-sm">
                  Открыть
                </span>
                {project.images.length > 1 ? (
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 font-mono text-[.65rem] uppercase tracking-[.12em] text-ink shadow-sm backdrop-blur-sm">
                    {project.images.length} фото
                  </span>
                ) : null}
              </button>
              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-semibold tracking-[-0.025em]">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
              </div>
            </article>
          );
        })}
      </div>

      {!showAll && projects.length > 6 ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex min-h-13 items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition duration-200 hover:border-[#b7aa99] hover:bg-[#faf8f4] active:bg-[#f1ede7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wood"
            aria-expanded={showAll}
          >
            Показать ещё
          </button>
        </div>
      ) : null}

      <div className="mt-12 rounded-[1.75rem] border border-line bg-white px-6 py-7 text-center shadow-[0_18px_50px_rgba(39,34,29,.05)] sm:px-10 sm:py-9">
        <a href="#order" className={buttonPrimary}>Рассчитать похожую работу <span aria-hidden="true">↗</span></a>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted">
          Пришлите фотографию, чертёж или описание изделия — оценим возможность изготовления и предварительную стоимость.
        </p>
      </div>

      {selected && currentProject && currentImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#11110f]/95 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-dialog-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className="flex h-full w-full max-w-6xl flex-col">
            <div className="flex items-center justify-between gap-4 pb-3 text-white sm:pb-4">
              <div className="min-w-0">
                <p id="portfolio-dialog-title" className="truncate text-sm font-semibold sm:text-base">{currentProject.title}</p>
                {currentProject.images.length > 1 ? (
                  <p className="mt-1 font-mono text-[.65rem] uppercase tracking-[.12em] text-white/60">
                    Фото {selected.imageIndex + 1} из {currentProject.images.length}
                  </p>
                ) : null}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelected(null)}
                className="grid min-h-11 min-w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label="Закрыть просмотр фотографии"
              >
                ×
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-black/30">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
              {currentProject.images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => changeImage(-1)}
                    className="absolute left-3 top-1/2 grid min-h-12 min-w-12 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-2xl text-white transition hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:left-5"
                    aria-label="Предыдущая фотография"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => changeImage(1)}
                    className="absolute right-3 top-1/2 grid min-h-12 min-w-12 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-2xl text-white transition hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-5"
                    aria-label="Следующая фотография"
                  >
                    →
                  </button>
                </>
              ) : null}
            </div>
            <p className="mx-auto max-w-3xl py-3 text-center text-sm leading-6 text-white/68 sm:py-4">{currentProject.description}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
