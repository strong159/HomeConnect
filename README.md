# HomeConnect

HomeConnect is a web application designed to help first-time home buyers and renters find homes that match their budget, preferences, and lifestyle. It provides tools for affordability analysis, an integrated mortgage calculator, and an AI assistant that guides users through the home-buying journey.

## ✨ Features
- **Mortgage Calculator**: Get quick, accurate mortgage estimates with adjustable inputs.
- **Document Manager**: Securely manage important housing documents.
- **AI Assistant**: Interactive assistant to collect user preferences and provide recommendations.
- **Modern Frontend**: Fast, responsive UI built with React and Vite.
- **Backend API**: Powered by Node.js for robust handling of data and API calls.

## 🧱 Tech Stack
- **Frontend:** React, Vite, JavaScript, HTML, CSS  
- **Backend:** Node.js, Express.js  
- **AI Logic:** Python for assistant logic (if applicable)

## 📁 Project Structure
```
HomeConnect/
├─ backend/
│  ├─ api/                # Backend API routes and logic
│  ├─ chatbot_logic/      # AI assistant and processing scripts
│  ├─ app.js              # Backend entry point
│  ├─ package.json        # Backend dependencies
├─ frontend/
│  └─ client/
│     ├─ public/          # Static assets (images, icons, logos)
│     ├─ src/             # Frontend source code (components, pages, etc.)
│     ├─ index.html       # Entry point for frontend
│     ├─ package.json     # Frontend dependencies
├─ socket/                # Real-time communication logic (if used)
├─ .gitignore
├─ README.md
└─ .env.example           # Template for environment variables
```

## 🔧 Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/strong159/HomeConnect.git
cd HomeConnect
```

### 2️⃣ Setup backend
```bash
cd backend
npm install
npm start
```

### 3️⃣ Setup frontend
```bash
cd frontend/client
npm install
npm start
```

### 4️⃣ Environment Variables
Create a `.env` file in both `backend/` and `frontend/` if needed. Include your API keys, ports, or URLs like:
```
API_URL=http://localhost:5000
PORT=5000
```

## ▶️ Run the project
- Open [http://localhost:3000](http://localhost:3000) in your browser for the frontend.
- Backend typically runs on [http://localhost:5000](http://localhost:5000).

## 🚀 Deployment
Use platforms like **Vercel/Netlify** for the frontend and **Render/Heroku** for the backend.

## 📝 License
MIT (or your preferred license)

