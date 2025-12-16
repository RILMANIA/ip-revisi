# ip-revisi

---

# 📘 README

## **Genshin AI Companion – Lore & Build Assistant**

---

## 📌 Project Overview

**Genshin AI Companion** is a game companion web application designed to help Genshin Impact players explore characters, understand lore, and receive AI-powered build recommendations.

The application integrates **OpenAI GPT API** for intelligent explanations and recommendations, and the **Genshin Impact API** as a source of game data. The system is built using **client–server architecture** with a modern frontend and a RESTful backend.

---

## 🎮 Theme

Game – Genshin Impact

---

## ✨ Main Feature

**AI Personalization & Recommendation**

- AI-generated character explanations
- AI-generated build recommendations
- Natural language Q&A

---

## 🛠 Tech Stack

### Frontend

- Vite
- React.js
- Redux Toolkit
- React Router

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication

### Database

- PostgreSQL

### Third-Party APIs

- **OpenAI GPT API**
- **Genshin Impact API** ([https://genshin.dev/])
- Google OAuth

### Testing

- Jest
- Supertest
- ≥ 90% test coverage

### Deployment

- Frontend: Vercel / Netlify
- Backend: Render / Railway

---

## 🧱 System Architecture

```
Client (React + Redux)
   ↓
REST API Server (Express)
   ↓
OpenAI API / Genshin Impact API
```

---

## 🔐 Authentication

- Google Social Media Sign-In
- JWT-based authorization for protected routes

---

## 🔌 API Features

### Core Endpoints

- Authentication (Google OAuth)
- Genshin character data (proxy API)
- Favorites CRUD
- AI explanation
- AI build recommendation
- Saved build CRUD

---

## 🗄 Database Design

Entities:

- Users
- Favorites
- Builds

Relationships:

- One user can have many favorites
- One user can have many saved builds

---

## 🧠 Redux State Management

Redux is used as a **single source of truth** for:

- Authentication state
- Character data
- AI responses
- Favorites and saved builds

All asynchronous data fetching is handled using Redux Thunks.

---

## 🧪 Testing Strategy

- Unit tests for services and utilities
- Integration tests for API endpoints
- Third-party APIs are mocked
- Minimum 90% coverage achieved

---

## 🚀 Deployment

- Backend deployed publicly
- Frontend deployed publicly
- Application accessible via browser

---

## 📂 Project Structure

```
client/
server/
```

---

## 📎 Environment Variables

### Backend `.env`

```
PORT=
DATABASE_URL=
JWT_SECRET=
GOOGLE_CLIENT_ID=
OPENAI_API_KEY=
```

---

## 📌 How to Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🏁 Conclusion

This project demonstrates the integration of AI technology into a game-based web application while following best practices in modern web development, testing, and deployment.

---

---

# ✅ Submission Checklist (PRINT THIS)

## 📁 Repository

- [ ] GitHub repository link provided
- [ ] Feature branches used
- [ ] Meaningful commit messages
- [ ] Pull requests & merges done properly

---

## 🧠 Architecture

- [ ] Client–Server architecture implemented
- [ ] REST API design followed
- [ ] API documentation included

---

## 🤖 AI & Third-Party APIs

- [ ] OpenAI GPT API integrated
- [ ] Genshin Impact API integrated
- [ ] APIs handled via backend (proxy)
- [ ] APIs mocked in tests

---

## 🔐 Authentication

- [ ] Google Social Media Sign-In implemented
- [ ] JWT-based authorization works

---

## 📦 CRUD Features

- [ ] Favorites CRUD
- [ ] Saved builds CRUD

---

## 🧠 Redux

- [ ] Redux Toolkit used
- [ ] Redux as single source of truth
- [ ] Async data fetching via Redux

---

## 🧪 Testing

- [ ] Unit tests implemented
- [ ] Integration tests implemented
- [ ] Coverage ≥ 90%
- [ ] Coverage report attached

---

## 🌐 Deployment

- [ ] Backend deployed publicly
- [ ] Frontend deployed publicly
- [ ] URLs included in submission

---

## 📄 Documentation

- [ ] README completed
- [ ] ERD included
- [ ] API contract included

---

“This project applies AI-powered personalization using OpenAI GPT API and external game data through a RESTful client–server architecture, with comprehensive testing and deployment.”

---

I am making a game project with genshin impact as a theme. This project applies AI-powered personalization using OpenAI GPT API (link: https://openai.com/api/) and external game data through a RESTful client–server architecture. The game data is extracted from a 3rd party API (link: https://genshin.jmp.blue/).

In this project:

1. users can register and login using name, email and password.
2. users can login throught their google account (social media login)
3. diplay genshin impact characters with card formats
4. select and view a specific character and their details
5. select a specific charater and add it to a user's favorite list.
6. users can make a build for a specific character with artifacts and weapons.
7. users can only delete their own builds and favorite characters.
8. users can only update their own builds.
9. users can display their characters along with their selected builds in public pages.
10. use AI to explain a character and recommend builds

Use redux state management for the client side.

Make the client side
