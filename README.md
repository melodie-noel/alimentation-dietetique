# Site Mélodie Noël — Diététique & Hypnose

Site statique généré avec **Eleventy (11ty)**.

## Développer en local
```bash
npm install
npm run serve   # http://localhost:8080 avec rechargement auto
npm run build   # génère le site dans _site/
```

## Structure
- `src/` : sources
  - `_includes/base.njk` : gabarit commun (head, header, footer)
  - `*.njk` : une page par fichier (contenu recopié à l'identique de l'ancien site)
  - `assets/` : CSS, JS, images, flyers (copiés tels quels vers `_site/assets/`)
- `_site/` : sortie générée (ne pas committer, voir .gitignore)
- `netlify.toml` : build Netlify (`npm run build`, publication de `_site/`)

## Déploiement Netlify
Netlify lit `netlify.toml` : commande `npm run build`, dossier publié `_site`.
À tester d'abord sur la branche **preprod**.

## Prochaine étape (non incluse ici)
Mise en place de **Decap CMS** : extraction des contenus éditables dans des fichiers
de données + interface `/admin` + authentification (DecapBridge).
