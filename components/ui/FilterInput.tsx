import { SearchInput } from "./SearchInput";
import type { FilterInputProps } from "./FilterInput.types";

const DEFAULT_PLACEHOLDER = "Filtrar por nombre";

export function FilterInput({
  value,
  onChange,
  placeholder,
  className,
}: FilterInputProps): React.ReactElement {
  return (
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder={placeholder ?? DEFAULT_PLACEHOLDER}
      aria-label={placeholder ?? DEFAULT_PLACEHOLDER}
      className={className}
    />
  );
}
