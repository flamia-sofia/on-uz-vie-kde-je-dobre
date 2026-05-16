import { Bath, BedDouble, DoorOpen, Sofa, Sun, Utensils } from "lucide-react";

const cards = [
  {
    icon: Sun,
    title: "Svetlo, ktoré pracuje celý deň",
    text: "Ranné lúče, večerné nálady a výhľady, ktoré nepotrebujú veľké slová.",
  },
  {
    icon: Sofa,
    title: "Denná zóna bez prázdnych miest",
    text: "Obývačka, kuchyňa a terasa držia spolu prirodzene. Človek sa presúva, nie hľadá trasu.",
  },
  {
    icon: DoorOpen,
    title: "Dispozícia s jasným rytmom",
    text: "Vstup, súkromie aj spoločné chvíle majú svoje miesto. Aj pes to pochopí rýchlo.",
  },
  {
    icon: BedDouble,
    title: "Tichá časť bytu",
    text: "Spálňa a kúpeľňa pôsobia pokojne, mäkko a dostatočne ďaleko od denného ruchu.",
  },
  {
    icon: Utensils,
    title: "Kuchyňa pre ľudí aj náhody",
    text: "Praktická linka, teplé materiály a podlaha, kde sa občas udeje malý zázrak.",
  },
  {
    icon: Bath,
    title: "Materiály s prémiovým dojmom",
    text: "Charcoal, drevo, kameň a ivory tóny držia byt v elegantnej, nie okázalej polohe.",
  },
];

export default function PropertyCards() {
  return (
    <section id="byt" className="scroll-mt-20 bg-ivory py-20 sm:py-24">
      <div className="premium-container">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-mustard">Čo si všimnú oni</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Prémiový byt bez realitnej pózy.
          </h2>
          <p className="mt-5 text-base leading-7 text-graphite/72 sm:text-lg">
            Namiesto metrov štvorcových nechávame hovoriť drobné situácie. Tie často povedia viac
            než najdlhší popis nehnuteľnosti.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-[26px] border border-charcoal/10 bg-white/54 p-6 shadow-card"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-linen text-walnut">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-serif text-2xl leading-tight text-charcoal">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite/70">{card.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
