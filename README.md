<p align="center">
  <img src="https://raw.githubusercontent.com/<your-username>/split-expense-app/main/frontend/public/logo192.png" alt="Split Expense App Logo" width="120" />
</p>

# Split Expense App 🚀

> A modern, sleek, Splitwise-style app to track shared expenses, settle balances, view analytics, and manage recurring costs—all in one place!

[![Live Frontend](https://img.shields.io/badge/Frontend-Vercel-blue?logo=vercel&logoColor=white)](https://split-app-frontend.vercel.app)
[![Live Backend](https://img.shields.io/badge/Backend-Railway-red?logo=railway&logoColor=white)](https://split-app-backend-production-1371.up.railway.app)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

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

<div align="center">

<img src="https://github.com/user-attachments/assets/afcc0572-2b32-450c-9d0d-b30a03961064" alt="Dashboard" width="300" />  
<img src="https://github.com/user-attachments/assets/f96a09a9-7647-4b29-9abe-7882515c731a" alt="Analytics" width="300" />  
<img src="https://github.com/user-attachments/assets/55566822-dac4-49e1-bd98-f28c4c15ddac" alt="Dark Mode" width="300" />  
<img src="https://github.com/user-attachments/assets/6da9c35f-dd10-45c5-a173-39f1f9ecf29f" alt="Recurring" width="300" />

</div>

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, Recharts, React-Icons  
- **Backend**: Node.js, Express, Mongoose (MongoDB)  
- **Styling**: CSS Variables, Flexbox & Grid  
- **Testing**: Postman / Axios  
- **Deployment**: Vercel (frontend), Railway (backend)  

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 14.x  
- npm or Yarn  
- Git  

### Clone & Install

```bash
git clone https://github.com/<your-username>/split-expense-app.git
cd split-expense-app/backend
npm install
