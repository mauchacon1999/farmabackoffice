"use client";

import { useState } from "react";
import { SearchInput } from "@/components/ui";
import SepedProduct from "@/components/supplier/seped-product/seped-product";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">
        Bienvenido
      </h1>
      <p className="mt-2 text-muted-foreground">
        Contenido principal de la página.
      </p>

      <div className="mt-6 max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar productos…"
          aria-label="Buscar productos"
          ctaLabel="Buscar"
          onCtaClick={(q) => {
            setSearchQuery(q);
            router.push(`/?product=${q}`);
          }}
        />
      </div>

      <SepedProduct />
    </div>
  );
}
