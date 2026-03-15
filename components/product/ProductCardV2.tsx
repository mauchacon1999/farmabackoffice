import { useState } from "react";
import Image from "next/image";

interface ProductCardV2Props {
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
}
export default function ProductCardV2(props: {
    product: ProductCardV2Props;
}) {
    const { productoUrl, imagenUrl, descripcion, principioActivo, marca, codigoBarra, codigo, existencia, precioBs, precioUsd, precioNetoBs, precioNetoUsd } = props.product;
    const nombre = descripcion
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const [imageUrl, setImageUrl] = useState(imagenUrl);
    const defaultImage = "/noimagen.webp";

    const arrayValues = [
        {
            label: "Marca",
            value: marca,
        },
        {
            label: "Código de barra",
            value: codigoBarra,
        },
    ]

    const hasValues = arrayValues.some((value: { label: string; value: string }) => value.value);


    return (
        <div className="w-full max-w-sm">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

                {/* Header */}
                <div className="bg-gray-50 px-4 py-4 flex items-center gap-4 border-b border-gray-100">
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-0.5">
                            {marca} · Cód. {codigo}
                        </p>
                        <p className="text-sm font-bold text-gray-900 leading-snug mb-2 truncate">
                            {nombre}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            <span className="text-xs px-2.5 py-0.5 truncate text-nowrap rounded-full bg-green-200 text-green-700 font-medium">
                                {principioActivo}
                            </span>
                            <span className="text-xs px-2.5 py-0.5 truncate text-nowrap rounded-full bg-blue-200 text-blue-700 font-medium">
                                Stock: {existencia}
                            </span>
                        </div>
                    </div>
                </div>
                <div className=" h-auto  border border-gray-200 bg-white flex items-center justify-center shrink-0">
                    <Image
                        src={imageUrl}
                        alt={nombre}
                        width={160}
                        height={160}
                        loading="lazy"
                        className="  object-contain"
                        onError={(e) => {
                            setImageUrl(defaultImage);
                        }}
                    />
                </div>

                {/* Precios */}
                <div className="px-5 py-4 grid grid-cols-2 gap-1 border-b border-gray-100">
                    <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                            Precio USD
                        </p>
                        <p className="text-2xl font-medium text-gray-900">
                            ${precioUsd}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {precioBs} Bs
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 border-2 border-green-200">
                        <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                            Precio neto
                        </p>
                        <p className="text-2xl font-medium text-green-600">
                            ${precioNetoUsd}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {precioNetoBs} Bs
                        </p>
                    </div>
                </div>

                {/* Detalles */}
                {hasValues && (
                    <div className="px-5 py-3 border-b border-gray-100">
                        <table className="w-full text-sm">
                            <tbody>
                                {arrayValues.map((value: { label: string; value: string }, index: number) => (
                                    value.value && (
                                        <tr key={index}>
                                            <td className="text-gray-400 py-1.5">{value.label}</td>
                                            <td className="text-right text-gray-800 py-1.5 truncate">{value.value}</td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Acciones */}
                {
                    productoUrl && (
                        <div className="px-5 py-4 flex gap-2">
                            <a href={productoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
                            >
                                Ver detalle ↗
                            </a>
                        </div>
                    )
                }

            </div>
        </div>
    );
}