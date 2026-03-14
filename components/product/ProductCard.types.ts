export type ProductCardTagVariant = "info" | "offer" | "prescription";

export type ProductCardTag = {
  label: string;
  variant?: ProductCardTagVariant;
};

export type ProductCardProps = {
  /** Product image URL */
  imageSrc: string;
  /** Alt text for the product image */
  imageAlt: string;
  /** Product name (title) */
  productName: string;
  /** Main price to display (formatted string e.g. "$ 14.450") */
  price: string;
  /** Optional packaging line (e.g. "BLISTER X 4 CAP") */
  packagingLabel?: string;
  /** Optional unit price line (e.g. "Capsula a $3.612,50") */
  unitPriceLabel?: string;
  /** Optional tag above image (e.g. "Requiere fórmula médica") */
  tag?: ProductCardTag;
  /** Link for the CTA button (if set, button is a link) */
  addToCartHref?: string;
  /** Click handler for CTA (if no href) */
  onAddToCart?: () => void;
  /** CTA button label */
  ctaLabel?: string;
};
