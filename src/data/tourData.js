export const defaultRoomId = "living";

export const animals = [
  {
    id: "dog",
    label: "Pes",
    shortLabel: "psa",
    headline: "Nízky pohľad, vysoké nároky.",
    description:
      "Všíma si slnko, koberec, dvere a všetko, čo by mohlo náhodou spadnúť na zem.",
    canMove: true,
    tone: "Oddaný domáci audit",
    accent: "#C99A2E",
  },
  {
    id: "cat",
    label: "Mačka",
    shortLabel: "mačky",
    headline: "Luxus sa pozná podľa parapetu.",
    description:
      "Hodnotí byt z gauča, postele a výškových stanovíšť s prirodzenou autoritou.",
    canMove: true,
    tone: "Tiché posudzovanie kvality",
    accent: "#7E8C78",
  },
  {
    id: "fish",
    label: "Rybička",
    shortLabel: "rybičky",
    headline: "Stále miesto. Veľký rozhľad.",
    description:
      "Nikam nechodí, iba sa otáča v akváriu a komentuje byt z centra diania.",
    canMove: false,
    tone: "Prémiový výhľad z vody",
    accent: "#6F91A5",
  },
];

export const rooms = [
  {
    id: "living",
    title: "Obývačka",
    shortTitle: "Obývačka",
    position: { x: 45, y: 42 },
    connectedTo: ["kitchen", "terrace", "hall"],
    scene: {
      label: "Denná zóna s výhľadom",
      fallback:
        "linear-gradient(115deg, rgba(58,47,39,0.94), rgba(144,111,73,0.74) 42%, rgba(247,241,231,0.46))",
      imageUrl: "",
      panoramaUrl: "tour/living-panorama.png",
    },
  },
  {
    id: "kitchen",
    title: "Kuchyňa",
    shortTitle: "Kuchyňa",
    position: { x: 73, y: 38 },
    connectedTo: ["living", "hall"],
    scene: {
      label: "Kuchyňa s teplým drevom",
      fallback:
        "linear-gradient(115deg, rgba(64,50,40,0.94), rgba(166,110,82,0.70) 42%, rgba(247,241,231,0.44))",
      imageUrl: "",
      panoramaUrl: "tour/kitchen-panorama.png",
    },
  },
  {
    id: "terrace",
    title: "Terasa",
    shortTitle: "Terasa",
    position: { x: 25, y: 23 },
    connectedTo: ["living"],
    scene: {
      label: "Terasa s mestom pred sebou",
      fallback:
        "linear-gradient(115deg, rgba(35,37,34,0.92), rgba(126,140,120,0.70) 45%, rgba(239,228,212,0.42))",
      imageUrl: "",
      panoramaUrl: "tour/terrace-panorama.png",
    },
  },
  {
    id: "bedroom",
    title: "Spálňa",
    shortTitle: "Spálňa",
    position: { x: 34, y: 72 },
    connectedTo: ["hall", "bathroom"],
    scene: {
      label: "Tichá spálňa",
      fallback:
        "linear-gradient(115deg, rgba(51,43,39,0.92), rgba(108,79,61,0.70) 42%, rgba(247,241,231,0.46))",
      imageUrl: "",
      panoramaUrl: "tour/bedroom-panorama.png",
    },
  },
  {
    id: "bathroom",
    title: "Kúpeľňa",
    shortTitle: "Kúpeľňa",
    position: { x: 63, y: 74 },
    connectedTo: ["bedroom", "hall"],
    scene: {
      label: "Kúpeľňa s kamennou kresbou",
      fallback:
        "linear-gradient(115deg, rgba(44,43,41,0.92), rgba(201,154,46,0.40) 38%, rgba(247,241,231,0.48))",
      imageUrl: "",
      panoramaUrl: "tour/bathroom-panorama.png",
    },
  },
  {
    id: "hall",
    title: "Vstupná hala",
    shortTitle: "Hala",
    position: { x: 56, y: 56 },
    connectedTo: ["living", "kitchen", "bedroom", "bathroom"],
    scene: {
      label: "Prvý dojem po otvorení dverí",
      fallback:
        "linear-gradient(115deg, rgba(42,37,32,0.94), rgba(108,79,61,0.70) 40%, rgba(247,241,231,0.44))",
      imageUrl: "",
      panoramaUrl: "tour/hall-panorama.png",
    },
  },
];

export const directions = [
  { value: 0, label: "pred seba" },
  { value: 90, label: "doprava" },
  { value: 180, label: "za seba" },
  { value: 270, label: "doľava" },
];

