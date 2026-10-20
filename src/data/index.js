// Point d'entrée unique des données du site.
// Pour brancher les vraies données : remplacer l'import de ./demo/… par le fichier
// exporté du notebook (mêmes colonnes, cf. src/data/README.md), puis passer
// site.donneesDemo à false dans src/site.config.js.

import communes from "./communes.json";
import contours from "./communes-contours.json";
import indicateur from "./demo/indicateur-communes.json"; // ⚠️ FACTICE

export { communes, contours, indicateur };

// Fichiers proposés au téléchargement sur la page Méthode (générés en CSV + JSON au build).
export const telechargements = [
  {
    id: "indicateur-communes",
    titre: "Indicateur par commune (provisoire)",
    description: "Une ligne par commune : population, nombre de personnes exposées, part en %.",
    donnees: indicateur,
  },
  {
    id: "communes",
    titre: "Référentiel des 28 communes",
    description: "Code INSEE, nom, population municipale, surface en km².",
    donnees: communes,
  },
];
