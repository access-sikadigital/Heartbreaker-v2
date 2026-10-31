/** Slow banner between hairlines (CSS only). Pauses on hover. */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span className="display whitespace-nowrap px-7 text-[clamp(1.5rem,2.4vw,2.25rem)] md:px-10">{item}</span>
          <svg viewBox="0 0 24 24" aria-hidden className="w-3.5 shrink-0 fill-current opacity-50">
            <path d="M12 0C12.8 7 17 11.2 24 12 17 12.8 12.8 17 12 24 11.2 17 7 12.8 0 12 7 11.2 11.2 7 12 0Z" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group overflow-hidden bg-maroon py-5 text-paper">
      <div className="flex w-max animate-[marquee_50s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
