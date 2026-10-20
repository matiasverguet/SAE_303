- URL site WEB : TODO (Netlify)
- URL Notebook Observable : TODO
- Nom : Verguet
- Prénom : Matias
- Nom binome : TODO
- Prénom binome : TODO

Défi Open Data University : [Prévention des risques à Bordeaux Métropole](https://defis.data.gouv.fr/defis/prevention-des-risques-a-bordeaux-metropole)

# Remarques :

> ⚠️ Tant que `donneesDemo: true` dans [src/site.config.js](src/site.config.js), le site affiche des **données factices** (bandeau visible sur toutes les pages).

## Structure

| Chemin | Rôle |
|---|---|
| [src/pages/index.astro](src/pages/index.astro) | Le récit en 4 temps : contexte → exploration → révélation → conclusion |
| [src/pages/communes/[code].astro](src/pages/communes/[code].astro) | Une fiche statique par commune (route C) |
| [src/pages/methode.astro](src/pages/methode.astro) | Sources, traitements, routes d'export, limites, téléchargements |
| [src/pages/donnees/[fichier].js](src/pages/donnees/[fichier].js) | Génère au build les CSV/JSON téléchargeables à partir des mêmes fichiers que les graphiques |
| [src/lib/charts.js](src/lib/charts.js) | Les visualisations, écrites comme au TP5 : fonctions qui reçoivent leurs données en paramètre |
| [src/lib/palette.js](src/lib/palette.js) | Palette de **données** (distincte de la palette de charte dans [global.css](src/styles/global.css)) |
| [src/data/](src/data/) | Données préfiltrées + [format attendu de l'export du notebook](src/data/README.md) |

## Routes d'export

- **A — au build** ([PlotFigure.astro](src/components/PlotFigure.astro)) : carte et comparaison, rendues en SVG par Plot + jsdom. Zéro JavaScript côté lecteur.
- **B — chez le lecteur** ([ExplorateurCommune.astro](src/components/ExplorateurCommune.astro)) : « Et dans ma commune ? » — sélecteur qui redessine le graphique et rédige une phrase de comparaison. Rendu initial au build (lisible sans JS), re-rendu à la largeur réelle de l'écran.
- **C — une page par valeur** : 28 fiches communes générées par `getStaticPaths`.

## Accessibilité

- `<figure>` / `<figcaption>` sur chaque visualisation, titre porteur + sous-titre + source, description textuelle reliée par `aria-describedby`.
- Lien d'évitement, `lang="fr"`, navigation avec `aria-current`, focus visible, phrase de l'explorateur en `aria-live`.
- Infobulles natives (`title`) sur les barres et les communes : fonctionnent aussi avec le rendu au build.

## Lancer en local

```bash
npm install
npm run dev
```
