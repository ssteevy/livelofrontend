import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <aside className="relative hidden min-h-screen overflow-hidden bg-white lg:flex">
        <Image
          src="/auth-marketplace-visual.jpg"
          alt="Livelo marketplace"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/30 to-transparent" />
      </aside>

      <main className="relative flex min-h-screen flex-col overflow-hidden bg-white">
        <style>
          {`
            @keyframes auth-bubble-float-a {
              0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
              50% { transform: translate3d(18px, -22px, 0) scale(1.04); }
            }

            @keyframes auth-bubble-float-b {
              0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
              50% { transform: translate3d(-16px, 18px, 0) scale(0.96); }
            }

            @keyframes auth-bubble-float-c {
              0%, 100% { transform: translate3d(-50%, 0, 0) scale(1); }
              50% { transform: translate3d(calc(-50% + 12px), -16px, 0) scale(1.03); }
            }
          `}
        </style>
        <span className="pointer-events-none absolute -left-14 top-14 h-40 w-40 rounded-full bg-[#4E73C7]/12 blur-[1px] sm:h-56 sm:w-56 lg:-left-16 lg:top-20" style={{ animation: "auth-bubble-float-a 9s ease-in-out infinite" }} />
        <span className="pointer-events-none absolute right-4 top-24 h-24 w-24 rounded-full bg-[#4AAAF4]/22 sm:right-12 sm:top-14 sm:h-36 sm:w-36" style={{ animation: "auth-bubble-float-b 7.5s ease-in-out infinite" }} />
        <span className="pointer-events-none absolute left-1/2 top-[42%] h-52 w-52 rounded-full bg-[#4AAAF4]/16 sm:h-72 sm:w-72 lg:h-80 lg:w-80" style={{ animation: "auth-bubble-float-c 11s ease-in-out infinite" }} />
        <span className="pointer-events-none absolute bottom-24 left-12 h-20 w-20 rounded-full bg-[#EDA415]/18 sm:h-28 sm:w-28" style={{ animation: "auth-bubble-float-b 8.5s ease-in-out infinite" }} />
        <span className="pointer-events-none absolute -bottom-10 right-8 h-28 w-28 rounded-full bg-[#4E73C7]/10 sm:right-24 sm:h-40 sm:w-40" style={{ animation: "auth-bubble-float-a 10s ease-in-out infinite" }} />
        <span className="pointer-events-none absolute right-1/3 top-10 h-10 w-10 rounded-full bg-[#EDA415]/25 sm:h-14 sm:w-14" style={{ animation: "auth-bubble-float-b 6.5s ease-in-out infinite" }} />

        <div className="relative z-10 flex items-center justify-between px-4 pt-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-[#4E73C7] transition hover:text-[#EDA415]">
            <ArrowLeft aria-hidden="true" size={18} />
            Accueil
          </Link>
          <span className="relative h-9 w-9 overflow-hidden rounded-xl bg-white lg:hidden">
            <Image src="/livelo-auth-favicon.png" alt="Livelo Haiti" fill sizes="36px" className="object-cover" />
          </span>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
          <div className="w-full max-w-md rounded-[28px] bg-white/95 px-5 py-7 shadow-[0_26px_80px_rgba(78,115,199,0.16)] ring-1 ring-[#B3D4E5]/60 backdrop-blur sm:px-8 sm:py-9">
            <Link href="/" className="mx-auto mb-8 flex w-fit items-center justify-center">
              <Image
                src="/livelo-logo-transparent.png"
                alt="Livelo Haiti"
                width={190}
                height={127}
                priority
                className="h-auto w-40 object-contain sm:w-48"
              />
            </Link>
            {children}
          </div>
        </div>

        <p className="relative z-10 px-4 pb-8 text-center text-xs text-[#ACACAC]">
          Besoin d&apos;aide ?{" "}
          <a href="tel:+50900000000" className="font-bold text-[#4E73C7]">
            +509 0000 0000
          </a>
        </p>
      </main>
    </div>
  );
}
