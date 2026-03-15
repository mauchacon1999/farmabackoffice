"use client";

import { useState } from "react";
import { SearchInput } from "@/components/ui";
import SepedProduct from "@/components/supplier/seped-product/seped-product";
import { useRouter } from "next/navigation";
import DronenaProduct from "@/components/supplier/dronena-product/dronena-product";
import GrupoCobecaProduct from "@/components/supplier/grupo-cobeca-product/grupo-cobeca-product";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  return (
    <div className="mx-auto max-w-7xl   py-8 lg:px-8 gap-4">
      <h1 className="text-2xl font-semibold text-foreground">
        Bienvenido
      </h1>
      <div className=" max-w-lg flex py-4">
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

      <div className="flex flex-col gap-4">
        <GrupoCobecaProduct key="grupocobeca" />
        <SepedProduct key="seped" />
        <DronenaProduct key="dronena" />

      </div>
    </div>
  );
}
