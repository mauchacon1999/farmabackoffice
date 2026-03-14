"use client";
import { ProductCard } from "@/components/product";

import useSWRImmutable from "swr/immutable";
import { useSearchParams } from "next/navigation";
import { CatalogService } from "@/services";

const SEPED_IMAGE_BASE = "https://seped.drogueriaintercontinental.net";

const SepedProduct = () => {
    const searchParams = useSearchParams();
    const product = searchParams.get("product");
    const catalogService = new CatalogService();
    const key = product ? `/suppliers/seped/catalog?product=${product}` : null;

    const { data: products, isLoading, error } = useSWRImmutable(key, () => catalogService.getProducts("seped", product ?? ""));
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (isLoading && !(products?.length)) {
        return <div>Loading...</div>;
    }



    const list = products ?? [];

    return (
        <section className="mt-10" aria-labelledby="products-heading">
            <h2 id="products-heading" className="text-lg font-semibold text-foreground">
                Productos de Seped: {product}
            </h2>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
                {list.map((row, index) => (
                    <li key={row.numero ?? `product-${index}`}>
                        <ProductCard
                            imageSrc={row.imagenUrl ?? ""}
                            imageAlt={row.descripcion ?? "Producto"}
                            productName={row.descripcion ?? ""}
                            price={row.precioNetoUsd ?? row.precioUsd ?? ""}
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

export default SepedProduct;