import { BaseService } from "./base";


/** Matches catalog API response shape (e.g. scrapfarm /suppliers/:id/catalog) */
export type ProductType = {
    numero: string;
    productoUrl: string;
    imagenUrl: string;
    descripcion: string;
    principioActivo: string;
    marca: string;
    codigoBarra: string;
    codigo: string;
    existencia: string;
    precioBs: string;
    precioUsd: string;
    precioNetoBs: string;
    precioNetoUsd: string;
};

export type CatalogResponseType = {
    products?: ProductType[];
    supplier: string;
};

export type ProductDetailResponseType = {
    product: ProductType;
    supplier: string;
};

/** Matches scrapfarm GET /suppliers/dronena/product response product shape */
export type DronenaProductDetail = Readonly<{
    typeProducto: string;
    name: string;
    precioDolares: string;
    precioBss: string;
    codeBarra: string;
    distribuidor: string;
    description: string;
}>;

export type DronenaProductDetailResponse = {
    product: DronenaProductDetail;
    supplier: string;
};

export class CatalogService extends BaseService {

    async getProducts(supplierId: string, product: string): Promise<CatalogResponseType> {
        return await this.get<CatalogResponseType>(`/suppliers/${supplierId}/catalog?product=${product}`);
    }

    async getProductDetailDronena(
        productId: string,
        productName: string
    ): Promise<DronenaProductDetailResponse> {
        const params = new URLSearchParams({ id: productId, name: productName });
        return await this.get<DronenaProductDetailResponse>(
            `/suppliers/dronena/product?${params.toString()}`
        );
    }
}