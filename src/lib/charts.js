// Visualisations « prêtes pour le site » (méthode TP5) :
// chaque fonction reçoit ses données en paramètre et ne lit rien d'autre.
// Le même code tourne au build (Astro + jsdom, on passe `document`)
// et dans le navigateur (document global).

import * as Plot from "@observablehq/plot";
import { sequentielle, barre, surligne, neutre, texteSecondaire, fond } from "./palette.js";

const nombre = new Intl.NumberFormat("fr-FR");
export const pct = (v) =>
  `${v.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
export const nb = (v) => nombre.format(v);
export const rangTexte = (r) => (r === 1 ? "1<sup>re</sup>" : `${r}<sup>e</sup>`);

const style = { fontSize: "13px", fontFamily: "inherit", background: "transparent" };

/** Taux de la métropole entière : somme des numérateurs / somme des dénominateurs
 *  (et non moyenne des taux communaux, qui donnerait le même poids à Ambès et à Bordeaux). */
export function tauxMetropole(data) {
  const exposes = data.reduce((s, d) => s + d.exposes, 0);
  const population = data.reduce((s, d) => s + d.population, 0);
  return (exposes / population) * 100;
}

/** V2 — Carte : part de la population exposée par commune (valeur rapportée, pas brute). */
/** `lien` (facultatif) : fonction code INSEE → URL. Chaque commune devient alors un lien
 *  (question du lecteur : « et ma commune ? » → un clic ouvre sa fiche). */
export function carteTaux(contours, data, { document, selection, lien, width = 640, ariaLabel, ariaDescription } = {}) {
  const parCode = new Map(data.map((d) => [d.code, d]));
  const max = Math.max(...data.map((d) => d.part));
  return Plot.plot({
    document, width, style, ariaLabel, ariaDescription,
    projection: { type: "mercator", domain: contours },
    color: {
      ...sequentielle,
      domain: [0, Math.ceil(max / 5) * 5],
      legend: true,
      label: "Part de la population exposée (%)",
    },
    marks: [
      // Fond gris : une commune sans donnée reste visible au lieu de disparaître
      Plot.geo(contours, { fill: neutre, stroke: fond, ariaHidden: true }),
      Plot.geo(contours.features, {
        filter: (f) => parCode.has(f.properties.code),
        fill: (f) => parCode.get(f.properties.code).part,
        href: lien && ((f) => lien(f.properties.code)),
        stroke: fond,
        strokeWidth: 0.8,
        title: (f) => {
          const d = parCode.get(f.properties.code);
          return `${d.nom}\n${pct(d.part)} (${nb(d.exposes)} hab. sur ${nb(d.population)})`;
        },
      }),
      selection &&
        Plot.geo(contours.features, {
          filter: (f) => f.properties.code === selection,
          stroke: surligne,
          strokeWidth: 2.5,
          ariaHidden: true,
        }),
      Plot.text(
        contours.features,
        Plot.centroid({
          filter: (f) => f.properties.code === (selection ?? "33063"),
          text: (f) => f.properties.nom,
          fill: surligne,
          stroke: fond,
          strokeWidth: 4,
          fontWeight: "bold",
        }),
      ),
    ],
  });
}

/** V3 — Comparaison des communes, triées, avec le taux métropolitain en référence. */
export function barresCommunes(data, { document, selection, width = 640, ariaLabel, ariaDescription } = {}) {
  const ref = tauxMetropole(data);
  const max = Math.max(...data.map((d) => d.part));
  const aDroite = ref > max * 0.6; // l'étiquette passe à gauche de la ligne si elle risque de sortir du cadre
  return Plot.plot({
    document, width, style, ariaLabel, ariaDescription,
    height: data.length * 22 + 60,
    marginLeft: 175,
    marginRight: 56,
    marginTop: 36,
    x: { label: "Part de la population exposée (%) →", grid: true, nice: true },
    y: { label: null },
    marks: [
      // Annotation : la référence métropolitaine (dessinée sous les barres et les étiquettes)
      Plot.ruleX([ref], { stroke: surligne, strokeDasharray: "4 3", ariaHidden: true }),
      Plot.barX(data, {
        x: "part",
        y: "nom",
        sort: { y: "-x" },
        fill: (d) => (selection && d.code !== selection ? neutre : barre), // choisie : orange ; les autres : gris
        title: (d) => `${d.nom} : ${pct(d.part)} (${nb(d.exposes)} hab. sur ${nb(d.population)})`,
      }),
      Plot.text(data, {
        x: "part",
        y: "nom",
        text: (d) => pct(d.part),
        textAnchor: "start",
        dx: 4,
        fill: (d) => (selection && d.code !== selection ? texteSecondaire : surligne),
        stroke: fond,
        strokeWidth: 3,
      }),
      Plot.ruleX([0], { ariaHidden: true }),
      Plot.text([ref], {
        x: (d) => d,
        frameAnchor: "top",
        dy: -20,
        textAnchor: aDroite ? "end" : "start",
        dx: aDroite ? -4 : 4,
        text: (d) => `Métropole : ${pct(d)}`,
        fontWeight: "bold",
      }),
    ],
  });
}
