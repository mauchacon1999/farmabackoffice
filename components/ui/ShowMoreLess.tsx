import type { ShowMoreLessProps } from "./ShowMoreLess.types";

const buttonClassName =
  "rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50";

export function ShowMoreLess({
  hasMore,
  isExpanded,
  onShowMore,
  onShowLess,
}: ShowMoreLessProps): React.ReactElement {
  return (
    <div className="mt-4 flex justify-center gap-2">
      {hasMore && (
        <button type="button" onClick={onShowMore} className={buttonClassName}>
          Ver más
        </button>
      )}
      {isExpanded && (
        <button type="button" onClick={onShowLess} className={buttonClassName}>
          Ver menos
        </button>
      )}
    </div>
  );
}
