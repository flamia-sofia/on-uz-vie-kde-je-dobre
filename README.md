# On už vie, kde je dobre

Interaktívna landing page pre kampaň Arvin & Benet **„On už vie, kde je dobre.“**

Live verzia:

```text
https://flamia-sofia.github.io/on-uz-vie-kde-je-dobre/
```

Stránka prezentuje prémiové bývanie očami psa, mačky a rybičky. Obsahuje výber zvieratka, interaktívnu obhliadku miestností, klikateľné anotácie, mapu bytu, lokálne 360 vizuály a responzívny layout pripravený na verejné nasadenie.

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

## GitHub Pages

Verejná verzia je publikovaná z vetvy `main`, priečinok `docs/`.

Pri ďalších produkčných zmenách:

```bash
npm run build
```

Potom preneste obsah z `dist/` do `docs/`, commitnite a pushnite na `main`.

## 360 vizuály

Panoramatické vizuály sú uložené v:

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
