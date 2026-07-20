type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow ${inverse ? "text-wood-light" : ""}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:mt-4 sm:text-5xl ${inverse ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-pretty text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8 ${inverse ? "text-white/65" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
