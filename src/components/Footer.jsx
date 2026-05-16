import { Building2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ivory py-10 text-charcoal">
      <div className="premium-container flex flex-col gap-6 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start gap-3">
          <div className="inline-flex rounded bg-charcoal px-4 py-3 shadow-[0_10px_24px_rgba(32,31,28,0.12)]">
            <img
              src="brand/arvin-benet-logo-small.svg"
              alt="Arvin & Benet"
              className="h-8 w-auto max-w-[168px] object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-sm text-graphite/62">On už vie, kde je dobre.</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-graphite/70 sm:items-end">
          <p className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-mustard" />
            Interaktívny prototyp kampane
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-mustard" />
            hello@arvinbenet.sk
          </p>
        </div>
      </div>
    </footer>
  );
}
