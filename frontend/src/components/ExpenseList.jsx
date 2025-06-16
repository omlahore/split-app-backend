// frontend/src/components/ExpenseList.jsx
import React from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { FiEdit, FiTrash2, FiCheckSquare } from 'react-icons/fi';

export default function ExpenseList({ expenses, refresh }) {
  // Delete an expense
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await axios.delete(`${API_BASE}/expenses/${id}`);
      refresh();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  // Mark an expense as settled
  const handleSettle = async id => {
    try {
      await axios.post(`${API_BASE}/expenses/${id}/settle`);
      refresh();
    } catch (err) {
      console.error('Settle failed', err);
    }
  };

  // Placeholder for edit — you can wire this up to an edit modal
  const handleEdit = id => {
    console.warn('Edit not implemented yet for expense', id);
  };

  if (!expenses.length) {
    return <p>No expenses yet.</p>;
  }

  return (
    <ul>
      {expenses.map(exp => {
        // Grab whichever ID field exists
        const id = exp.id || exp._id;
        return (
          <li key={id} className="card">
            <div className="expense-info">
              <p>{exp.description}</p>
              <p>
                {exp.paid_by} &ndash; {exp.category}
              </p>
            </div>

            <div className="expense-amount">
              ₹{exp.amount}
            </div>

            <div className="actions">
              <button onClick={() => handleEdit(id)}>
                <FiEdit className="icon" /> Edit
              </button>
              <button onClick={() => handleDelete(id)}>
                <FiTrash2 className="icon" /> Delete
              </button>
              <button onClick={() => handleSettle(id)}>
                <FiCheckSquare className="icon" /> Settle
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
