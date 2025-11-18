# Deployment Configuration Guide

## Environment Variables Setup

### Backend Environment Variables

**File:** `/backend/.env`

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/blogDB

# JWT Secret (Generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# Server Configuration
PORT=5001
NODE_ENV=production

# Frontend URL (CORS Configuration)
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend Environment Variables

**File:** `/frontend/.env`

```env
# Backend API URL
REACT_APP_BACKEND_URL=https://your-backend-domain.com
```

---

## Deployment Scenarios

### 🖥️ Local Development

**Backend `.env`:**
```env
MONGODB_URI=mongodb+srv://shreya212suman_db_user:shreya2028@cluster0.mzpm5yb.mongodb.net/blogDB
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend `.env`:**
```env
REACT_APP_BACKEND_URL=http://localhost:5001
```

---

### 🚀 Production Deployment

#### Example: Vercel (Frontend) + Render (Backend)

**Backend `.env` on Render:**
```env
MONGODB_URI=mongodb+srv://shreya212suman_db_user:shreya2028@cluster0.mzpm5yb.mongodb.net/blogDB
JWT_SECRET=generate_a_secure_random_string_here_32_chars_min
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

**Frontend Environment Variables on Vercel:**
```env
REACT_APP_BACKEND_URL=https://your-backend.render.com
```

---

### 🧪 Staging Environment

**Backend `.env`:**
```env
MONGODB_URI=mongodb+srv://staging_user:password@cluster.mongodb.net/blogDB_staging
JWT_SECRET=staging_secret_key
PORT=5001
NODE_ENV=staging
FRONTEND_URL=https://staging.your-app.com
```

**Frontend `.env`:**
```env
REACT_APP_BACKEND_URL=https://staging-api.your-app.com
```

---

## Step-by-Step Deployment Guide

### Backend Deployment

1. **Choose a hosting platform:**
   - Render (Recommended)
   - Railway
   - Heroku
   - AWS EC2
   - DigitalOcean

2. **Set Environment Variables:**
   - Add all variables from `/backend/.env`
   - Update `FRONTEND_URL` to your frontend domain
   - Change `NODE_ENV` to `production`
   - Generate a secure `JWT_SECRET`

3. **Deploy:**
   ```bash
   cd backend
   npm install
   npm start
   ```

### Frontend Deployment

1. **Choose a hosting platform:**
   - Vercel (Recommended)
   - Netlify
   - AWS Amplify
   - GitHub Pages

2. **Set Environment Variables:**
   - Add `REACT_APP_BACKEND_URL` with your backend URL

3. **Deploy:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

---

## CORS Configuration

The backend is configured to accept requests from the URL specified in `FRONTEND_URL`:

```javascript
// In backend/src/server.js
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

**For multiple frontend URLs (e.g., staging + production):**

```javascript
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    'https://staging.your-app.com',
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

---

## Security Checklist for Production

### Backend:
- ✅ Change `JWT_SECRET` to a strong random string (32+ characters)
- ✅ Set `NODE_ENV=production`
- ✅ Update `FRONTEND_URL` to production domain
- ✅ Use MongoDB Atlas with IP whitelist
- ✅ Enable MongoDB authentication
- ✅ Use HTTPS for all connections

### Frontend:
- ✅ Update `REACT_APP_BACKEND_URL` to production backend
- ✅ Use HTTPS for backend URL
- ✅ Enable CSP (Content Security Policy) headers
- ✅ Configure proper caching headers

---

## Testing the Connection

### Test Backend API:
```bash
curl https://your-backend-domain.com/
# Should return: {"message": "API is running..."}
```

### Test Frontend to Backend:
1. Open your deployed frontend
2. Try to login/signup
3. Check browser console Network tab
4. API calls should go to your backend URL

---

## Troubleshooting

### CORS Errors:
- Verify `FRONTEND_URL` in backend matches your frontend domain
- Check protocol (http vs https)
- No trailing slash in URLs

### Environment Variables Not Working:
- Backend: Restart the server after changes
- Frontend: Rebuild the app (`npm run build`)
- Verify variable names are correct

### Connection Refused:
- Check if backend server is running
- Verify firewall rules
- Check port configuration

---

## Quick Reference

| Environment | Backend URL | Frontend URL |
|------------|-------------|--------------|
| Local | `http://localhost:5001` | `http://localhost:3000` |
| Staging | `https://staging-api.yourdomain.com` | `https://staging.yourdomain.com` |
| Production | `https://api.yourdomain.com` | `https://yourdomain.com` |

---

## Platform-Specific Guides

### Deploying Backend to Render:
1. Connect GitHub repository
2. Select "Web Service"
3. Build Command: `cd backend && npm install`
4. Start Command: `cd backend && npm start`
5. Add environment variables in dashboard

### Deploying Frontend to Vercel:
1. Import GitHub repository
2. Root directory: `frontend`
3. Framework Preset: Create React App
4. Add environment variable: `REACT_APP_BACKEND_URL`
5. Deploy!

---

## Need Help?

Check these files:
- `/backend/.env.example` - Backend environment template
- `/frontend/.env.example` - Frontend environment template
- `/frontend/ENV_SETUP.md` - Frontend setup guide
- `/frontend/ENVIRONMENT_CONFIG.md` - Detailed configuration docs
