# Arvin & Benet Pet POV Landing

Interaktívna landing page pre kampaň **„On už vie, kde je dobre.“**

Stránka prezentuje prémiové bývanie očami psa, mačky a rybičky. Obsahuje výber zvieratka, interaktívnu obhliadku miestností, klikateľné anotácie, mapu bytu, lokálne 360 vizuály a responzívny layout pripravený na nasadenie.

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Spustenie lokálne

```bash
npm install
npm run dev
```

Lokálna adresa:

```text
http://127.0.0.1:5173
```

## Produkčný build

```bash
npm run build
npm run preview
```

Build výstup sa vytvorí v priečinku `dist/`.

## 360 vizuály

Produkčné panoramatické vizuály sú uložené v:

```text
public/tour/
```

Použité súbory:

- `living-panorama.png`
- `kitchen-panorama.png`
- `terrace-panorama.png`
- `bedroom-panorama.png`
- `bathroom-panorama.png`
- `hall-panorama.png`

Miestnosti, anotácie a asset cesty sú definované v:

```text
src/data/tourData.js
```

## Deployment

Projekt je pripravený pre GitHub, Vercel, Netlify alebo GitHub Pages. Vite konfigurácia používa relatívny `base`, takže build funguje aj pri nasadení pod repozitárovým subpathom.

Pre statický hosting stačí publikovať obsah priečinka:

```text
dist/
```
