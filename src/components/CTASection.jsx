import { ArrowRight, Calendar, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section id="kontakt" className="scroll-mt-20 bg-linen py-20 sm:py-24">
      <div className="premium-container overflow-hidden rounded-[34px] bg-charcoal text-ivory shadow-soft">
        <div className="grid lg:grid-cols-[1fr_0.78fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-sm font-semibold uppercase text-mustard">Arvin &amp; Benet</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              Pozrite si byt očami svojimi. Zvierací audit už prebehol.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ivory/72 sm:text-lg">
              Interaktívny prototyp ukáže princíp kampane. Reálnu obhliadku, presné zábery a dáta
              vieme napojiť bez zmeny príbehu.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hello@arvinbenet.sk"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mustard px-6 py-3 text-sm font-semibold text-charcoal transition hover:bg-[#D8AA3B]"
              >
                Dohodnúť obhliadku
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+421000000000"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/18 px-6 py-3 text-sm font-semibold text-ivory transition hover:border-mustard"
              >
                <Phone className="h-4 w-4" />
                Zavolať maklérovi
              </a>
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden bg-walnut">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(180deg,rgba(32,31,28,0.12),rgba(32,31,28,0.58)), url('tour/terrace-panorama.png')",
              }}
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/18 bg-charcoal/58 p-5 backdrop-blur">
              <p className="flex items-center gap-2 text-sm font-semibold text-mustard">
                <Calendar className="h-4 w-4" />
                Ďalší krok
              </p>
              <p className="mt-2 font-serif text-2xl leading-tight">
                Interaktívna obhliadka je pripravená na nasadenie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
