"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { productsApi, type Product } from "@/lib/products";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

function useCountdown() {
  const [left, setLeft] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    function tick() {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3.6e6);
      const m = Math.floor((diff % 3.6e6) / 6e4);
      const s = Math.floor((diff % 6e4) / 1000);
      setLeft({
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    }
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return left;
}

export function FlashDeals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const time = useCountdown();

  useEffect(() => {
    let active = true;
    productsApi
      .list({ limit: 20 })
      .then((response) => {
        if (!active) return;
        const promos = response.data.filter((p) => p.prix_promo && p.prix_promo < p.prix);
        setProducts((promos.length > 0 ? promos : response.data).slice(0, 12));
      })
      .catch(() => {
        if (active) setProducts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-[#B3D4E5] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#EDA415] to-[#EDA415]/80 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-white">
            <Zap aria-hidden="true" size={22} fill="currentColor" />
            <h2 className="text-lg font-black sm:text-xl">Ventes flash</h2>
          </div>
          <div className="flex items-center gap-2 text-white">
            <span className="hidden text-xs font-bold sm:inline">Se termine dans</span>
            <div className="flex items-center gap-1">
              {[time.h, time.m, time.s].map((unit, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="min-w-7 rounded-lg bg-[#4E73C7] px-1.5 py-1 text-center text-sm font-black tabular-nums text-white">{unit}</span>
                  {i < 2 ? <span className="font-black">:</span> : null}
                </span>
              ))}
            </div>
            <Link href="/produits" className="ml-1 hidden items-center gap-1 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-black backdrop-blur transition hover:bg-white/30 sm:flex">
              Voir tout
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="-mb-1 flex gap-3 overflow-x-auto p-4 no-scrollbar">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-40 shrink-0 sm:w-48">
                  <ProductCardSkeleton />
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="w-40 shrink-0 sm:w-48">
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
