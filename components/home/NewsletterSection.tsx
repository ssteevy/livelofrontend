import { Mail } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";

export function NewsletterSection() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-5xl rounded-[2rem] border border-[#B3D4E5] bg-white p-6 text-center shadow-[0_24px_80px_rgba(78,115,199,0.14)] sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2F4FF] text-[#4E73C7]">
          <Mail aria-hidden="true" size={25} />
        </div>
        <h2 className="mt-5 text-3xl font-black text-[#4E73C7]">Recevez les meilleures offres Livelo</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#ACACAC]">
          Nouveautés locales, boutiques vérifiées, promotions et alertes livraison dans votre ville.
        </p>
        <form className="mx-auto mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row" aria-label="Inscription newsletter Livelo">
          <label className="sr-only" htmlFor="newsletter-email">Adresse email</label>
          <input id="newsletter-email" type="email" placeholder="Votre adresse email" className="h-14 flex-1 rounded-2xl border border-[#B3D4E5] bg-[#F8FAFC] px-5 text-[#4E73C7] placeholder:text-[#ACACAC] focus:border-[#4E73C7] focus:outline-none" />
          <button className="h-14 rounded-2xl bg-[#EDA415] px-6 font-black text-white transition hover:bg-[#EDA415]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E73C7]">
            S&apos;inscrire
          </button>
        </form>
      </Reveal>
    </section>
  );
}
