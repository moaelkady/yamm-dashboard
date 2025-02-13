# Yamm Dashboard

## Overview
Yamm Dashboard is a **scalable and well-structured React application** built with **TypeScript**, **Vite**, and **MUI**. The main focus of this project is not on UI design but on establishing a **clean architecture** that can grow and evolve efficiently.

## Key Features
- **Scalable File Structure** – Organized for future growth.
- **TypeScript Support** – Ensures type safety and maintainability.
- **React Query** – Efficient data fetching and caching.
- **Internationalization (i18n)** – Supports multiple languages.
- **State Management** – Uses Context API for lightweight global state.
- **Axios for API Calls** – Structured network layer for API interactions.
- **Linting & Formatting** – Ensures clean code using ESLint.

## Tech Stack
- **Frontend:** React (Vite, TypeScript, MUI, Tailwind CSS)
- **State Management:** Context API
- **API Calls:** Axios
- **Routing:** React Router
- **Data Fetching:** React Query
- **Notifications:** React Toastify
- **Internationalization:** i18next
- **Linting & Formatting:** ESLint, TypeScript ESLint

---

## 📂 Project Structure
The project follows a modular structure for maintainability and scalability.

```
📦 yamm-dashboard
├── 📂 components    # Reusable UI components
├── 📂 assets        # Static assets (images, icons, etc.)
├── 📂 context       # Global state management using Context API
├── 📂 data          # Static data files or mock data
├── 📂 layouts       # Layout components (e.g., Dashboard Layout)
├── 📂 locales       # Translation files for i18n
├── 📂 network       # API request handling using Axios
├── 📂 pages         # Page components (e.g., Dashboard, Settings)
├── 📂 repository    # Business logic layer for API interactions
├── 📂 types         # TypeScript type definitions
├── 📂 utils         # Utility functions (e.g., helpers, formatters)
└── 📜 README.md     # Project documentation
```

---

## 📦 Installed Packages
Here is a breakdown of the key dependencies and dev dependencies used in this project:

### Dependencies
| Package | Purpose |
|---------|---------|
| **@mui/material** | UI components (MUI library) |
| **@mui/icons-material** | Icons from Material UI |
| **@emotion/react** | Styling for MUI |
| **@emotion/styled** | Styled components for MUI |
| **@tanstack/react-query** | API data fetching and caching |
| **axios** | HTTP client for API calls |
| **i18next** | Internationalization support |
| **react-i18next** | React bindings for i18next |
| **react-router-dom** | Routing support |
| **react-toastify** | Notification system |

### Dev Dependencies
| Package | Purpose |
|---------|---------|
| **@vitejs/plugin-react-swc** | Optimized React compiler for Vite |
| **typescript** | TypeScript support |
| **eslint** | Code linting |
| **typescript-eslint** | TypeScript linting rules |
| **tailwindcss** | Utility-first CSS framework |
| **postcss, autoprefixer** | CSS processing |

---

## 🏗️ Running the Project
To start the project locally, follow these steps:

### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Start Development Server
```sh
npm run dev
```

### 3️⃣ Build for Production
```sh
npm run build
```

### 4️⃣ Preview Production Build
```sh
npm run preview
```

### 5️⃣ Lint Code
```sh
npm run lint
```

---

## 🚀 Future Improvements
While the current UI design is not the final version, the main goal of this project is to establish a **clean, scalable architecture** that can support any future UI or feature enhancements.

Some potential improvements include:
- Enhancing UI/UX design
- Implementing more advanced state management (if needed)
- Expanding API integrations

For any questions or contributions, feel free to reach out! 🚀

