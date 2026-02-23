# CM-DESIGN — CDN Distribution

<p align="center">
  <img src="https://img.shields.io/badge/version-1.1.0-blue?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/CSS_Framework-Church_Manager-purple?style=flat-square" alt="CM-DESIGN">
</p>

Un framework CSS moderne, léger et personnalisable pour créer des interfaces professionnelles.
Ce repo contient **uniquement les fichiers compilés** prêts à l'emploi via CDN.

---

## Quick Start

Copiez-collez ce template HTML pour commencer immédiatement :

```html
<!DOCTYPE html>
<html lang="fr" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon App — CM-DESIGN</title>

  <!-- Google Fonts (recommandé) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Montserrat:wght@400;500;600;700&display=swap">

  <!-- Font Awesome (icônes) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <!-- CM-DESIGN CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/romyklk/cm-design-cdn@main/cm-design.min.css">
</head>
<body>

  <div class="container py-4">
    <h1>Hello CM-DESIGN! 🎉</h1>
    <p class="text-muted mb-3">Framework CSS prêt à l'emploi.</p>

    <!-- Buttons -->
    <div class="d-flex flex-wrap gap-2 mb-4">
      <button class="btn btn--primary">Primary</button>
      <button class="btn btn--secondary">Secondary</button>
      <button class="btn btn--success">Success</button>
      <button class="btn btn--info">Info</button>
      <button class="btn btn--warning">Warning</button>
      <button class="btn btn--danger">Danger</button>
    </div>

    <!-- Alert -->
    <div class="alert alert--info">
      <i class="fa-solid fa-circle-info"></i>
      CM-DESIGN inclut 27+ composants, un dark mode et un système de grille 12 colonnes.
    </div>

    <!-- Card -->
    <div class="card" style="max-width: 400px;">
      <div class="card__header">
        <h5 class="card__title">Exemple de Card</h5>
      </div>
      <div class="card__body">
        <p>Les composants suivent la convention <code>.cm-</code> avec une architecture BEM.</p>
        <a href="#" class="btn btn--primary btn--sm">En savoir plus</a>
      </div>
    </div>

    <!-- Grid -->
    <h3 class="mt-4 mb-2">Grille responsive</h3>
    <div class="row gap-2">
      <div class="col-md-4">
        <div class="card card--flat p-3 text-center">Col 1</div>
      </div>
      <div class="col-md-4">
        <div class="card card--flat p-3 text-center">Col 2</div>
      </div>
      <div class="col-md-4">
        <div class="card card--flat p-3 text-center">Col 3</div>
      </div>
    </div>
  </div>

  <!-- CM-DESIGN JS (theme toggle, modals, sidebar…) -->
  <script src="https://cdn.jsdelivr.net/gh/romyklk/cm-design-cdn@main/cm-design.min.js"></script>
</body>
</html>
```

---

## Installation via CDN

### CSS uniquement

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/romyklk/cm-design-cdn@v1.1.0/cm-design.min.css">
```

### CSS + JS

```html
<!-- CSS dans <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/romyklk/cm-design-cdn@v1.1.0/cm-design.min.css">

<!-- JS avant </body> -->
<script src="https://cdn.jsdelivr.net/gh/romyklk/cm-design-cdn@v1.1.0/cm-design.min.js"></script>
```

### Version épinglée (recommandé en production)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/romyklk/cm-design-cdn@v1.1.0/cm-design.min.css">
<script src="https://cdn.jsdelivr.net/gh/romyklk/cm-design-cdn@v1.1.0/cm-design.min.js"></script>
```

> **Note :** Les URLs versionnées (`@vX.X.X`) ne sont disponibles qu'après un `git tag` + `git push --tags` sur le repo source.

---

## Fichiers disponibles

| Fichier             | Usage                        |
| ------------------- | ---------------------------- |
| `cm-design.min.css` | **Production** — CSS minifié |
| `cm-design.css`     | Développement — CSS lisible  |
| `cm-design.min.js`  | **Production** — JS minifié  |
| `cm-design.js`      | Développement — JS lisible   |

---

## Dark Mode

Ajoutez `data-theme="dark"` sur la balise `<html>` :

```html
<html lang="fr" data-theme="dark">
```

Ou basculez dynamiquement avec le JS inclus (bouton `.theme-toggle`).

---

## Composants inclus

Buttons · Cards · Tables · Forms · Alerts · Badges · Navbar · Modals · Tabs · Avatars · Toggles · Stat Cards · Profile Cards · Pagination · Dividers · Breadcrumb · Data Table · Form Card · Sidebar · Topbar · Pricing · Event Cards · Planning · Progress Bars

---

## Liens

- [Documentation complète](https://github.com/romyklk/cm-design)
- [Signaler un bug](https://github.com/romyklk/cm-design/issues)
- [Changelog](https://github.com/romyklk/cm-design/blob/main/CHANGELOG.md)

---

## Licence

MIT © 2026 CM-DESIGN — Church Manager

> Ce repo est généré automatiquement. Ne pas modifier directement — les changements seront écrasés au prochain déploiement.
