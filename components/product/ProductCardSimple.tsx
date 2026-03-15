import Image from "next/image";
import { useState } from "react";

export interface ProductCardSimpleProps {
    imagenUrl: string;
    descripcion: string;
    codigo: string;
    precioBs: string;
}
interface ProductCardSimplePropsWithFunctions {
    product: ProductCardSimpleProps;
    idProductoLoading: string;
    onViewMoreInfo: (product: ProductCardSimpleProps) => Promise<void>;
}

export default function ProductCardSimple(props: ProductCardSimplePropsWithFunctions) {

    const { product, idProductoLoading, onViewMoreInfo } = props;
    const { imagenUrl, descripcion, codigo, precioBs } = product;
    const nombre = descripcion
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const [imageUrl, setImageUrl] = useState(imagenUrl);
    const defaultImage = "/noimagen.webp";

    return (
        <div className="w-full max-w-sm">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

                {/* Imagen */}
                <div className=" px-5 pt-4 pb-3 border-b border-gray-100 flex justify-center">
                    <Image
                        src={imageUrl}
                        alt={nombre}
                        width={160}
                        height={160}
                        loading="lazy"
                        className=" object-contain"
                        onError={(e) => {
                            setImageUrl(defaultImage);
                        }}
                    />
                    <div
                        className="hidden w-24 h-24 items-center justify-center"
                    >
                        <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
                            <rect x="15" y="4" width="6" height="28" rx="1.5" fill="#185FA5" />
                            <rect x="4" y="15" width="28" height="6" rx="1.5" fill="#185FA5" />
                        </svg>
                    </div>
                </div>

                {/* Info */}
                <div className="px-5 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Cód. {codigo}</p>
                    <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                        {nombre}
                    </p>
                </div>

                {/* Precio + botón */}
                <div className="px-5 py-4 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">
                            Precio
                        </p>
                        <p className="text-2xl font-medium text-gray-900 leading-none">
                            {precioBs}{" "}
                            <span className="text-sm font-normal text-gray-400">Bs</span>
                        </p>
                    </div>

                    <button
                        disabled={idProductoLoading === codigo}
                        onClick={() => {
                            onViewMoreInfo(product);
                        }}
                        className="shrink-0 text-sm font-medium px-4 py-2 bg-blue-50
                         text-blue-700 rounded-xl hover:bg-blue-100 transition-colors
                          whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {idProductoLoading === codigo ? "Cargando..." : "Ver más info"}
                    </button>
                </div>

            </div>
        </div>
    );
}