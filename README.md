![image](https://github.com/user-attachments/assets/ee177b61-1c0a-403d-9753-e31b8ec355be)# Split Expense App 🚀

> A modern, sleek, Splitwise-style app to track shared expenses, settle balances, view analytics, and manage recurring costs—all in one place!

[![Live Frontend](https://img.shields.io/badge/Frontend-Vercel-blue?logo=vercel&logoColor=white)]([https://split-app-frontend.vercel.app](https://split-app-backend-lime.vercel.app/))  
[![Live Backend](https://img.shields.io/badge/Backend-Railway-red?logo=railway&logoColor=white)](https://split-app-backend-production-1371.up.railway.app)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---
<h2 align="center">
  <a href="https://split-app-frontend.vercel.app" target="_blank">Launch Frontend App</a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://split-app-backend-production-1371.up.railway.app" target="_blank">Launch Backend API</a>
</h2>


## 📖 Table of Contents

1. [✨ Features](#-features)  
2. [📸 Screenshots](#-screenshots)  
3. [🛠 Tech Stack](#-tech-stack)  
4. [🚀 Getting Started](#-getting-started)  
5. [📡 API Reference](#-api-reference)  
6. [📂 Project Structure](#-project-structure)  
7. [📝 Contributing](#-contributing)  
8. [⚖️ License](#️-license)  

---

## ✨ Features

- **Expense Tracking**  
    - Add, edit & delete expenses  
    - Supports **equal**, **percentage**, or **exact** splits  
    - Auto-creates people as you enter names  
- **Settlement Calculations**  
    - View **net balances** per person  
    - **Optimized minimal-transaction** settlements  
- **Recurring Expenses**  
    - Create monthly/weekly/daily templates  
    - Automatic next-date scheduling  
- **Dashboard Grid Layout**  
    - Responsive **2-column** summary & analytics  
    - Sticky header with **dark/light** theme toggle  
- **Interactive Charts**  
    - **Bar chart** for monthly spend  
    - **Pie chart** for category breakdown  
    - **Bar chart** for individual vs. group  
- **Inline Editing & Quick Actions**  
    - Hover-to-edit fields  
    - “Mark as Settled” & “Delete” buttons  
- **FAB & Modal Forms**  
    - Floating **＋** button opens modal forms  
    - Floating labels for clarity  
- **Filter, Search & Pagination**  
    - Live search, date-range & category filters  
    - Server-side pagination with Prev/Next  
- **Toast Notifications**  
    - Success & error toasts on add/edit/delete  
- **Accessibility & Keyboard Shortcuts**  
    - ARIA labels, proper focus states  
    - Shortcut keys (e.g. “n” to add expense)  
- **Dark / Light Mode**  
    - Auto-detect system preference  
    - Persist user choice in localStorage  

---

## 📸 Screenshots

<div align="center"> <table> <tr> <td><img src="https://github.com/user-attachments/assets/e195a867-f22d-4c81-8975-8d8d387e7a07" alt="Screenshot 1" width="280" /></td> <td><img src="https://github.com/user-attachments/assets/1f7f2cf3-609b-419a-8f82-fb973ac9e04b" alt="Screenshot 2" width="280" /></td> <td><img src="https://github.com/user-attachments/assets/092c6488-cd6d-4d02-83c5-5adeb5624d54" alt="Screenshot 3" width="280" /></td> </tr> <tr> <td><img src="https://github.com/user-attachments/assets/f63fc612-1c4b-404f-b773-0ca868a37f66" alt="Screenshot 4" width="280" /></td> <td><img src="https://github.com/user-attachments/assets/e0f85848-e61d-47ee-82cf-c53c8ee45c83" alt="Screenshot 5" width="280" /></td> <td><img src="https://github.com/user-attachments/assets/8894e095-8b39-43a9-a841-87b2baef8c46" alt="Screenshot 6" width="280" /></td> </tr> <tr> <td><img src="https://github.com/user-attachments/assets/29906bb2-5478-4a72-95ee-6f970c2bf728" alt="Screenshot 7" width="280" /></td> <td><img src="https://github.com/user-attachments/assets/f001fc1f-69d3-46eb-b028-81f073226eb1" alt="Screenshot 8" width="280" /></td> <td><img src="https://github.com/user-attachments/assets/370e0a24-8857-440f-93d5-b6f3c549a114" alt="Screenshot 9" width="280" /></td> </tr> <tr> <td colspan="3"><img src="https://github.com/user-attachments/assets/d6298436-78e4-493e-a163-6a6525546481" alt="Screenshot 10" width="600" /></td> </tr> </table> </div>
---

## 🛠 Tech Stack

- **Frontend:** React, Vite, Recharts, React-Icons  
- **Backend:** Node.js, Express, Mongoose (MongoDB)  
- **Styling:** CSS Variables, Flexbox & Grid  
- **Testing:** Postman / Axios  
- **Deployment:** Vercel (frontend), Railway (backend)  

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 14.x  
- npm or Yarn  
- Git  

### Clone & Install

    git clone https://github.com/<your-username>/split-expense-app.git
    cd split-expense-app/backend
    npm install

### Environment Variables

Create a `.env` in the **backend/** folder:

    MONGODB_URI=<your-mongo-uri>
    PORT=4000

### Run Locally

    # Backend
    cd backend
    npm start      # http://localhost:4000

    # Frontend
    cd ../frontend
    npm install
    npm run dev    # http://localhost:5173

---

## 📡 API Reference

### Expenses

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/expenses`            | List all expenses              |
| POST   | `/expenses`            | Create new expense             |
| PUT    | `/expenses/:id`        | Update existing expense        |
| DELETE | `/expenses/:id`        | Delete expense                 |
| POST   | `/expenses/:id/settle` | Mark expense as settled        |

### Settlements & Analytics

| Method | Endpoint                                 | Description                                  |
| ------ | ---------------------------------------- | -------------------------------------------- |
| GET    | `/settlements/people`                    | List participants                           |
| GET    | `/settlements/balances`                  | Net owed vs. owed-to                        |
| GET    | `/settlements`                           | Optimized settlement transactions           |
| GET    | `/analytics/monthly-summary`             | Monthly totals & category breakdown         |
| GET    | `/analytics/spending-patterns`           | Group vs individual spending analysis       |
| GET    | `/analytics/top-expenses?limit=N`        | Top N transactions                          |
| GET    | `/analytics/top-categories?limit=N`      | Top N categories by spend                   |

---

## 📂 Project Structure

    split-expense-app/
    ├── backend/
    │   ├── src/
    │   │   ├── config/       # DB + env setup
    │   │   ├── models/       # Mongoose schemas
    │   │   ├── routes/       # Express endpoints
    │   │   └── services/     # Business logic
    │   ├── .env
    │   └── package.json
    └── frontend/
        ├── public/           # Static assets
        ├── src/
        │   ├── assets/
        │   ├── components/   # UI pieces
        │   ├── context/      # Theme, Toast
        │   └── App.jsx
        └── package.json

---

## 📝 Contributing

1. Fork the repo  
2. Create your branch (`git checkout -b feature/...`)  
3. Commit changes (`git commit -am 'Add feature'`)  
4. Push & open PR  

---

## ⚖️ License

This project is licensed under the MIT License. See LICENSE for details.
