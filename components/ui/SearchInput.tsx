import type { SearchInputProps } from "./SearchInput.types";

export function SearchInput({
  value,
  onChange,
  placeholder,
  id,
  "aria-label": ariaLabel,
  disabled,
  className,
  ctaLabel,
  onCtaClick,
}: SearchInputProps): React.ReactElement {
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (onCtaClick) onCtaClick(value);
  };

  const hasCta = Boolean(ctaLabel && onCtaClick);

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center overflow-hidden rounded-lg border border-border bg-background ${className ?? ""}`}
    >
      <span className="pointer-events-none absolute left-3 text-muted-foreground" aria-hidden>
        <SearchIcon className="h-5 w-5" />
      </span>
      <input
        type="search"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Buscar…"}
        disabled={disabled ?? false}
        aria-label={ariaLabel}
        className={`w-full border-0 bg-transparent py-2.5 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset disabled:cursor-not-allowed disabled:opacity-60 ${hasCta ? "pr-2" : "pr-4"}`}
      />
      {hasCta ? (
        <button
          type="submit"
          className="shrink-0 rounded-r-md bg-accent px-4 py-2.5 font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={disabled ?? false}
        >
          {ctaLabel}
        </button>
      ) : null}
    </form>
  );
}

function SearchIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
