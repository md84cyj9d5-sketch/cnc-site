export default function CncProcessVisual() {
  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#20211f] p-5 text-white shadow-[0_28px_80px_rgba(28,24,19,0.28)] sm:min-h-[460px] sm:p-8">
      <div className="absolute inset-0 opacity-30 cnc-grid" aria-hidden="true" />
      <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/62">
          <span className="h-2 w-2 rounded-full bg-wood" />
          Процесс обработки
        </div>
        <span className="font-mono text-xs text-white/40">CNC / 03</span>
      </div>

      <svg
        className="relative mt-8 h-auto w-full"
        viewBox="0 0 560 360"
        role="img"
        aria-labelledby="cnc-visual-title cnc-visual-description"
      >
        <title id="cnc-visual-title">Схема фрезеровки детали на ЧПУ</title>
        <desc id="cnc-visual-description">
          Фреза движется над закреплённой деревянной заготовкой и формирует точный контур.
        </desc>
        <defs>
          <linearGradient id="bed" x1="0" x2="1">
            <stop offset="0" stopColor="#343633" />
            <stop offset="1" stopColor="#292a28" />
          </linearGradient>
          <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d8b88d" />
            <stop offset="1" stopColor="#a97845" />
          </linearGradient>
        </defs>
        <path d="M64 92h432v202H64z" fill="url(#bed)" stroke="#555852" />
        <path d="M84 274h392" stroke="#555852" strokeWidth="2" />
        <path d="M84 114h392M84 154h392M84 194h392M84 234h392" stroke="#3f423e" />
        <path d="M116 104v178M176 104v178M236 104v178M296 104v178M356 104v178M416 104v178" stroke="#3f423e" />
        <path d="M106 238V152l29-22h250l44 34v74l-28 22H139z" fill="url(#wood)" stroke="#e6c69e" strokeWidth="2" />
        <path d="M151 158h214l30 23v36l-20 16H159l-19-15v-47z" fill="none" stroke="#614526" strokeWidth="3" strokeDasharray="7 7" />
        <path d="M214 188h116v29H214z" fill="#be9362" stroke="#6f4e2e" />
        <path d="M268 24h60v110h-60z" fill="#dddeda" stroke="#f4f4f1" strokeWidth="2" />
        <path d="M278 134h40l-8 48h-24z" fill="#b3b5b0" />
        <path d="M294 182h8v34h-8z" fill="#d9a465" />
        <circle cx="298" cy="219" r="7" fill="#f0c388" opacity=".9" />
        <path d="M298 225c-21 2-38 11-50 25" fill="none" stroke="#f1d8b7" strokeWidth="2" strokeDasharray="4 7" />
        <path d="M230 51h-93v47" fill="none" stroke="#747872" strokeWidth="2" />
        <path d="m132 90 5 8 5-8" fill="none" stroke="#747872" strokeWidth="2" />
        <text x="82" y="68" fill="#aeb1ab" fontSize="14" letterSpacing="2">ТОЧНЫЙ КОНТУР</text>
        <path d="M353 59h89v64" fill="none" stroke="#747872" strokeWidth="2" />
        <path d="m437 115 5 8 5-8" fill="none" stroke="#747872" strokeWidth="2" />
        <text x="350" y="48" fill="#aeb1ab" fontSize="14" letterSpacing="2">ЗАГОТОВКА</text>
      </svg>

      <div className="relative mt-2 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-xs text-white/54 sm:text-sm">
        <span>Контур</span>
        <span>Пазы</span>
        <span>Рельеф</span>
      </div>
    </div>
  );
}
