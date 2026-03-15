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
            <Heading>
                Proveedor Dronena
            </Heading>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
                {isLoading ? <SkeletonProduct /> : data?.products?.map((row, index) => (
                    <li key={row.numero ?? `product-${index}`}>
                        <ProductCardSimple
                            onViewMoreInfo={onViewMoreInfo}
                            product={row}
                            idProductoLoading={idProductoLoading}
                        />
                    </li>
                ))}
            </ul>
            {productDetail && <ProductModal
                product={productDetail}
                onCloseModal={() => setProductDetail(null)}
            />}
        </section>
    );
};

export default DronenaProduct;