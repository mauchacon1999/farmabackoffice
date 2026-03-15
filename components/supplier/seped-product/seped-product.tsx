"use client";
import { ProductCard } from "@/components/product";

import useSWRImmutable from "swr/immutable";
import { useSearchParams } from "next/navigation";
import { CatalogService } from "@/services";
import Heading from "@/components/ui/Heading";
import SkeletonProduct from "@/components/product/SkeletonProduct";
import NotResult from "@/components/product/NotResult";
import ProductCardV2 from "@/components/product/ProductCardV2";



const SepedProduct = () => {
    const searchParams = useSearchParams();
    const product = searchParams.get("product");
    const catalogService = new CatalogService();
    const key = product ? `/suppliers/seped/catalog?product=${product}` : null;

    const { data, isLoading, error } = useSWRImmutable(key, () =>
        catalogService.getProducts("seped", product ?? ""));


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section aria-labelledby="seped-products-heading">
            <Heading>
                Proveedor Seped
            </Heading>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
                {isLoading ? <SkeletonProduct /> : !data?.products?.length ? <NotResult /> : data?.products?.map((row, index) => (
                    <li key={row.numero ?? `product-${index}`}>
                        <ProductCardV2
                            product={row}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default SepedProduct;