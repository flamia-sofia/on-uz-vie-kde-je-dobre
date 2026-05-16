import { Building2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ivory py-10 text-charcoal">
      <div className="premium-container flex flex-col gap-6 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-charcoal font-serif text-lg text-mustard">
            A
          </span>
          <div>
            <p className="font-serif text-xl">Arvin &amp; Benet</p>
            <p className="text-sm text-graphite/62">On už vie, kde je dobre.</p>
          </div>
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
