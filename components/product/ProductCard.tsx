import Image from "next/image";
import Link from "next/link";
import type { ProductCardProps } from "./ProductCard.types";



export function ProductCard({
  imageSrc,
  imageAlt,
  productName,
  price,
  packagingLabel,
  unitPriceLabel,
  addToCartHref,
  onAddToCart,
  ctaLabel = "Cómpralo",
}: ProductCardProps): React.ReactElement {
  const ctaContent = (
    <>
      <span>{ctaLabel}</span>
      <CartIcon className="ml-1.5 h-4 w-4 shrink-0" />
    </>
  );

  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md"
      data-testid="product-card"
    >
      {/* Image */}
      <div className="relative flex min-h-40 shrink-0 items-center justify-center bg-muted/50 px-4 py-6">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={160}
          height={160}
          className="object-contain"
          sizes="(min-width: 1024px) 200px, 160px"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-1">
        {packagingLabel ? (
          <p className="text-xs text-muted-foreground">{packagingLabel}</p>
        ) : null}

        <h3 className="mt-1 line-clamp-2 min-h-10 font-semibold leading-tight text-foreground">
          {productName}
        </h3>

        <p className="mt-2 text-xl font-bold leading-none text-foreground">
          {price}
        </p>

        {unitPriceLabel ? (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {unitPriceLabel}
          </p>
        ) : null}

      </div>
    </article>
  );
}

function CartIcon({ className }: { className?: string }): React.ReactElement {
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
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
