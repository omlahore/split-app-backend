// frontend/src/components/ExpenseForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

const CATEGORIES = ['Food', 'Travel', 'Utilities', 'Entertainment', 'Other'];

export default function ExpenseForm({ onAdd, people }) {
  const [form, setForm] = useState({
    amount: '',
    description: '',
    paid_by: '',
    category: 'Other',
    splitType: 'equal',
    splits: {}
  });
  const [errors, setErrors] = useState(null);

  // Reset splits when splitType or people change
  useEffect(() => {
    setForm(f => ({
      ...f,
      splits:
        f.splitType === 'equal'
          ? {}
          : people.reduce((acc, p) => ({ ...acc, [p]: '' }), {})
    }));
  }, [form.splitType, people]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSplitChange = (person, value) => {
    setForm(f => ({
      ...f,
      splits: { ...f.splits, [person]: value }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(null);

    try {
      const payload = {
        amount: Number(form.amount),
        description: form.description,
        paid_by: form.paid_by,
        category: form.category
      };

      if (form.splitType !== 'equal') {
        payload.split = {
          type: form.splitType,
          values: Object.fromEntries(
            Object.entries(form.splits).map(([p, v]) => [p, Number(v)])
          )
        };
      }

      const res = await axios.post(`${API_BASE}/expenses`, payload);
      onAdd(res.data.data);

      // Reset
      setForm({
        amount: '',
        description: '',
        paid_by: '',
        category: 'Other',
        splitType: 'equal',
        splits: {}
      });
    } catch (err) {
      setErrors(err.response?.data?.message || err.message);
    }
  };

  return (
    <form className="form expense-form" onSubmit={handleSubmit}>
      {errors && <p className="error-text">{errors}</p>}

      <div className="floating-label-group">
        <input
          id="amount"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder=" "
          required
        />
        <label htmlFor="amount">Amount</label>
      </div>

      <div className="floating-label-group">
        <input
          id="description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder=" "
          required
        />
        <label htmlFor="description">Description</label>
      </div>

      <div className="floating-label-group">
        <input
          id="paid_by"
          name="paid_by"
          type="text"
          value={form.paid_by}
          onChange={handleChange}
          placeholder=" "
          required
        />
        <label htmlFor="paid_by">Paid By</label>
      </div>

      <div className="floating-label-group">
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value=""> </option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label htmlFor="category">Category</label>
      </div>

      <div className="floating-label-group">
        <select
          id="splitType"
          name="splitType"
          value={form.splitType}
          onChange={handleChange}
          required
        >
          <option value=""> </option>
          <option value="equal">Equal</option>
          <option value="percentage">Percentage</option>
          <option value="exact">Exact Amount</option>
        </select>
        <label htmlFor="splitType">Split Type</label>
      </div>

      {form.splitType !== 'equal' &&
        people.map(person => (
          <div key={person} className="floating-label-group">
            <input
              id={`split-${person}`}
              type="number"
              value={form.splits[person] || ''}
              onChange={e => handleSplitChange(person, e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor={`split-${person}`}>
              {person}’s {form.splitType === 'percentage' ? '% share' : 'amount'}
            </label>
          </div>
        ))}

      <button className="btn btn-primary" type="submit">
        Add Expense
      </button>
    </form>
  );
}
