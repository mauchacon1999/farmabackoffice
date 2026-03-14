export type SearchInputProps = {
  /** Controlled value */
  value: string;
  /** Called when the input value changes */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Input id (for label association) */
  id?: string;
  /** Accessible label (visually hidden if not needed) */
  "aria-label": string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class for the wrapper */
  className?: string;
  /** CTA button label (e.g. "Buscar"). If set, shows button and calls onCtaClick on click/submit */
  ctaLabel?: string;
  /** Called when CTA is clicked or form is submitted (Enter) */
  onCtaClick?: (value: string) => void;
};
