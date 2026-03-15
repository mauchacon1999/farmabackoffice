"use client";

import useSWRImmutable from "swr/immutable";
import { useSearchParams } from "next/navigation";
import { CatalogService } from "@/services";
import Heading from "@/components/ui/Heading";
import SkeletonProduct from "@/components/product/SkeletonProduct";
import NotResult from "@/components/product/NotResult";
import ProductCardV2 from "@/components/product/ProductCardV2";
import useFilter from "@/hooks/useFilter";
import { FilterInput } from "@/components/ui/FilterInput";
import { ShowMoreLess } from "@/components/ui/ShowMoreLess";

const GrupoCobecaProduct = () => {
    const searchParams = useSearchParams();
    const product = searchParams.get("product");
    const catalogService = new CatalogService();
    const key = product ? `/suppliers/grupocobeca/catalog?product=${product}` : null;

    const { data, isLoading, error } = useSWRImmutable(key, () =>
        catalogService.getProducts("grupocobeca", product ?? ""));

    const catalog = data?.products ?? [];
    const {
        displayedItems,
        hasMore,
        isExpanded,
        onShowMore,
        onShowLess,
        searchQuery,
        setSearchQuery,
    } = useFilter(catalog, "descripcion");

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section aria-labelledby="grupocobeca-products-heading">
            <div className="flex justify-between items-center">
                <Heading total={catalog.length}>
                    Proveedor Grupo Cobeca
                </Heading>
                <FilterInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full max-w-sm"
                />
            </div>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
                {isLoading ? <SkeletonProduct />
                    : !displayedItems.length ? <NotResult /> : displayedItems.map((row, index) => (
                        <li key={row.numero ?? `product-${index}`}>
                            <ProductCardV2
                                product={row}
                            />
                        </li>
                    ))}
            </ul>
            <ShowMoreLess
                hasMore={hasMore}
                isExpanded={isExpanded}
                onShowMore={onShowMore}
                onShowLess={onShowLess}
            />
        </section>
    );
};

export default GrupoCobecaProduct;