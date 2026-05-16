import { Cat, Dog, Fish, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";

const iconMap = {
  dog: Dog,
  cat: Cat,
  fish: Fish,
};

const baseVotes = {
  dog: 42,
  cat: 36,
  fish: 22,
};

export default function PollSection({ animals, selectedAnimalId }) {
  const [vote, setVote] = useState(selectedAnimalId);

  const votes = useMemo(() => {
    const nextVotes = { ...baseVotes };
    nextVotes[vote] += 8;
    return nextVotes;
  }, [vote]);

  const total = Object.values(votes).reduce((sum, item) => sum + item, 0);

  return (
    <section className="bg-charcoal py-20 text-ivory sm:py-24">
      <div className="premium-container grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase text-mustard">
            <MessageCircle className="h-4 w-4" />
            Social poll
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            Kto by predal byt najpresvedčivejšie?
          </h2>
          <p className="mt-5 text-base leading-7 text-ivory/72 sm:text-lg">
            Pes má dôveru. Mačka má názor. Rybička má prekvapivo dobrý výhľad.
          </p>
        </div>

        <div className="rounded-[30px] border border-ivory/12 bg-ivory/8 p-5 shadow-soft backdrop-blur">
          <div className="grid gap-3">
            {animals.map((animal) => {
              const Icon = iconMap[animal.id];
              const percentage = Math.round((votes[animal.id] / total) * 100);
              const isActive = vote === animal.id;

              return (
                <button
                  key={animal.id}
                  type="button"
                  onClick={() => setVote(animal.id)}
                  className={`rounded-3xl border p-4 text-left transition ${
                    isActive
                      ? "border-mustard bg-ivory/12"
                      : "border-ivory/10 bg-charcoal/20 hover:border-ivory/28"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ivory/10 text-mustard">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-serif text-2xl">{animal.label}</p>
                        <p className="truncate text-sm text-ivory/58">{animal.tone}</p>
                      </div>
                    </div>
                    <span className="text-2xl font-semibold text-mustard">{percentage}%</span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-ivory/10">
                    <div
                      className="h-full rounded-full bg-mustard transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
