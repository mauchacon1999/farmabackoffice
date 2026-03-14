import { BaseService } from "./base";


/** Matches catalog API response shape (e.g. scrapfarm /suppliers/:id/catalog) */
export type CatalogProduct = {
    numero?: string;
    productoUrl?: string;
    imagenUrl?: string;
    descripcion?: string;
    principioActivo?: string;
    marca?: string;
    bulto?: string;
    precioBs?: string;
    precioUsd?: string;
    precioNetoBs?: string;
    precioNetoUsd?: string;
};


export class CatalogService extends BaseService {
    async getProducts(supplierId: string, product: string): Promise<CatalogProduct[]> {
        return await this.get<CatalogProduct[]>(`/suppliers/${supplierId}/catalog?product=${product}`);
    }
}