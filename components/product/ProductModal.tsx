import { useState } from "react";
import Image from "next/image";

interface ProductModalProps {
    product: {
        imagenUrl: string;
        name: string;
        description: string;
        typeProducto: string;
        precioBss: string;
        precioDolares: string;
        codeBarra: string;
        distribuidor: string;
    };
    onCloseModal: () => void;
}
export default function ProductModal(props: ProductModalProps) {
    const { product, onCloseModal } = props;
    const nombre = product.name
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const tags = product.description
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean);

    const [imageUrl, setImageUrl] = useState(product.imagenUrl);
    const defaultImage = "/noimagen.webp";

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg overflow-hidden shadow-xl">

                {/* Header */}
                <div className="bg-gray-50 px-6 py-5 flex gap-4 items-start relative border-b border-gray-100">
                    <div className="w-24 h-24 shrink-0 bg-white rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={nombre}
                            width={96}
                            height={96}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                setImageUrl(defaultImage);
                            }}
                        />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                        <span className="inline-block text-[10px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 mb-2">
                            {product.typeProducto}
                        </span>
                        <p className="text-base font-medium text-gray-900 leading-snug mb-3">
                            {nombre}
                        </p>
                        <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-xl font-medium text-gray-900">
                                Bs. {product.precioBss}
                            </span>
                            <span className="text-sm text-gray-400">
                                ${product.precioDolares} USD
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onCloseModal}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 text-sm transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Detalles */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-3">
                        Detalles
                    </p>
                    <div className="grid grid-cols-2 gap-0">
                        <div className="py-2 border-b border-gray-100">
                            <p className="text-xs text-gray-400 mb-0.5">Código de barra</p>
                            <p className="text-sm font-medium text-gray-900 font-mono">
                                {product.codeBarra}
                            </p>
                        </div>
                        <div className="py-2 pl-4 border-b border-gray-100 border-l border-gray-100">
                            <p className="text-xs text-gray-400 mb-0.5">Distribuidor</p>
                            <p className="text-sm font-medium text-gray-900">
                                {product.distribuidor}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Descripción */}
                <div className="px-6 py-4 border-b border-gray-100">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-3">
                        Descripción
                    </p>
                    <div className="bg-gray-50 rounded-xl p-3 flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex gap-2">
                    <button
                        onClick={onCloseModal}
                        className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        Cerrar
                    </button>
                </div>

            </div>
        </div>
    );
}