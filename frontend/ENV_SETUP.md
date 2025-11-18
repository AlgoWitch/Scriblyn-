# Frontend Environment Configuration

## Setup Instructions

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Configure the backend URL:**
   - For local development: `REACT_APP_BACKEND_URL=http://localhost:5001`
   - For production: Update with your deployed backend URL

## Environment Variables

### `REACT_APP_BACKEND_URL`
- **Description:** The URL of your backend API server
- **Default:** `http://localhost:5001`
- **Required:** Yes
- **Example:** `http://localhost:5001` or `https://api.yourapp.com`

## Important Notes

⚠️ **React Environment Variables:**
- All React environment variables must start with `REACT_APP_`
- You need to restart the development server after changing `.env` file
- Environment variables are embedded at build time

🔒 **Security:**
- Never commit `.env` file to version control (it's already in `.gitignore`)
- Use `.env.example` as a template for other developers

## Testing the Connection

After starting the frontend server, check:
1. Open browser console (F12)
2. Navigate to Network tab
3. API calls should go to the URL specified in `REACT_APP_BACKEND_URL`

## Troubleshooting

**Environment variable not working?**
- Make sure you've restarted the development server (`npm start`)
- Check that the variable name starts with `REACT_APP_`
- Verify the `.env` file is in the frontend root directory

**Backend connection errors?**
- Verify the backend server is running on the specified port
- Check CORS configuration in backend allows requests from frontend
- Ensure the URL format is correct (no trailing slash)
