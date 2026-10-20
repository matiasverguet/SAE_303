// Sources affichées sur la page Méthode. Une entrée par jeu de données réellement utilisé.
// Ne rien publier qui n'a pas été vérifié dans la source (date, licence, millésime).
export const sources = [
  {
    nom: "Découpage administratif — communes de Bordeaux Métropole (contours et population)",
    producteur: "IGN / INSEE, via l'API Découpage administratif (geo.api.gouv.fr)",
    url: "https://geo.api.gouv.fr/decoupage-administratif",
    millesime: "TODO : vérifier le millésime de population servi par l'API",
    consulte: "14 octobre 2026",
    licence: "Licence Ouverte / Etalab 2.0",
    usage: "Liste des 28 communes (EPCI 243300316), contours simplifiés pour la carte, population municipale (dénominateur).",
  },
  // Modèle pour chaque jeu de données ajouté depuis le notebook :
  // {
  //   nom: "Titre exact du jeu de données",
  //   producteur: "…",
  //   url: "https://www.data.gouv.fr/…",
  //   millesime: "…",
  //   consulte: "…",
  //   licence: "Licence Ouverte / Etalab 2.0",
  //   usage: "À quoi il sert dans le récit (numérateur, filtre, carte…).",
  // },
];
