// Palette de DONNÉES — distincte de la palette de charte (global.css : nuit + bleu glacier).
// Sur fond sombre, ce qui compte doit BRILLER : l'échelle va du brun sombre (peu)
// au jaune chaud (beaucoup). La luminosité augmente régulièrement d'une classe à
// l'autre : l'ordre se lit aussi sans voir les teintes (daltonisme, impression N&B).

// Séquentielle en 5 classes. Des classes plutôt qu'un dégradé continu :
// plus facile de lire « dans quelle tranche est ma commune ».
export const classes = ["#4a2418", "#8a3a1c", "#cf5a24", "#f39237", "#ffd27a"];
export const sequentielle = { type: "quantize", range: classes };
export const barre = classes[3];

// Catégorielle (Okabe-Ito) : un aléa = une couleur, constante sur tout le site.
export const aleas = {
  chaleur: "#e69f00",
  feux: "#d55e00",
  inondation: "#56b4e9",
  industriel: "#cc79a7",
  argiles: "#009e73",
};

// Mise en évidence (interaction) : élément sélectionné vs le reste.
export const surligne = "#edf0f3";
export const neutre = "#39414c";
export const texteSecondaire = "#9aa4b0";
export const fond = "#0e1116"; // fond de page : traits de séparation entre communes, halos de texte
