// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from './config';

import ThemeToggle        from './components/ThemeToggle';
import Breadcrumbs        from './components/Breadcrumbs';
import ExpenseForm        from './components/ExpenseForm';
import ExpenseList        from './components/ExpenseList';
import SettlementSummary  from './components/SettlementSummary';
import CategorySummary    from './components/CategorySummary';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import RecurringForm      from './components/RecurringForm';
import RecurringList      from './components/RecurringList';
import Modal              from './components/Modal';

import logo from './assets/logo.svg';
import './styles.css';
import './App.css';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [people, setPeople]     = useState([]);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);

  // Load all data on mount
  useEffect(() => {
    refreshAll();
  }, []);

  // Fetch expenses & people
  const refreshAll = async () => {
    try {
      const [exRes, pplRes] = await Promise.all([
        axios.get(`${API_BASE}/expenses`),
        axios.get(`${API_BASE}/settlements/people`)
      ]);
      setExpenses(exRes.data.data);
      setPeople(pplRes.data.people);
    } catch (err) {
      console.error('Refresh failed', err);
    }
  };

  const openExpenseModal  = () => setExpenseModalOpen(true);
  const closeExpenseModal = () => setExpenseModalOpen(false);

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="container header-inner">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="app-title">Split-App</h1>
          <nav className="nav">
            <ul>
              <li><a href="#expenses">Expenses</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#recurring">Recurring</a></li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">
        {/* EXPENSES */}
        <section id="expenses">
          <Breadcrumbs items={[
            { label: 'Home', href: '#expenses' },
            { label: 'Expenses' }
          ]}/>
          
          {/* Inline form */}
          <ExpenseForm onAdd={refreshAll} people={people} />

          {/* FAB + Modal form */}
          <button className="fab" onClick={openExpenseModal} aria-label="Add Expense">
            ＋
          </button>
          <Modal isOpen={isExpenseModalOpen} onClose={closeExpenseModal}>
            <h2>Add Expense</h2>
            <ExpenseForm
              onAdd={() => {
                closeExpenseModal();
                refreshAll();
              }}
              people={people}
            />
          </Modal>

          <h2 className="mt-4">All Expenses</h2>
          <ExpenseList expenses={expenses} refresh={refreshAll} />
        </section>

        {/* DASHBOARD GRID */}
        <div id="dashboard" className="dashboard-grid">
          <section>
            <Breadcrumbs items={[
              { label: 'Home', href: '#dashboard' },
              { label: 'Summary' }
            ]}/>
            <SettlementSummary />
            <CategorySummary />
          </section>
          <section>
            <Breadcrumbs items={[
              { label: 'Home', href: '#dashboard' },
              { label: 'Analytics' }
            ]}/>
            <AnalyticsDashboard />
          </section>
        </div>

        {/* RECURRING */}
        <section id="recurring" className="mt-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '#recurring' },
            { label: 'Recurring' }
          ]}/>
          <h2>Recurring Templates</h2>
          <RecurringForm onAdd={refreshAll} />
          <RecurringList />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          &copy; {new Date().getFullYear()} Split-App by Om Lahorey
        </div>
      </footer>
    </div>
  );
}
