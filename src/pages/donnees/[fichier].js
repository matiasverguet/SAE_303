// Génère au build les fichiers téléchargeables (CSV + JSON) listés dans src/data/index.js.
// Une seule source de vérité : ce que le site affiche est exactement ce qu'on télécharge.
import { telechargements } from "../../data/index.js";

export function getStaticPaths() {
  return telechargements.flatMap((t) => [
    { params: { fichier: `${t.id}.csv` }, props: { donnees: t.donnees, format: "csv" } },
    { params: { fichier: `${t.id}.json` }, props: { donnees: t.donnees, format: "json" } },
  ]);
}

const cellule = (v) => {
  const s = String(v ?? "");
  return /[",;\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

export function GET({ props }) {
  const { donnees, format } = props;
  if (format === "json") {
    return new Response(JSON.stringify(donnees, null, 1), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
  const colonnes = Object.keys(donnees[0]);
  const lignes = [colonnes.join(","), ...donnees.map((d) => colonnes.map((c) => cellule(d[c])).join(","))];
  return new Response(lignes.join("\n"), { headers: { "Content-Type": "text/csv; charset=utf-8" } });
}
