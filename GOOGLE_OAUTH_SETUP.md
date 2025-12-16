# 🔧 Google OAuth Setup Guide

To enable Google login functionality, you need to obtain a Google Client ID from Google Cloud Console.

## Steps to Get Google Client ID:

### 1. Go to Google Cloud Console

Visit: https://console.cloud.google.com/

### 2. Create a New Project (or select existing)

- Click on the project dropdown at the top
- Click "New Project"
- Name it (e.g., "Genshin AI Companion")
- Click "Create"

### 3. Enable Google OAuth

- In the sidebar, go to **APIs & Services** → **OAuth consent screen**
- Select "External" user type
- Fill in the required fields:
  - App name: Genshin AI Companion
  - User support email: your email
  - Developer contact: your email
- Click "Save and Continue"

### 4. Create OAuth 2.0 Credentials

- Go to **APIs & Services** → **Credentials**
- Click **"+ CREATE CREDENTIALS"** → **OAuth client ID**
- Choose **"Web application"**
- Add **Authorized JavaScript origins**:
  - `http://localhost:5173` (for development)
- Add **Authorized redirect URIs**:
  - `http://localhost:5173` (for development)
- Click **"Create"**

### 5. Copy Your Client ID

- A popup will show your **Client ID** (looks like: `123456789-abcdefg.apps.googleusercontent.com`)
- Copy this Client ID

### 6. Update Environment Files

#### Client (.env)

```bash
cd client/genshin_ai_companion
# Edit .env file
VITE_GOOGLE_CLIENT_ID=paste-your-client-id-here
```

#### Server (.env)

```bash
cd server
# Edit .env file
GOOGLE_CLIENT_ID=paste-your-client-id-here
```

### 7. Restart Both Applications

```bash
# Terminal 1 - Server
cd server
node src/app.js

# Terminal 2 - Client
cd client/genshin_ai_companion
node ./node_modules/vite/bin/vite.js
```

## Testing Without Google OAuth (Temporary)

If you want to test the app without Google OAuth:

1. **Use regular login/register** - This will work without Google OAuth setup
2. Register a new account with name, email, and password
3. Login with the email and password

The app is fully functional for:

- ✅ Registration (name, email, password)
- ✅ Login (email, password)
- ✅ All protected features (favorites, builds, AI)

Only the "Login with Google" button requires the Google Client ID configuration.

---

## Quick Fix Applied ✅

The following issues have been fixed:

1. ✅ **Login endpoint** - No longer requires 'name' field, only email and password
2. ✅ **Login response** - Now returns user data along with token
3. ✅ **Register form** - Changed from 'username' to 'name' to match backend
4. ✅ **User display** - Navbar now shows user.name instead of user.username
5. ✅ **Environment files** - Added placeholder for Google Client ID

## Test Regular Login Now:

1. Navigate to http://localhost:5173/register
2. Fill in:
   - Name: Any name
   - Email: test@example.com
   - Password: 12345 (min 5 chars)
3. Click Register
4. Login with the same email and password
5. ✅ You should be logged in successfully!

The Google OAuth will work once you add the Google Client ID to the .env files.
