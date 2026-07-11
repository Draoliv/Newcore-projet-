# Info Retraite

Site web informatif pour **comprendre et préparer sa retraite** en France.

## 🎯 Objectif

Aider chacun à y voir clair dans le système de retraite français : âge de départ,
calcul de la pension, régimes, démarches, questions fréquentes.

## ✨ Fonctionnalités

- **Page d'accueil** moderne et responsive (mobile, tablette, desktop)
- **Comprendre le système** — régime de base, complémentaire, épargne, trimestres, taux plein, décote/surcote
- **Âge de départ** — tableau du barème de la réforme 2023 par année de naissance
- **Simulateur interactif** — estime l'âge légal, les trimestres requis, l'année de départ et une fourchette de pension
- **Démarches** pas à pas
- **FAQ** dépliable
- Menu mobile, navigation active, année dynamique

## 📁 Structure

```
.
├── index.html        # Page principale
├── css/
│   └── style.css     # Styles
├── js/
│   └── main.js       # Menu, simulateur, interactions
└── assets/           # Ressources (images, etc.)
```

## 🚀 Lancer le site en local

Aucune dépendance : c'est un site statique.

```bash
# Ouvrir directement le fichier
open index.html          # macOS
xdg-open index.html      # Linux

# … ou via un petit serveur local
python3 -m http.server 8000
# puis http://localhost:8000
```

## ⚠️ Avertissement

Les informations et estimations fournies sont **indicatives** et n'ont pas de valeur
officielle. Pour vos droits réels, consultez [info-retraite.fr](https://www.info-retraite.fr)
et [L'Assurance retraite](https://www.lassuranceretraite.fr).
