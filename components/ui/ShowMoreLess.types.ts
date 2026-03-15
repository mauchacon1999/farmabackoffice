export type ShowMoreLessProps = {
  /** Whether to show the "Ver más" button */
  hasMore: boolean;
  /** Whether the list is expanded (show "Ver menos") */
  isExpanded: boolean;
  /** Called when "Ver más" is clicked */
  onShowMore: () => void;
  /** Called when "Ver menos" is clicked */
  onShowLess: () => void;
};
