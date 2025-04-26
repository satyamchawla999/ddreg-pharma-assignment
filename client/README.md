
# MERN Task Manager - Frontend

This is the React.js frontend for the Task Management Application.  
It uses Vite + TailwindCSS + React Router.

---

## 📋 Prerequisites

Before you start, make sure you have:

For running locally

- **Node.js** (v18 or above)
- **npm** (v9 or above)

For docker

- **Docker** and **Docker Compose** (for Docker method)

---

## ⚙️ Setup Environment Variables

Create a `.env` file in the root directory based on `.env.example`.

Example:

```bash
cp .env.example .env
```

Make sure to set the correct backend API URL.

---

## 🚀 Running Locally (without Docker)

1. **Install dependencies**

```bash
npm install
```

2. **Start the Vite dev server**

```bash
npm run dev
```

3. **Access the app**

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🐳 Running with Docker (Development)

Make sure Docker and Docker Compose are installed.

1. **Build and run containers**

```bash
docker-compose up
```

2. **Access the app**

Open [http://localhost:5173](http://localhost:5173) in your browser.

✅ Any changes you make locally will reflect inside the container (hot reload).

---

## 📄 Environment Variables

Create a `.env` file with the following:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` should point to your backend server URL.

## 🧹 Useful Commands

| Command | Purpose |
|:--------|:--------|
| `npm install` | Install dependencies |
| `npm run dev` | Run dev server locally |
| `docker-compose up --build` | Run app inside Docker container |

---
