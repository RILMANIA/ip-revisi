---

# 🔌 REST API Endpoint Design

**Project: Genshin AI Companion – Lore & Build Assistant**

---

## 🌐 Base URL

```
https://api.genshin-ai-companion.com/api
```

_(example – adjust to your deployment)_

---

## 🔐 Authentication

### Google Sign-In Flow

Handled on client → server verifies token → creates user if not exists.

---

### 1️⃣ Auth Endpoints

#### **POST /auth/google**

Authenticate user using Google OAuth token.

**Request Body**

```json
{
  "idToken": "google_oauth_id_token"
}
```

**Response**

```json
{
  "accessToken": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "User Name",
    "email": "user@gmail.com"
  }
}
```

---

## 👤 User Endpoints

### 2️⃣ GET User Profile

#### **GET /users/me**

Get authenticated user profile.

**Headers**

```
Authorization: Bearer <jwt_token>
```

**Response**

```json
{
  "id": "uuid",
  "name": "User Name",
  "email": "user@gmail.com"
}
```

---

## 🎮 Genshin Impact Data (2nd 3rd-Party API)

> Server acts as a **proxy** to the Genshin API
> (important for security & testing)

---

### 3️⃣ Get All Characters

#### **GET /genshin/characters**

**Response**

```json
[
  {
    "id": "raiden-shogun",
    "name": "Raiden Shogun",
    "element": "Electro",
    "rarity": 5,
    "vision": "Electro"
  }
]
```

---

### 4️⃣ Get Character Detail

#### **GET /genshin/characters/:id**

**Response**

```json
{
  "id": "raiden-shogun",
  "name": "Raiden Shogun",
  "element": "Electro",
  "weapon": "Polearm",
  "description": "Her Excellency, the Almighty Narukami Ogosho..."
}
```

---

## ⭐ Favorites (CRUD Requirement)

---

### 5️⃣ Create Favorite

#### **POST /favorites**

**Headers**

```
Authorization: Bearer <jwt_token>
```

**Request Body**

```json
{
  "characterId": "raiden-shogun"
}
```

**Response**

```json
{
  "id": "fav_uuid",
  "characterId": "raiden-shogun"
}
```

---

### 6️⃣ Get User Favorites

#### **GET /favorites**

**Response**

```json
[
  {
    "id": "fav_uuid",
    "characterId": "raiden-shogun"
  }
]
```

---

### 7️⃣ Delete Favorite

#### **DELETE /favorites/:id**

**Response**

```json
{
  "message": "Favorite removed"
}
```

---

## 🤖 AI Features (OpenAI GPT API)

---

### 8️⃣ AI Character Explanation

#### **POST /ai/explain**

**Request Body**

```json
{
  "characterId": "raiden-shogun",
  "question": "Explain her role and lore"
}
```

**Response**

```json
{
  "answer": "Raiden Shogun is an Electro Archon who excels as..."
}
```

---

### 9️⃣ AI Build Recommendation

#### **POST /ai/build-recommendation**

**Request Body**

```json
{
  "characterId": "raiden-shogun",
  "playstyle": "support"
}
```

**Response**

```json
{
  "character": "Raiden Shogun",
  "recommendedWeapon": "Engulfing Lightning",
  "artifactSet": "Emblem of Severed Fate",
  "playstyleTips": "Focus on Energy Recharge..."
}
```

---

## 📄 Build Recommendations (Optional CRUD – Good for Score)

---

### 🔟 Save Build Recommendation

#### **POST /builds**

**Headers**

```
Authorization: Bearer <jwt_token>
```

**Request Body**

```json
{
  "characterId": "raiden-shogun",
  "buildData": {
    "weapon": "Engulfing Lightning",
    "artifact": "Emblem of Severed Fate"
  }
}
```

---

### 1️⃣1️⃣ Get Saved Builds

#### **GET /builds**

---

### 1️⃣2️⃣ Delete Build

#### **DELETE /builds/:id**

---

## ⚠️ Error Response Format (Standardized)

```json
{
  "message": "Unauthorized"
}
```

---

## 🧪 Testing Coverage Mapping (Important for Grading)

| Endpoint Group | Test Type               |
| -------------- | ----------------------- |
| Auth           | Integration             |
| Favorites      | CRUD unit + integration |
| Genshin proxy  | Mock API                |
| AI endpoints   | Mock OpenAI             |
| Error handlers | Unit                    |

➡ Easy to reach **≥ 90% coverage**

---

## ✅ Requirement Coverage Check

✔ REST API with CRUD
✔ OpenAI GPT API
✔ Genshin Impact API
✔ Client–Server Architecture
✔ Testable endpoints
✔ Redux-friendly data flow

---
