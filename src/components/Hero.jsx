import { ArrowRight, Compass, PawPrint } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[92vh] overflow-hidden bg-charcoal pt-16 text-ivory"
    >
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('tour/living-panorama.png')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(32,31,28,0.92)_0%,rgba(32,31,28,0.78)_32%,rgba(32,31,28,0.34)_62%,rgba(32,31,28,0.10)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-ivory to-transparent" />

      <div className="premium-container flex min-h-[calc(92vh-4rem)] items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-8 flex max-w-xl items-center gap-3 border-l border-mustard pl-4 text-sm text-ivory/76">
            <PawPrint className="h-5 w-5 shrink-0 text-mustard" />
            <span>Prémiový byt hodnotený niekým, kto si nevymýšľa.</span>
          </div>

          <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
            On už vie, kde je dobre.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-ivory/82 sm:text-xl">
            Prémiové bývanie očami toho najúprimnejšieho člena domácnosti.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#pohlad"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mustard px-6 py-3 text-sm font-semibold text-charcoal shadow-[0_20px_45px_rgba(201,154,46,0.28)] transition hover:bg-[#D8AA3B]"
            >
              Vybrať pohľad
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#obhliadka"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/24 bg-ivory/8 px-6 py-3 text-sm font-semibold text-ivory backdrop-blur transition hover:border-ivory/44 hover:bg-ivory/14"
            >
              <Compass className="h-4 w-4" />
              Prejsť byt
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
