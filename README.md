# 🎮 Pokédex React + TypeScript

Une application web moderne de Pokédex construite avec React, TypeScript et Vite, consommant l'API NestJS Pokémon.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)

## 📋 Description

Cette application permet de parcourir et découvrir les Pokémon avec une interface intuitive et moderne. Elle offre :

- 📜 **Liste complète** des Pokémon avec pagination infinie
- 🔍 **Filtres avancés** par nom et types
- 🎯 **Détails complets** de chaque Pokémon (stats, évolutions)
- 📱 **Design responsive** optimisé pour tous les appareils
- ✨ **Interface moderne** avec animations et effets visuels

## 🚀 Fonctionnalités

### Page Principale
- ✅ Affichage de 50 pokémons par défaut
- ✅ Scroll infini pour charger plus de pokémons
- ✅ Filtre par nom (recherche en temps réel)
- ✅ Filtre par type(s) (sélection multiple)
- ✅ Sélection du nombre de pokémons par page (25, 50, 100)
- ✅ Cards affichant l'ID, l'image, le nom et les types

### Page Détail (Modal)
- ✅ Affichage des informations complètes du pokémon
- ✅ Image haute qualité
- ✅ Statistiques détaillées avec barres de progression
- ✅ Liste des évolutions
- ✅ Bouton retour pour fermer le modal

## 🛠️ Technologies Utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **CSS3** - Animations et design moderne
- **Fetch API** - Consommation de l'API REST

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/nbouzidia/pokedex.git

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

## 🌐 API

L'application consomme l'API : `https://nestjs-pokedex-api.vercel.app`

### Endpoints utilisés :
- `GET /pokemons` - Liste des pokémons avec filtres
- `GET /pokemons/:pokedexId` - Détails d'un pokémon
- `GET /types` - Liste des types


## 🏗️ Structure du Projet

```
src/
├── components/
│   ├── PokemonCard.tsx      # Carte d'affichage d'un pokémon
│   ├── PokemonDetail.tsx    # Modal de détails
│   └── Filters.tsx          # Filtres de recherche
├── hooks/
│   └── usePokemons.ts       # Hook personnalisé pour gérer les pokémons
├── services/
│   └── api.ts               # Appels API
├── types/
│   └── pokemon.ts           # Types TypeScript
├── App.tsx                  # Composant principal
└── main.tsx                 # Point d'entrée
```