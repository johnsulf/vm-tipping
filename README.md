# VM-tipping 2026

Nettside for tippekonkurransen om VM i fotball 2026: hva alle har tippet, poeng underveis,
leaderboard og litt statistikk-moro. Bygget med Angular 22, Tailwind og
[@helsevestikt/hviktor-angular](https://www.npmjs.com/package/@helsevestikt/hviktor-angular).

Ingen database: tippedata og fasit ligger i repoet, og siden oppdateres ved å deploye på nytt.

## Slik virker dataflyten

```
data/google_sheet.csv ──(scripts/import-data.mjs)──▶ src/app/data/predictions.generated.ts
src/app/data/questions.ts   (spørsmålstekster og kategorier)
src/app/data/results.ts     (FASIT - redigeres for hånd underveis)
```

Import-scriptet kjøres automatisk før `npm start` og `npm run build`, så generert fil er alltid
i synk med CSV-en.

## Registrere resultater (det du gjør underveis)

1. Åpne [src/app/data/results.ts](src/app/data/results.ts).
2. Fjern kommentaren for spørsmålet som er avgjort og skriv inn riktig svar - du får
   autocomplete på svarene deltakerne har gitt, men kan også skrive andre verdier.
   Matching mot deltakersvar er case-ufølsom.
3. Commit, push og deploy. Uutfylte spørsmål vises som «uavklart» og teller ikke i poengsummen.

## Oppdatere tippedata (hvis Google Sheet endres)

Last ned arket på nytt som CSV og erstatt `data/google_sheet.csv`. Hvis spørsmålene har endret
seg, må også `QUESTIONS` i `scripts/import-data.mjs` og `src/app/data/questions.ts` oppdateres -
import-scriptet feiler med en tydelig melding hvis kolonnene ikke stemmer.

## Utvikling

```bash
npm start          # dev-server på http://localhost:4200
npm test           # vitest (scoring m.m.)
npm run build      # produksjonsbygg til dist/vm-tipping/browser
```

Krever Node 22+ (Angular CLI 22).

## Deploy til GitHub Pages

Deployen skjer automatisk via [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
ved hver push til `main` (eller manuelt fra Actions-fanen). Workflowen kjører testene, bygger
med `npm run build:pages` (`--base-href /vm-tipping/`) og publiserer `dist/vm-tipping/browser`.

**Engangsoppsett:** I repo-innstillingene må Settings → Pages → «Build and deployment» →
Source settes til **GitHub Actions** (ikke «Deploy from a branch» – da serveres bare
kildekoden, og GitHub viser README-en).

Bygget lager også en `404.html` (kopi av `index.html`) slik at dyplenker som
`/deltaker/erlend` fungerer på Pages. Hvis siden skal ligge på et annet path enn
`/vm-tipping/`, juster `--base-href` i `build:pages`-scriptet i `package.json`.
