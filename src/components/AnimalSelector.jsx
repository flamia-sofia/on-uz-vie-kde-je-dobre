import { Cat, Dog, Fish } from "lucide-react";
import { motion } from "framer-motion";

const animalIcons = {
  dog: Dog,
  cat: Cat,
  fish: Fish,
};

export default function AnimalSelector({ animals, selectedAnimalId, onSelect }) {
  return (
    <section id="pohlad" className="relative scroll-mt-20 bg-ivory py-20 sm:py-24">
      <div className="premium-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase text-mustard">Tri úprimné audity</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Vyberte si, kto dnes rozhodne o kvalite bývania.
          </h2>
          <p className="mt-5 text-base leading-7 text-graphite/72 sm:text-lg">
            Každé zvieratko sleduje iné detaily. Pes rieši pohyb a dvere, mačka svetlo a výšky,
            rybička výhľad zo svojho pokojného stanoviska.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {animals.map((animal, index) => {
            const Icon = animalIcons[animal.id];
            const isActive = selectedAnimalId === animal.id;

            return (
              <motion.button
                key={animal.id}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                onClick={() => onSelect(animal.id)}
                className={`group rounded-[28px] border p-6 text-left shadow-card transition ${
                  isActive
                    ? "border-mustard bg-charcoal text-ivory"
                    : "border-charcoal/10 bg-white/48 text-charcoal hover:-translate-y-1 hover:border-mustard/55 hover:bg-white/72"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl ${
                      isActive ? "bg-mustard text-charcoal" : "bg-linen text-walnut"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isActive ? "bg-ivory/12 text-ivory/78" : "bg-charcoal/5 text-graphite/62"
                    }`}
                  >
                    {animal.tone}
                  </span>
                </div>

                <h3 className="mt-7 font-serif text-3xl leading-tight">{animal.label}</h3>
                <p className={`mt-3 text-sm leading-6 ${isActive ? "text-ivory/76" : "text-graphite/70"}`}>
                  {animal.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
