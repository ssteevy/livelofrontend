"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";

export function AccountMenu({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const initials = [user?.prenom?.[0], user?.nom?.[0]].filter(Boolean).join("").toUpperCase() || "L";
  const displayName = [user?.prenom, user?.nom].filter(Boolean).join(" ") || "Mon compte";

  async function handleLogout() {
    setIsOpen(false);
    await logout();
    router.push("/");
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/10 font-bold text-white transition hover:bg-white/20 ${
          compact ? "h-10 px-3" : "min-h-9 px-3 py-2"
        }`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-[#4E73C7]">
          {initials}
        </span>
        <span className="hidden max-w-32 truncate sm:inline">{displayName}</span>
        <ChevronDown aria-hidden="true" size={16} />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 overflow-hidden rounded-xl border border-[#B3D4E5] bg-white py-2 text-sm text-gray-700 shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
        >
          <Link
            role="menuitem"
            href="/profil"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-3 font-semibold hover:bg-[#E2F4FF] hover:text-[#4E73C7]"
          >
            <UserRound aria-hidden="true" size={17} />
            Profil
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-3 text-left font-semibold hover:bg-[#E2F4FF] hover:text-[#4E73C7]"
          >
            <LogOut aria-hidden="true" size={17} />
            Se déconnecter
          </button>
        </div>
      ) : null}
    </div>
  );
}
