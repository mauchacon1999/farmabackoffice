"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { SearchInput } from "@/components/ui";
import SepedProduct from "@/components/supplier/seped-product/seped-product";
import { useRouter, useSearchParams } from "next/navigation";
import DronenaProduct from "@/components/supplier/dronena-product/dronena-product";
import GrupoCobecaProduct from "@/components/supplier/grupo-cobeca-product/grupo-cobeca-product";
import { useAuth } from "@/context/AuthContext";

function HomeContent() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const [searchQuery, setSearchQuery] = useState(product ?? "");
  const router = useRouter();
  const { auth, logout } = useAuth();



  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.replace("/login");
    }
  }, [auth.isAuthenticated, router]);

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl   py-8 lg:px-8 gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          {auth.isAuthenticated && auth.username
            ? `Bienvenido, ${auth.username}`
            : "Bienvenido"}
        </h1>
        <div className="flex items-center gap-3">
          {auth.isAuthenticated ? (
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
      <div className=" max-w-lg flex py-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar productos…"
          aria-label="Buscar productos"
          ctaLabel="Buscar"
          onCtaClick={(q) => {
            if (q) {
              setSearchQuery(q);
              router.push(`/?product=${q}`);
            }

          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        {
          product && (
            <>
              <GrupoCobecaProduct key="grupocobeca" />
              <SepedProduct key="seped" />
              <DronenaProduct key="dronena" />
            </>
          )
        }
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
