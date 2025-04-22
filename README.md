# Candidate Search

A React + TypeScript app for browsing random GitHub profiles and saving candidates of interest. It fetches data using the GitHub API and persists saved users in local storage.

## 🚀 Features

- 🔍 View randomly selected GitHub users
- 💾 Save or reject candidates
- 📧 View email, company, and bio info
- 🌐 Links to public GitHub profiles
- 🔐 Authenticated via environment token

## 🧪 Built With

- React + TypeScript
- Vite
- GitHub REST API

## 🔐 Setup

Create a `.env` file (outside `/src`) and add:

```env
VITE_GITHUB_TOKEN=your_personal_access_token
```

> ⚠️ Token must have read-only access to public repositories.

## 🛠️ Run Locally

```bash
npm install
npm run dev
```