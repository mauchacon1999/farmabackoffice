"use client";
import useSWRImmutable from "swr/immutable";
import { useSearchParams } from "next/navigation";
import { CatalogService } from "@/services";
import Heading from "@/components/ui/Heading";
import SkeletonProduct from "@/components/product/SkeletonProduct";
import ProductCardSimple, {
    type ProductCardSimpleProps
} from "@/components/product/ProductCardSimple";
import { useState } from "react";
import ProductModal from "@/components/product/ProductModal";
import useFilter from "@/hooks/useFilter";
import { FilterInput } from "@/components/ui/FilterInput";
import { ShowMoreLess } from "@/components/ui/ShowMoreLess";
import NotResult from "@/components/product/NotResult";

type ProductModalProduct = {
    imagenUrl: string;
    name: string;
    description: string;
    typeProducto: string;
    precioBss: string;
    precioDolares: string;
    codeBarra: string;
    distribuidor: string;
};

const DronenaProduct = () => {
    const searchParams = useSearchParams();
    const product = searchParams.get("product");
    const catalogService = new CatalogService();
    const key = product ? `/suppliers/dronena/catalog?product=${product}` : null;

    const { data, isLoading, error } = useSWRImmutable(key, () =>
        catalogService.getProducts("dronena", product ?? ""));

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

    const [productDetail, setProductDetail] = useState<ProductModalProduct | null>(null);
    const [idProductoLoading, setIdProductoLoading] = useState("");


    const onViewMoreInfo = async (cardProduct: ProductCardSimpleProps) => {
        setIdProductoLoading(cardProduct.codigo);
        setProductDetail(null);
        try {
            const detail = await catalogService.getProductDetailDronena(
                cardProduct.codigo,
                cardProduct.descripcion
            );
            setProductDetail({
                ...detail.product,
                imagenUrl: cardProduct.imagenUrl
            });
            setIdProductoLoading("");
        } catch (error) {
            setIdProductoLoading("");
            console.error(error);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <section className="mt-10" aria-labelledby="dronena-products-heading">
            <div className="flex justify-between items-center">
                <Heading total={catalog.length}>
                    Proveedor Dronena
                </Heading>
                <FilterInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="w-full max-w-sm"
                />

            </div>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
                {isLoading ? <SkeletonProduct /> : !displayedItems.length ? <NotResult /> : displayedItems.map((row, index) => (
                    <li key={row.numero ?? `product-${index}`}>
                        <ProductCardSimple
                            onViewMoreInfo={onViewMoreInfo}
                            product={row}
                            idProductoLoading={idProductoLoading}
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
            {productDetail && <ProductModal
                product={productDetail}
                onCloseModal={() => setProductDetail(null)}
            />}
        </section>
    );
};

export default DronenaProduct;