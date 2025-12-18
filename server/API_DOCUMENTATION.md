# Genshin AI Companion - Server API Documentation

## Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Authentication Endpoints](#authentication-endpoints)
- [Public Endpoints](#public-endpoints)
- [Protected Endpoints](#protected-endpoints)
- [Error Responses](#error-responses)

---

## Overview

This API provides backend services for the Genshin AI Companion application, allowing users to manage character builds, favorites, and access AI-powered character insights using Google's Gemini API.

**Features:**

- User authentication (JWT and Google OAuth)
- Character build management (CRUD operations)
- Favorite characters tracking
- AI-powered character explanations
- AI-powered build recommendations
- Public build sharing

---

## Base URL

```
http://localhost:3000

Database local: postgres://postgres:postgres@localhost:5432/genshin_ai_companion
```

---

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are obtained through the `/login`, `/register`, or `/google-login` endpoints.

---

## Authentication Endpoints

### 1. Register

Create a new user account.

**Endpoint:** `POST /register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201 Created):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "User registered successfully"
}
```

**Error Responses:**

- `400 Bad Request` - Validation error or email already exists

```json
{
  "message": "Email must be unique"
}
```

- `500 Internal Server Error` - Server error

**Validation Rules:**

- `name`: Required, cannot be empty
- `email`: Required, must be valid email format, must be unique
- `password`: Required, minimum 5 characters

---

### 2. Login

Authenticate user and receive access token.

**Endpoint:** `POST /login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

- `400 Bad Request` - Missing required fields

```json
{
  "message": "Email is required"
}
```

```json
{
  "message": "Password is required"
}
```

- `401 Unauthorized` - Invalid credentials

```json
{
  "message": "Invalid email/password"
}
```

- `500 Internal Server Error` - Server error

---

### 3. Google OAuth Login

Authenticate using Google OAuth token.

**Endpoint:** `POST /google-login`

**Request Body:**

```json
{
  "googleToken": "ya29.a0AfH6SMBx..."
}
```

**Success Response (200 OK):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

- `400 Bad Request` - Missing Google token

```json
{
  "message": "Google token is required"
}
```

- `500 Internal Server Error` - Server error or invalid token

**Notes:**

- If user doesn't exist, account will be created automatically
- Password is auto-generated for Google OAuth users

---

## Public Endpoints

### Get Public Builds

Retrieve all publicly shared character builds.

**Endpoint:** `GET /public/builds`

**Authentication:** Not required

**Success Response (200 OK):**

```json
[
  {
    "id": 1,
    "UserId": 5,
    "character_name": "Hu Tao",
    "weapon": "Staff of Homa",
    "artifact": "Crimson Witch of Flames (4pc)",
    "notes": "Focus on HP and Crit DMG. Use charged attacks for maximum damage.",
    "isPublic": true,
    "createdAt": "2025-12-17T10:30:00.000Z",
    "updatedAt": "2025-12-17T10:30:00.000Z",
    "User": {
      "id": 5,
      "name": "ProGamer123"
    }
  },
  {
    "id": 2,
    "UserId": 3,
    "character_name": "Raiden Shogun",
    "weapon": "Engulfing Lightning",
    "artifact": "Emblem of Severed Fate (4pc)",
    "notes": "Stack Energy Recharge. Great for burst-focused teams.",
    "isPublic": true,
    "createdAt": "2025-12-17T09:15:00.000Z",
    "updatedAt": "2025-12-17T09:15:00.000Z",
    "User": {
      "id": 3,
      "name": "ElectroMaster"
    }
  }
]
```

**Error Responses:**

- `500 Internal Server Error` - Server error

**Notes:**

- Returns builds ordered by creation date (newest first)
- Only includes builds where `isPublic` is `true`
- Includes author information (User name and ID)

---

## Protected Endpoints

All endpoints below require authentication via Bearer token.

---

## User Profile

### Get Current User Profile

Retrieve authenticated user's profile information.

**Endpoint:** `GET /users/me`

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200 OK):**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

## Favorites Management

### 1. Add Favorite Character

Add a character to user's favorites list.

**Endpoint:** `POST /favorites`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "character_name": "Hu Tao"
}
```

**Success Response (201 Created):**

```json
{
  "id": 1,
  "UserId": 1,
  "character_name": "Hu Tao",
  "createdAt": "2025-12-17T10:30:00.000Z",
  "updatedAt": "2025-12-17T10:30:00.000Z"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

### 2. Get User's Favorite Characters

Retrieve all favorite characters for the authenticated user.

**Endpoint:** `GET /favorites`

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200 OK):**

```json
[
  {
    "id": 1,
    "UserId": 1,
    "character_name": "Hu Tao",
    "createdAt": "2025-12-17T10:30:00.000Z",
    "updatedAt": "2025-12-17T10:30:00.000Z"
  },
  {
    "id": 2,
    "UserId": 1,
    "character_name": "Raiden Shogun",
    "createdAt": "2025-12-17T11:45:00.000Z",
    "updatedAt": "2025-12-17T11:45:00.000Z"
  }
]
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

### 3. Delete Favorite Character

Remove a character from user's favorites list.

**Endpoint:** `DELETE /favorites/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id` (number) - The ID of the favorite to delete

**Success Response (200 OK):**

```json
{
  "message": "Favorite deleted successfully"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Favorite not found or doesn't belong to user

```json
{
  "message": "Favorite not found"
}
```

- `500 Internal Server Error` - Server error

---

## Build Management

### 1. Create Build

Create a new character build.

**Endpoint:** `POST /builds`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "character_name": "Hu Tao",
  "weapon": "Staff of Homa",
  "artifact": "Crimson Witch of Flames (4pc)\nMain Stats: HP% Sands, Pyro DMG Goblet, Crit DMG Circlet\nSubstats: Crit Rate, Crit DMG, HP%, Elemental Mastery",
  "notes": "Focus on HP and Crit DMG. Use charged attacks after skill for maximum damage. Pair with Xingqiu for vaporize reactions.",
  "isPublic": false
}
```

**Field Descriptions:**

- `character_name` (string, required) - Name of the Genshin Impact character
- `weapon` (string, required) - Recommended weapon for the build
- `artifact` (string, required) - Artifact set and main stats/substats
- `notes` (string, optional) - Additional build notes, tips, or strategies. Can be null or empty
- `isPublic` (boolean, optional) - Whether build is visible to all users (default: false)

**Success Response (201 Created):**

```json
{
  "id": 1,
  "UserId": 1,
  "character_name": "Hu Tao",
  "weapon": "Staff of Homa",
  "artifact": "Crimson Witch of Flames (4pc)\nMain Stats: HP% Sands, Pyro DMG Goblet, Crit DMG Circlet\nSubstats: Crit Rate, Crit DMG, HP%, Elemental Mastery",
  "notes": "Focus on HP and Crit DMG. Use charged attacks after skill for maximum damage. Pair with Xingqiu for vaporize reactions.",
  "isPublic": false,
  "createdAt": "2025-12-17T10:30:00.000Z",
  "updatedAt": "2025-12-17T10:30:00.000Z"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

### 2. Get User's Builds

Retrieve all builds created by the authenticated user.

**Endpoint:** `GET /builds`

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200 OK):**

```json
[
  {
    "id": 1,
    "UserId": 1,
    "character_name": "Hu Tao",
    "weapon": "Staff of Homa",
    "artifact": "Crimson Witch of Flames (4pc)",
    "notes": "Focus on HP and Crit DMG.",
    "isPublic": true,
    "createdAt": "2025-12-17T10:30:00.000Z",
    "updatedAt": "2025-12-17T10:30:00.000Z"
  },
  {
    "id": 2,
    "UserId": 1,
    "character_name": "Raiden Shogun",
    "weapon": "Engulfing Lightning",
    "artifact": "Emblem of Severed Fate (4pc)",
    "notes": "Stack Energy Recharge.",
    "isPublic": false,
    "createdAt": "2025-12-17T09:15:00.000Z",
    "updatedAt": "2025-12-17T09:15:00.000Z"
  }
]
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

---

### 3. Update Build

Update an existing character build.

**Endpoint:** `PUT /builds/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id` (number) - The ID of the build to update

**Request Body:**

```json
{
  "character_name": "Hu Tao",
  "weapon": "Staff of Homa R5",
  "artifact": "Crimson Witch of Flames (4pc)\nMain Stats: HP% Sands, Pyro DMG Goblet, Crit DMG Circlet",
  "notes": "Updated build with R5 weapon. Higher crit damage output.",
  "isPublic": true
}
```

**Field Descriptions:**

- All fields are required in the request body
- `notes` can be null or empty string
- `isPublic`: If not provided or undefined, defaults to false

**Success Response (200 OK):**

```json
{
  "message": "Build updated successfully"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Build not found or doesn't belong to user (no error message, just no update)
- `500 Internal Server Error` - Server error

**Notes:**

- Only the owner of the build can update it
- If build doesn't exist or doesn't belong to user, update will not occur (no error thrown)

---

### 4. Delete Build

Delete a character build.

**Endpoint:** `DELETE /builds/:id`

**Headers:**

```
Authorization: Bearer <token>
```

**URL Parameters:**

- `id` (number) - The ID of the build to delete

**Success Response (200 OK):**

```json
{
  "message": "Build deleted successfully"
}
```

**Error Responses:**

- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Build not found or doesn't belong to user

```json
{
  "message": "Build not found"
}
```

- `500 Internal Server Error` - Server error

**Notes:**

- Only the owner of the build can delete it

---

## AI-Powered Features

### 1. Explain Character

Get an AI-generated explanation about a Genshin Impact character using Google's Gemini AI.

**Endpoint:** `POST /ai/explain`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "characterName": "Hu Tao"
}
```

**Success Response (200 OK):**

```json
{
  "characterName": "Hu Tao",
  "explanation": "CHARACTER OVERVIEW\nHu Tao is a 5-star Pyro polearm user and the 77th Director of the Wangsheng Funeral Parlor.\n\n\nBACKGROUND & LORE\nAs the director of Wangsheng Funeral Parlor, Hu Tao takes her responsibilities seriously while maintaining an eccentric and playful personality. She has a deep understanding of the balance between life and death.\n\n\nPERSONALITY & TRAITS\nHu Tao is known for her mischievous nature, love of poetry, and unique approach to her work. Despite her playful demeanor, she deeply respects the traditions of her role.\n\n\nABILITIES & COMBAT ROLE\nShe wields Pyro vision and specializes in dealing massive single-target damage. Her skill converts her HP into ATK, making her a powerful main DPS character.\n\n\nRELATIONSHIPS\nHu Tao has notable connections with Zhongli (consultant at the funeral parlor), Xingqiu, and Chongyun."
}
```

**Error Responses:**

- `400 Bad Request` - Missing character name

```json
{
  "message": "Character name is required"
}
```

- `401 Unauthorized` - Missing or invalid token
- `503 Service Unavailable` - Gemini API key not configured or invalid

```json
{
  "message": "Gemini API key not configured. Please add a valid API key to use AI features."
}
```

```json
{
  "message": "Invalid Gemini API key or model not available. Please check your configuration."
}
```

- `500 Internal Server Error` - AI service error

```json
{
  "message": "Failed to get AI explanation. Please try again later.",
  "error": "Error details"
}
```

**Notes:**

- Requires valid GEMINI_API_KEY in environment variables
- Uses gemini-2.5-flash model
- Explanation includes character overview, background, personality, abilities, and relationships
- Formatted with clear section breaks for readability

---

### 2. Recommend Build

Get AI-generated build recommendations for a character.

**Endpoint:** `POST /ai/recommend`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "characterName": "Hu Tao"
}
```

**Success Response (200 OK):**

```json
{
  "characterName": "Hu Tao",
  "recommendation": "**Optimal Build for Hu Tao:**\n\n**Weapon:**\n- **Best:** Staff of Homa (5-star) - Provides massive HP and ATK bonus\n- **Alternatives:** Dragon's Bane (4-star), Deathmatch (4-star)\n\n**Artifacts:**\n- **Best Set:** Crimson Witch of Flames (4pc)\n- **Main Stats:**\n  - Sands: HP%\n  - Goblet: Pyro DMG Bonus\n  - Circlet: Crit DMG or Crit Rate\n- **Substats Priority:**\n  1. Crit Rate / Crit DMG (aim for 1:2 ratio)\n  2. HP%\n  3. Elemental Mastery\n  4. ATK%\n\n**Notes:**\n- Focus on HP as it directly converts to ATK with her skill\n- Maintain at least 60% Crit Rate and 200% Crit DMG\n- Use charged attacks during skill duration for maximum damage\n- Pair with Xingqiu for consistent vaporize reactions"
}
```

**Error Responses:**

- `400 Bad Request` - Missing character name

```json
{
  "message": "Character name is required"
}
```

- `401 Unauthorized` - Missing or invalid token
- `503 Service Unavailable` - Gemini API key not configured or invalid

```json
{
  "message": "Gemini API key not configured. Please add a valid API key to use AI features."
}
```

```json
{
  "message": "Gemini API error. The model may not be available or API key is invalid."
}
```

- `500 Internal Server Error` - AI service error

```json
{
  "message": "Failed to get AI recommendation. Please try again later."
}
```

**Notes:**

- Requires valid GEMINI_API_KEY in environment variables
- Uses gemini-2.5-flash model
- Provides weapon recommendations, artifact sets, main stats, and substats priority
- Includes gameplay tips and team composition suggestions

---

## Error Responses

### Standard Error Format

All error responses follow this JSON structure:

```json
{
  "message": "Error description"
}
```

### HTTP Status Codes

| Status Code | Description           | Common Causes                                                   |
| ----------- | --------------------- | --------------------------------------------------------------- |
| `400`       | Bad Request           | Missing required fields, validation errors, invalid data format |
| `401`       | Unauthorized          | Missing authentication token, invalid token, expired token      |
| `403`       | Forbidden             | User doesn't have permission to access the resource             |
| `404`       | Not Found             | Resource doesn't exist or doesn't belong to user                |
| `500`       | Internal Server Error | Database errors, server issues, unexpected errors               |
| `503`       | Service Unavailable   | External service (Gemini AI) not configured or unavailable      |

### Common Error Examples

**Missing Authentication Token:**

```json
{
  "message": "Invalid token"
}
```

**Validation Error:**

```json
{
  "message": "Email must be unique"
}
```

**Resource Not Found:**

```json
{
  "message": "Build not found"
}
```

**Unauthorized Access:**

```json
{
  "message": "You are not authorized"
}
```

**Server Error:**

```json
{
  "message": "Internal server error"
}
```

**AI Service Error:**

```json
{
  "message": "Gemini API key not configured. Please add a valid API key to use AI features."
}
```

---

## Environment Variables

Required environment variables for the server:

```env
# Database
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=genshin_ai_companion
DB_HOST=localhost
DB_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

---

## Testing

The API has comprehensive test coverage (91.31%) including:

- User authentication (register, login, Google OAuth)
- Build CRUD operations
- Favorites management
- AI features (character explanation, build recommendations)
- Error handling and edge cases

Run tests with:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

---

## Additional Notes

### Authentication Flow

1. User registers or logs in (or uses Google OAuth)
2. Server returns JWT access token
3. Client stores token (localStorage/cookies)
4. Client includes token in Authorization header for protected endpoints
5. Server validates token using JWT middleware
6. Server attaches user info to `req.user` for use in controllers

### Database Models

**User:**

- id (Primary Key)
- name (String, not null)
- email (String, unique, not null)
- password (String, not null)

**Favorite:**

- id (Primary Key)
- UserId (Foreign Key → User)
- character_name (String, not null)

**Build:**

- id (Primary Key)
- UserId (Foreign Key → User)
- character_name (String, not null)
- weapon (String, not null)
- artifact (String, not null)
- notes (Text, nullable)
- isPublic (Boolean, default: false)

### Rate Limiting

Currently, there are no rate limits implemented. Consider adding rate limiting for:

- AI endpoints (costly API calls)
- Authentication endpoints (prevent brute force)
- Public endpoints (prevent abuse)

### Security Considerations

- Passwords are hashed using bcrypt before storage
- JWT tokens should be kept secure and not exposed in URLs
- CORS should be configured appropriately for production
- Environment variables must be kept secure and not committed to version control
- Gemini API key should be protected and rotated regularly

---

**Last Updated:** December 17, 2025  
**API Version:** 1.0.0  
**Server Version:** Node.js with Express.js 5.2.1