export const roomNavigationHotspots = {
  living: [
    {
      id: "living-kitchen",
      targetRoomId: "kitchen",
      label: "Dvere do kuchyne",
      direction: 0,
      x: 20,
      y: 55,
      arrivalAngle: 270,
    },
    {
      id: "living-terrace",
      targetRoomId: "terrace",
      label: "Na terasu",
      direction: 0,
      x: 66,
      y: 47,
      arrivalAngle: 180,
    },
    {
      id: "living-hall",
      targetRoomId: "hall",
      label: "Do haly",
      direction: 0,
      x: 95,
      y: 55,
      arrivalAngle: 0,
    },
  ],
  kitchen: [
    {
      id: "kitchen-living",
      targetRoomId: "living",
      label: "Späť do obývačky",
      direction: 270,
      x: 31,
      y: 52,
      arrivalAngle: 90,
    },
    {
      id: "kitchen-hall",
      targetRoomId: "hall",
      label: "Do haly",
      direction: 0,
      x: 70,
      y: 48,
      arrivalAngle: 90,
    },
  ],
  terrace: [
    {
      id: "terrace-living",
      targetRoomId: "living",
      label: "Späť do obývačky",
      direction: 180,
      x: 7,
      y: 50,
      arrivalAngle: 0,
    },
  ],
  bedroom: [
    {
      id: "bedroom-hall",
      targetRoomId: "hall",
      label: "Do haly",
      direction: 180,
      x: 4,
      y: 51,
      arrivalAngle: 180,
    },
    {
      id: "bedroom-bathroom",
      targetRoomId: "bathroom",
      label: "Do kúpeľne",
      direction: 90,
      x: 32,
      y: 49,
      arrivalAngle: 270,
    },
  ],
  bathroom: [
    {
      id: "bathroom-hall",
      targetRoomId: "hall",
      label: "Do haly",
      direction: 180,
      x: 13,
      y: 52,
      arrivalAngle: 180,
    },
    {
      id: "bathroom-bedroom",
      targetRoomId: "bedroom",
      label: "Do spálne",
      direction: 0,
      x: 89,
      y: 52,
      arrivalAngle: 90,
    },
  ],
  hall: [
    {
      id: "hall-living",
      targetRoomId: "living",
      label: "Do obývačky",
      direction: 0,
      x: 5,
      y: 52,
      arrivalAngle: 0,
    },
    {
      id: "hall-kitchen",
      targetRoomId: "kitchen",
      label: "Do kuchyne",
      direction: 90,
      x: 30,
      y: 50,
      arrivalAngle: 0,
    },
    {
      id: "hall-bedroom",
      targetRoomId: "bedroom",
      label: "Do spálne",
      direction: 180,
      x: 80,
      y: 51,
      arrivalAngle: 0,
    },
    {
      id: "hall-bathroom",
      targetRoomId: "bathroom",
      label: "Do kúpeľne",
      direction: 180,
      x: 72,
      y: 51,
      arrivalAngle: 0,
    },
  ],
};

