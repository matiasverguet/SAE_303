# Données du site

Seuls des fichiers **préfiltrés** vivent ici (colonnes utiles, 28 communes, deux décimales).
Aucun fichier brut du défi dans le dépôt : le nettoyage se fait dans le notebook Observable.

| Fichier | Origine | Contenu |
|---|---|---|
| `communes.json` | geo.api.gouv.fr (EPCI 243300316) | `code`, `nom`, `population`, `surface_km2` |
| `communes-contours.json` | geo.api.gouv.fr, simplifié avec mapshaper (12 %) | GeoJSON, propriétés `code`, `nom` |
| `demo/indicateur-communes.json` | ⚠️ **FACTICE** (aléatoire) | sert uniquement à tester la mise en page |
| `sources.js` | — | liste des sources affichée sur la page Méthode |

## Format attendu de l'export du notebook

Pour remplacer le fichier factice sans toucher aux graphiques, exporter **une ligne par commune** :

```json
[{ "code": "33063", "nom": "Bordeaux", "population": 267991, "exposes": 12345, "part": 4.61 }]
```

- `code` : code INSEE (texte, 5 caractères) — clé de jointure avec les contours
- `population` : le **dénominateur** (gardé dans le fichier pour que le taux soit vérifiable)
- `exposes` : le numérateur
- `part` : `exposes / population * 100`, arrondi à 2 décimales

Puis : modifier l'import dans `index.js` et passer `donneesDemo: false` dans `src/site.config.js`.
Si l'indicateur change de nature (autre unité, autre dénominateur), adapter les libellés dans `src/lib/charts.js`.
