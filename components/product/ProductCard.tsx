import Image from "next/image";
import Link from "next/link";
import type { ProductCardProps } from "./ProductCard.types";
import { useState } from "react";



export function ProductCard(props: ProductCardProps): React.ReactElement {
  const { imageSrc, imageAlt, productName, price, packagingLabel, unitPriceLabel, priceNetoBs, precioNetoUsd } = props;
  console.log(props, "props");
  const [imageUrl, setImageUrl] = useState(imageSrc);
  const defaultImage = "/noimagen.webp";

  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md"
      data-testid="product-card"
    >
      {/* Image */}
      <div className="relative flex min-h-40 shrink-0 items-center justify-center px-4 py-6">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={160}
          height={160}
          loading="lazy"
          onError={(e) => {
            setImageUrl(defaultImage);
          }}
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

        {priceNetoBs ? (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {priceNetoBs}
          </p>
        ) : null}
        {precioNetoUsd ? (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {precioNetoUsd}
          </p>
        ) : null}
      </div>
    </article>
  );
}