export const annotations = {
  dog: {
    living: [
      {
        id: "dog-living-sun",
        title: "Ranné slnko na leňošenie",
        detail:
          "Svetlo dopadá tam, kde sa dá robiť nič s maximálnou vážnosťou. Presne takto sa pozná dobrá denná zóna.",
        x: 62,
        y: 44,
        direction: 0,
      },
      {
        id: "dog-living-rug",
        title: "Mäkký koberec na oddych",
        detail:
          "Koberec drží obývačku útulnú, tichú a pripravenú na dlhé poobedie pri nohách gauča.",
        x: 58,
        y: 76,
        direction: 0,
      },
      {
        id: "dog-living-guard",
        title: "Perfektný kút na stráženie domácnosti",
        detail:
          "Z jedného miesta vidno sedačku, terasu aj chodbu. Bezpečnostný systém s chvostom by to schválil.",
        x: 95,
        y: 55,
        direction: 90,
      },
    ],
    kitchen: [
      {
        id: "dog-kitchen-fall",
        title: "Zóna, kde občas niečo spadne",
        detail:
          "Kuchyňa je praktická pre ľudí a mimoriadne zaujímavá pre každého, kto pozná zvuk padajúcej mrkvy.",
        x: 50,
        y: 56,
        direction: 0,
      },
      {
        id: "dog-kitchen-bowl",
        title: "Strategické miesto pre misku",
        detail:
          "Nenápadný roh pri linke necháva jedálenský priestor čistý, ale misku stále v centre diania.",
        x: 88,
        y: 70,
        direction: 90,
      },
    ],
    terrace: [
      {
        id: "dog-terrace-view",
        title: "Výhľad, pri ktorom vydržím celé hodiny",
        detail:
          "Terasa predlžuje obývačku smerom k mestu. Je dosť veľká na pokoj, rastliny aj nenápadný dohľad.",
        x: 50,
        y: 42,
        direction: 0,
      },
      {
        id: "dog-terrace-space",
        title: "Veľa priestoru na behanie",
        detail:
          "Pohyb medzi interiérom a exteriérom pôsobí prirodzene, bez úzkych miest a zbytočného zakopávania.",
        x: 67,
        y: 70,
        direction: 90,
      },
    ],
    bedroom: [
      {
        id: "dog-bedroom-bed",
        title: "Posteľ, na ktorú určite nesmiem",
        detail:
          "Spálňa je pokojná, mäkká a veľmi presvedčivo tvrdí, že posteľ patrí iba ľuďom. Uvidíme.",
        x: 52,
        y: 57,
        direction: 0,
      },
      {
        id: "dog-bedroom-corner",
        title: "Mäkký koberec na oddych",
        detail:
          "Tichý roh pri posteli funguje ako večerné stanovisko bez toho, aby narušil čistý charakter spálne.",
        x: 42,
        y: 76,
        direction: 270,
      },
    ],
    bathroom: [
      {
        id: "dog-bath-warm",
        title: "Ranné slnko na leňošenie",
        detail:
          "Aj kúpeľňa má príjemné svetlo a teplý povrch. Nie je to len technická miestnosť, ale malý rituál.",
        x: 58,
        y: 74,
        direction: 0,
      },
      {
        id: "dog-bath-door",
        title: "Kontrola každého príchodu",
        detail:
          "Dvere sú v zornom poli, takže nikto nezmizne bez oficiálneho sprievodu.",
        x: 13,
        y: 52,
        direction: 180,
      },
    ],
    hall: [
      {
        id: "dog-hall-door",
        title: "Kontrola každého príchodu",
        detail:
          "Vstupná hala má jasný prehľad o dverách aj pohybe domácnosti. Prvý dojem je pokojný, nie stiesnený.",
        x: 50,
        y: 48,
        direction: 0,
      },
      {
        id: "dog-hall-guard",
        title: "Perfektný kút na stráženie domácnosti",
        detail:
          "Odtiaľto sa dá vyhodnotiť návšteva, kuriér aj návrat z práce ešte pred odložením kľúčov.",
        x: 30,
        y: 56,
        direction: 90,
      },
    ],
  },
  cat: {
    living: [
      {
        id: "cat-living-sill",
        title: "Parapet na kontrolu holubov a susedov",
        detail:
          "Výška, svetlo a výhľad tvoria plnohodnotné pozorovacie centrum. Bez potreby pýtať si súhlas.",
        x: 62,
        y: 44,
        direction: 0,
      },
      {
        id: "cat-living-sofa",
        title: "Luxusné škrabadlo prezlečené za gauč",
        detail:
          "Gauč je elegantný, mäkký a tvári sa ako dizajnový objekt. Mačka ho berie ako multifunkčné vybavenie.",
        x: 47,
        y: 57,
        direction: 90,
      },
      {
        id: "cat-living-rug",
        title: "Mäkký koberec na 17. dnešný spánok",
        detail:
          "Akustika aj mäkkosť robia z obývačky miesto, kde sa dá zmiznúť bez toho, aby človek odišiel.",
        x: 56,
        y: 76,
        direction: 0,
      },
    ],
    kitchen: [
      {
        id: "cat-kitchen-counter",
        title: "Linka, na ktorú oficiálne nesmiem",
        detail:
          "Pracovná plocha je čistá, veľkorysá a zjavne iba pre ľudí. To je informácia, nie pravidlo.",
        x: 88,
        y: 48,
        direction: 0,
      },
      {
        id: "cat-kitchen-corner",
        title: "Tichý kút na súdenie celej domácnosti",
        detail:
          "Kuchyňa ponúka ústup aj rozhľad, čo je ideálna kombinácia pre diskrétne hodnotenie večere.",
        x: 63,
        y: 55,
        direction: 270,
      },
    ],
    terrace: [
      {
        id: "cat-terrace-sun",
        title: "Ranné slnko na profesionálne vyhrievanie",
        detail:
          "Terasa má presne ten typ svetla, pri ktorom sa deň začne bez slov a bez kompromisov.",
        x: 31,
        y: 45,
        direction: 0,
      },
      {
        id: "cat-terrace-door",
        title: "Dvere, pri ktorých sa rozhodujem, či chcem von",
        detail:
          "Prechod na terasu je prirodzený a pohodlný. Otázka, či ho použiť, zostáva otvorená.",
        x: 7,
        y: 50,
        direction: 180,
      },
    ],
    bedroom: [
      {
        id: "cat-bedroom-bed",
        title: "Posteľ, ktorá patrí mne",
        detail:
          "Spálňa drží pokojný hotelový tón. Posteľ je dominantná, mäkká a jej vlastníctvo je vec názoru.",
        x: 52,
        y: 57,
        direction: 0,
      },
      {
        id: "cat-bedroom-sun",
        title: "Ranné slnko na profesionálne vyhrievanie",
        detail:
          "Ranné svetlo sa opiera o textílie tak jemne, že aj budík pôsobí menej osobne.",
        x: 72,
        y: 43,
        direction: 270,
      },
    ],
    bathroom: [
      {
        id: "cat-bath-warm",
        title: "Ranné slnko na profesionálne vyhrievanie",
        detail:
          "Teplá dlažba a čisté línie robia kúpeľňu príjemnou aj pre niekoho, kto vodu berie osobne.",
        x: 58,
        y: 74,
        direction: 0,
      },
      {
        id: "cat-bath-judge",
        title: "Tichý kút na súdenie celej domácnosti",
        detail:
          "Nenápadné miesto pri dverách drží odstup, prehľad aj pocit, že všetko mohlo byť urobené lepšie.",
        x: 13,
        y: 52,
        direction: 180,
      },
    ],
    hall: [
      {
        id: "cat-hall-door",
        title: "Dvere, pri ktorých sa rozhodujem, či chcem von",
        detail:
          "Vstup je praktický, prehľadný a dostatočne dôstojný na päťminútové váhanie pred prahom.",
        x: 50,
        y: 48,
        direction: 0,
      },
      {
        id: "cat-hall-corner",
        title: "Tichý kút na súdenie celej domácnosti",
        detail:
          "Hala spája miestnosti bez chaosu. Z dobrého kúta sa dá sledovať takmer všetko.",
        x: 30,
        y: 56,
        direction: 90,
      },
    ],
  },
  fish: {
    living: [
      {
        id: "fish-city",
        title: "Panoramatický výhľad na celé mesto",
        detail:
          "Z akvária vidno viac, než by jeden čakal. Byt má výhľad, ktorý pracuje aj v tichu.",
        x: 66,
        y: 42,
        direction: 0,
      },
      {
        id: "fish-evening-light",
        title: "Náladové svetlo na večerné plutvenie",
        detail:
          "Večer sa obývačka zmení na pokojný salón. Svetlo nie je ostré, iba príjemne prítomné.",
        x: 82,
        y: 46,
        direction: 90,
      },
      {
        id: "fish-center",
        title: "Prémiové umiestnenie v centre diania",
        detail:
          "Akvárium nestojí bokom. Je tam, kde sa býva, rozpráva a občas prejde niekto s tanierom.",
        x: 55,
        y: 66,
        direction: 180,
      },
      {
        id: "fish-quiet",
        title: "Tichá zóna na pokojné ignorovanie okolia",
        detail:
          "Priestor okolo akvária má dosť pokoja na vlastný svet, aj keď byt prirodzene žije.",
        x: 84,
        y: 56,
        direction: 270,
      },
      {
        id: "fish-daylight",
        title: "Denné svetlo, ktoré robí show aj mne",
        detail:
          "Denné svetlo zvýrazní interiér aj hladinu. Všetko pôsobí jasne, mäkko a trochu filmovo.",
        x: 62,
        y: 43,
        direction: 0,
      },
      {
        id: "fish-people",
        title: "Výhľad na ľudí, ktorí stále niečo nosia",
        detail:
          "Obývačka má prirodzený pohyb, no nie nepokoj. Človek sa nestratí, rybička má program.",
        x: 28,
        y: 55,
        direction: 180,
      },
      {
        id: "fish-sky",
        title: "Veľké nebo bez potreby opustiť vodu",
        detail:
          "Výška okien a otvorený výhľad robia z obývačky miesto, ktoré nepôsobí uzavreto.",
        x: 64,
        y: 26,
        direction: 270,
      },
      {
        id: "fish-bedroom",
        title: "Posteľ pre personál po službe",
        detail:
          "Za dennou zónou je cítiť pokojný súkromný trakt. Personál si po kŕmení zaslúži regeneráciu.",
        x: 95,
        y: 55,
        direction: 90,
      },
    ],
  },
};

export function getRoomById(roomId) {
  return rooms.find((room) => room.id === roomId) ?? rooms[0];
}

export function getAnnotations(animalId, roomId) {
  return annotations[animalId]?.[roomId] ?? [];
}
