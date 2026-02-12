# 🎬 MovieRec Pro

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge&logo=pwa)
![Lighthouse Score](https://img.shields.io/badge/Lighthouse-99%2F100-success?style=for-the-badge)

A high-performance **Movie Recommendation Progressive Web App (PWA)** built as the final graduation project for the **ALX Prodev Frontend Program**.

This application features dynamic routing, real-time API integration, local state management for favorites, and a fully responsive interface optimized for mobile and desktop.

## 🚀 Live Demo

## ✨ Key Features

- **🔎 Smart Search & Discovery**:
  - Real-time search using the OMDb API.
  - **"Smart Randomizer"**: Automatically shuffles and combines trending topics (e.g., Marvel + 2025) to ensure fresh content on every visit.
  - **Curated Recommendations**: Fetches a high-quality list of IMDb top-rated movies for new users.

- **📱 Progressive Web App (PWA)**:
  - Fully installable on Android and iOS.
  - Works offline (caches UI shell).
  - App-like experience with a standalone manifest.

- **⚡ Extreme Performance**:
  - **Lighthouse Score:** 99/100 Performance, 100/100 SEO.
  - **Image Optimization:** Uses `next/image` with custom loaders and `priority` tagging for LCP (Largest Contentful Paint) optimization.
  - **Fallback Handling:** Custom UI generation for movies with missing posters.

- **❤️ Favorites System**:
  - Persists user preferences using `localStorage`.
  - Add/Remove movies from a personalized watchlist.

- **🎨 Modern UI/UX**:
  - Built with **CSS Modules** for scoped styling.
  - Responsive Grid Layouts (Mobile, Tablet, Desktop).
  - Hover effects and smooth transitions.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Pages Router)
- **Language**: TypeScript
- **Styling**: CSS Modules & Styled Components
- **Data Source**: OMDb API
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`)
- **Deployment**: Vercel

## 📦 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone [https://github.com/abdelrahman116/alx-project-nexus.git](https://github.com/abdelrahman116/alx-project-nexus.git)
cd alx-project-nexus