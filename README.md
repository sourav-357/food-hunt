# FoodHunt

FoodHunt is a simple **React + Vite** meal discovery app that helps users explore recipes, search meals by name, filter by category, and save favourites for later.

## ✨ Features

- Browse meals by **category**
- Search meals by **name**
- View detailed meal pages with:
  - ingredients
  - measurements
  - cooking instructions
- Save and remove **favourites**
- Keep favourites stored in **localStorage** after refresh
- Navigate smoothly with **React Router**
- Browse results with **pagination**

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **React Router DOM**
- **CSS Modules**
- **TheMealDB API**

## 📁 Project Structure

```text
src/
├── components/      # Reusable UI pieces like navbar, cards, pagination
├── context/         # Favourites state management
├── hooks/           # Custom data-fetching hook
├── pages/           # Home, Favourites, and Meal Detail pages
└── services/        # API helper functions
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (recommended: v18 or later)
- **npm**

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## 📜 Available Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build locally |

## 🌐 API Source

This project uses data from **[TheMealDB](https://www.themealdb.com/)**.

## 🎯 What You Can Do in the App

1. Open the home page to explore meals.
2. Filter meals using the category bar.
3. Search for dishes like `pasta`, `chicken`, or `cake`.
4. Click a meal card to view full details.
5. Add meals to your favourites list and access them later.

## 📌 Notes

- Favourite meals are saved in the browser using `localStorage`.
- If the API request fails, the app shows a friendly error message.

---

Built as a beginner-friendly food browsing app with React.
