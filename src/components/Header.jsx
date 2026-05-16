import { Calendar, Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Pohľad", href: "#pohlad" },
  { label: "Obhliadka", href: "#obhliadka" },
  { label: "Byt", href: "#byt" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/18 bg-charcoal/70 text-ivory shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="premium-container flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-3" aria-label="Arvin & Benet domov">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-mustard/50 bg-ivory/10 font-serif text-lg text-mustard shadow-insetWarm">
            A
          </span>
          <span className="leading-none">
            <span className="block font-serif text-lg">Arvin &amp; Benet</span>
            <span className="block text-[11px] uppercase text-ivory/62">premium real estate</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-ivory/78 md:flex" aria-label="Hlavná navigácia">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-mustard">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#kontakt"
            className="hidden items-center gap-2 rounded-full bg-mustard px-4 py-2 text-sm font-semibold text-charcoal shadow-[0_10px_24px_rgba(201,154,46,0.28)] transition hover:bg-[#D7AA41] sm:flex"
          >
            <Calendar className="h-4 w-4" />
            Obhliadka
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 text-ivory md:hidden"
            aria-label="Otvoriť navigáciu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="premium-container grid gap-2 border-t border-ivory/10 pb-4 pt-3 text-sm text-ivory/84 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-3 py-3 transition hover:bg-ivory/10 hover:text-mustard"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
