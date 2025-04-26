
# Task Management App - Backend

This is the backend server for the **Task Management App** built using Node.js, Express, MongoDB, and Docker.

---

## 🛠️ Prerequisites

> To run the backend, make sure you have the following installed:

### For Local Development
- [Node.js](https://nodejs.org/en/download/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)

### For Docker Setup
- [Docker](https://docs.docker.com/get-docker/) (installed and running)

---

## 🚀 Running Locally (without Docker)

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**
   
   Based on `.env.example`, create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskmanager_db
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Run the server**
   ```bash
   npm start
   ```

5. **Server will run on**
   ```
   http://localhost:5000
   ```

---

## 🐳 Running with Docker

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd root-folder
   ```

2. **Build and run containers**
   ```bash
   docker-compose up --build
   ```

3. **Backend Server will be available at**
   ```
   http://localhost:5000
   ```

---

## ✨ API Endpoints Overview

| Method | Endpoint            | Description                | Auth Required |
| :----: | :------------------: | :-------------------------:| :-----------: |
| POST   | `/api/auth/register`  | User Registration           | No            |
| POST   | `/api/auth/login`     | User Login                  | No            |
| GET    | `/api/tasks`          | Get all tasks (paginated)   | Yes           |
| POST   | `/api/tasks`          | Create a task               | Yes           |
| PUT    | `/api/tasks/:id`      | Update a task               | Yes           |
| DELETE | `/api/tasks/:id`      | Delete a task               | Yes           |
| GET    | `/api/tasks/analytics`| Get task statistics         | Yes           |
| GET    | `/api/users/profile`  | Get user information        | Yes           |

---
