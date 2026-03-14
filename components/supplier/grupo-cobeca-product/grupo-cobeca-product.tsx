"use client";
import { ProductCard } from "@/components/product";

import useSWRImmutable from "swr/immutable";
import { useSearchParams } from "next/navigation";
import { CatalogService } from "@/services";



const GrupoCobecaProduct = () => {
    const searchParams = useSearchParams();
    const product = searchParams.get("product");
    const catalogService = new CatalogService();
    const key = product ? `/suppliers/grupocobeca/catalog?product=${product}` : null;

    const { data, isLoading, error } = useSWRImmutable(key, () =>
        catalogService.getProducts("grupocobeca", product ?? ""));
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section aria-labelledby="grupocobeca-products-heading">
            <h2 id="grupocobeca-products-heading" className="text-lg font-semibold text-foreground">
                Productos de Grupo Cobeca: {product}
            </h2>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {data?.products?.map((row, index) => (
                    <li key={row.numero ?? `product-${index}`}>
                        <ProductCard
                            imageSrc={row.imagenUrl ?? ""}
                            imageAlt={row.descripcion ?? "Producto"}
                            productName={row.descripcion ?? ""}
                            price={row.precioNetoBs ?? row.precioUsd ?? ""}
                            packagingLabel={row.bulto}
                            addToCartHref={row.productoUrl ?? "#"}
                            ctaLabel="Cómpralo"
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default GrupoCobecaProduct;