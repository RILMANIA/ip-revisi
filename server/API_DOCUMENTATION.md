# Server API Documentation

## Base URL

`http://localhost:3000`

---

## Authentication Endpoints

### Register

**POST** `/register`

**Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**

```json
{
  "name": "string",
  "email": "string",
  "message": "User registered successfully"
}
```

---

### Login

**POST** `/login`

**Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response (200):**

```json
{
  "access_token": "string"
}
```

---

### Google Login

**POST** `/google-login`

**Body:**

```json
{
  "googleToken": "string"
}
```

**Response (200):**

```json
{
  "access_token": "string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  }
}
```

---

## Public Endpoints

### Get Public Builds

**GET** `/public/builds`

**Response (200):**

```json
[
  {
    "id": "number",
    "UserId": "number",
    "character_name": "string",
    "weapon": "string",
    "artifact": "string",
    "notes": "string",
    "isPublic": true,
    "User": {
      "id": "number",
      "name": "string"
    }
  }
]
```

---

## Protected Endpoints

_Requires Bearer token in Authorization header_

### Get Current User Profile

**GET** `/users/me`

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "id": "number",
  "name": "string",
  "email": "string"
}
```

---

### Favorites

#### Add Favorite

**POST** `/favorites`

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "character_name": "string"
}
```

**Response (201):**

```json
{
  "id": "number",
  "UserId": "number",
  "character_name": "string"
}
```

---

#### Get Favorites

**GET** `/favorites`

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
[
  {
    "id": "number",
    "UserId": "number",
    "character_name": "string"
  }
]
```

---

#### Delete Favorite

**DELETE** `/favorites/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "message": "Favorite deleted successfully"
}
```

---

### Builds

#### Add Build

**POST** `/builds`

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "character_name": "string",
  "weapon": "string",
  "artifact": "string",
  "notes": "string",
  "isPublic": "boolean (optional, default: false)"
}
```

**Response (201):**

```json
{
  "id": "number",
  "UserId": "number",
  "character_name": "string",
  "weapon": "string",
  "artifact": "string",
  "notes": "string",
  "isPublic": "boolean"
}
```

---

#### Get User Builds

**GET** `/builds`

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
[
  {
    "id": "number",
    "UserId": "number",
    "character_name": "string",
    "weapon": "string",
    "artifact": "string",
    "notes": "string",
    "isPublic": "boolean"
  }
]
```

---

#### Update Build

**PUT** `/builds/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "character_name": "string",
  "weapon": "string",
  "artifact": "string",
  "notes": "string",
  "isPublic": "boolean (optional)"
}
```

**Response (200):**

```json
{
  "message": "Build updated successfully"
}
```

---

#### Delete Build

**DELETE** `/builds/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "message": "Build deleted successfully"
}
```

---

### AI Endpoints

#### Explain Character

**POST** `/ai/explain`

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "characterName": "string"
}
```

**Response (200):**

```json
{
  "characterName": "string",
  "explanation": "string"
}
```

---

#### Recommend Build

**POST** `/ai/recommend`

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "characterName": "string"
}
```

**Response (200):**

```json
{
  "characterName": "string",
  "recommendation": "string"
}
```

---

## Error Responses

**400 Bad Request:**

```json
{
  "message": "Error message"
}
```

**401 Unauthorized:**

```json
{
  "message": "Invalid token"
}
```

**403 Forbidden:**

```json
{
  "message": "You are not authorized"
}
```

**404 Not Found:**

```json
{
  "message": "Data not found"
}
```

**500 Internal Server Error:**

```json
{
  "message": "Internal server error"
}
```
