export type FilterInputProps = {
  /** Controlled value */
  value: string;
  /** Called when the input value changes */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Additional class for the wrapper */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
};
