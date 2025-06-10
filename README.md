# Split Expense App

![image](https://github.com/user-attachments/assets/0cfbcd65-a790-4429-b281-4739aa4fec64)
![image](https://github.com/user-attachments/assets/ca1221ca-1b56-486e-b026-58bea307b38f)
![image](https://github.com/user-attachments/assets/3893aaed-e6b0-4ddf-b7f7-a915242ca672)
![image](https://github.com/user-attachments/assets/53daa922-e8fd-4c9f-9621-caa20e75bb10)
![image](https://github.com/user-attachments/assets/d7c177b7-4fc1-4118-bd59-357550a5b7ab)


A simple "Splitwise-style" expense‑splitting backend + frontend that lets groups of friends or roommates track shared expenses, calculate who owes whom, and view optimized settlement recommendations.

Live Frontend: https://split-app-frontend.vercel.app
Live Backend API: https://split-app-backend-production-1371.up.railway.app

## Table of Contents

- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone & Install](#clone--install)
  - [Environment Variables](#environment-variables)
  - [Run Locally](#run-locally)
- [Postman Collection](#postman-collection)
- [Project Structure](#project-structure)
- [Known Limitations & Next Steps](#known-limitations--next-steps)
- [License](#license)

## Problem Statement

Build a backend system that helps groups of people split expenses fairly and calculate who owes money to whom. Think of scenarios like:

- Roommates splitting rent & utilities
- Friends sharing a dinner bill
- Travel buddies tracking trip expenses

## Features

### Core Requirements

**Expense Tracking**
- POST /expenses: add a new expense (amount, description, paid_by)
- Auto-create new people when referenced
- GET /expenses: list all expenses
- PUT /expenses/:id & DELETE /expenses/:id
- Support equal split, percentage share, or exact amounts per person

**Settlement Calculations**
- GET /balances: net owed/owed-to per person
- GET /settlements: optimized minimal-transaction settlement list

**Validation & Error Handling**
- Positive amounts, required fields, valid person names
- Graceful errors with clear messages & proper HTTP status codes

**Optional Extras**
- Recurring transactions (rent, subscriptions)
- Expense categories & breakdown
- Monthly analytics & spending charts
- Basic HTML dashboard

## Tech Stack

- **Backend**: Node.js + Express (deployed on Railway)
- **Database**: PostgreSQL (Railway managed)
- **Frontend**: React (Vercel)
- **API Testing**: Postman

## Screenshots

*Add your app screenshots here*

## API Endpoints

### Expense Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /expenses | List all expenses |
| POST | /expenses | Create a new expense |
| PUT | /expenses/:id | Update an existing expense |
| DELETE | /expenses/:id | Delete an expense |

### Sample Payload

```json
POST /expenses  
{
  "amount": 60.00,
  "description": "Dinner at restaurant",
  "paid_by": "Shantanu"
}
```

### Settlements & People

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /people | List all participants (derived from expenses) |
| GET | /balances | Show net owed vs. owed-to per person |
| GET | /settlements | Optimized settlement transactions |

## Getting Started

### Prerequisites

- Node.js ≥ 14.x
- Yarn or npm
- Git

### Clone & Install

```bash
git clone https://github.com/<your-username>/split-expense-app.git
cd split-expense-app/backend
yarn install    # or npm install
```

### Environment Variables

Create a .env file in /backend with:

```env
DATABASE_URL=postgres://<user>:<pass>@<host>:<port>/<db>
PORT=3000
```

### Run Locally

```bash
# start backend on http://localhost:3000
yarn start

# in a separate tab, run frontend
cd ../frontend
yarn install
yarn start      # opens http://localhost:3001
```

## Postman Collection

Import our pre-configured collection + environment to test every endpoint:

- Collection JSON: https://gist.github.com//
- Environment JSON: https://gist.github.com//

## Project Structure

```
/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   └── App.jsx
    └── package.json
```

## Known Limitations & Next Steps

- No user authentication yet
- Future enhancements: recurring payments, category filters, analytics dashboard, notifications

## License

MIT License
