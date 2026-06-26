"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const LottiePlayer = dynamic(
  () => import("@/components/home/LottiePlayer").then((m) => m.LottiePlayer),
  { ssr: false },
);

interface Slide {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    eyebrow: "Marketplace #1 en Haïti",
    title: "Tout Haïti, livré chez vous",
    text: "Des milliers de produits des meilleures boutiques locales, livrés dans les 10 départements.",
    cta: "Explorer le catalogue",
    href: "/produits",
    gradient: "from-[#4E73C7] to-[#4E73C7]/80",
  },
  {
    eyebrow: "Paiement sécurisé",
    title: "Payez sereinement avec MonCash",
    text: "Votre argent est protégé par l'escrow Livelo jusqu'à la réception de votre commande.",
    cta: "Comment ça marche",
    href: "/produits",
    gradient: "from-[#EDA415] to-[#4E73C7]",
  },
  {
    eyebrow: "Vendeurs",
    title: "Ouvrez votre boutique en ligne",
    text: "Vendez partout en Haïti, fixez vos prix de livraison et recevez vos paiements via MonCash.",
    cta: "Devenir vendeur",
    href: "/devenir-vendeur",
    gradient: "from-[#30BD57] to-[#4E73C7]",
  },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="w-full px-4 pb-2 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Carrousel principal */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${slide.gradient} transition-all duration-700`}>
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

          <div className="grid items-center gap-4 p-6 sm:p-9 lg:grid-cols-2 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-white"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur">
                  <ShieldCheck size={13} className="text-[#EDA415]" />
                  {slide.eyebrow}
                </span>
                <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{slide.title}</h1>
                <p className="mt-3 max-w-md text-sm font-medium text-white/85 sm:text-base">{slide.text}</p>
                <Link
                  href={slide.href}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-[#4E73C7] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#EDA415] hover:text-white"
                >
                  {slide.cta}
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </AnimatePresence>

            <div className="relative mx-auto hidden aspect-[3/2] w-full max-w-md animate-float lg:block">
              <Image
                src="/livelo-hero-marketplace-v4.png"
                alt="Livelo Haiti marketplace"
                fill
                priority
                sizes="448px"
                className="object-contain [filter:drop-shadow(0_18px_30px_rgba(0,0,0,0.22))]"
              />
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-6 flex gap-2 sm:left-9 lg:left-12">
            {slides.map((_, dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Slide ${dot + 1}`}
                onClick={() => setIndex(dot)}
                className={`h-2 rounded-full transition-all ${dot === index ? "w-6 bg-white" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        {/* Cartes latérales */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          {/* Livraison nationale — animation Lottie */}
          <Link
            href="/produits"
            className="group flex flex-col overflow-hidden rounded-3xl border border-[#B3D4E5] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#4E73C7]/40 hover:shadow-[0_18px_40px_rgba(78,115,199,0.16)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E2F4FF]">
              <LottiePlayer src="/animations/delivery.json" className="absolute inset-0 flex h-full w-full items-center justify-center" />
            </div>
            <div className="flex items-center justify-between gap-2 p-4">
              <span>
                <span className="block text-sm font-black text-[#4E73C7]">Livraison nationale</span>
                <span className="mt-0.5 block text-xs font-bold text-[#ACACAC]">10 départements couverts</span>
              </span>
              <ArrowRight aria-hidden="true" size={16} className="shrink-0 text-[#4E73C7] transition group-hover:translate-x-0.5 group-hover:text-[#EDA415]" />
            </div>
          </Link>

          {/* Devenir vendeur — animation Lottie */}
          <Link
            href="/devenir-vendeur"
            className="group flex flex-col overflow-hidden rounded-3xl border border-[#B3D4E5] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#4E73C7]/40 hover:shadow-[0_18px_40px_rgba(78,115,199,0.16)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E2F4FF]">
              <LottiePlayer src="/animations/shop.json" className="absolute inset-0 flex h-full w-full items-center justify-center" />
            </div>
            <div className="flex items-center justify-between gap-2 p-4">
              <span>
                <span className="block text-sm font-black text-[#4E73C7]">Devenir vendeur</span>
                <span className="mt-0.5 block text-xs font-bold text-[#ACACAC]">Ouvrez votre boutique</span>
              </span>
              <ArrowRight aria-hidden="true" size={16} className="shrink-0 text-[#4E73C7] transition group-hover:translate-x-0.5 group-hover:text-[#EDA415]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
