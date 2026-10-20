// Réglages globaux du site : un seul endroit à modifier.
export const site = {
  titre: "Risques à Bordeaux Métropole", // TODO : titre porteur une fois l'angle choisi
  description:
    "Comprendre les risques auxquels sont exposés les habitants des 28 communes de Bordeaux Métropole, à partir de données ouvertes.",
  auteurs: ["Matias Verguet", "TODO binôme"],
  notebook: "https://observablehq.com/TODO", // lien du notebook Observable
  depot: "https://github.com/matiasverguet/SAE_303",
  defi: "https://defis.data.gouv.fr/defis/prevention-des-risques-a-bordeaux-metropole",
  // Tant que true : bandeau « données factices » sur toutes les pages.
  // Passer à false quand les vrais fichiers exportés du notebook remplacent src/data/demo/.
  donneesDemo: true,
};
