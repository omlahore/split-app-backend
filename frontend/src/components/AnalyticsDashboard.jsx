// frontend/src/components/AnalyticsDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts';

const COLOR_PALETTE = ['#4F46E5','#F43F5E','#10B981','#F59E0B','#3B82F6'];

export default function AnalyticsDashboard() {
  const [monthly,       setMonthly]       = useState([]);
  const [patterns,      setPatterns]      = useState(null);
  const [topExpenses,   setTopExpenses]   = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [msRes, spRes, teRes, tcRes] = await Promise.all([
          axios.get(`${API_BASE}/analytics/monthly-summary`),
          axios.get(`${API_BASE}/analytics/spending-patterns`),
          axios.get(`${API_BASE}/analytics/top-expenses?limit=5`),
          axios.get(`${API_BASE}/analytics/top-categories?limit=5`),
        ]);
        setMonthly(msRes.data.data);
        setPatterns(spRes.data.data);
        setTopExpenses(teRes.data.data);
        setTopCategories(tcRes.data.data);
      } catch (err) {
        console.error('Failed to load analytics', err);
      }
    }
    fetchAnalytics();
  }, []);

  // Chart data
  const monthlyChartData = monthly.map(m => ({
    month: `${m.year}-${String(m.month).padStart(2,'0')}`,
    total: m.total
  }));
  const categoryChartData = topCategories.map((c,i) => ({
    category: c.category,
    value: c.total,
    fill: COLOR_PALETTE[i % COLOR_PALETTE.length]
  }));
  const groupChartData = patterns
    ? patterns.members.map((m,i) => ({
        person: m.person,
        spent: m.spent,
        fill: COLOR_PALETTE[i % COLOR_PALETTE.length]
      }))
    : [];

  return (
    <div className="analytics mt-5">
      <h2>Analytics</h2>

      {/* ─── Charts ───────────────────────────────────── */}
      <div className="analytics-charts">
        <section className="chart-card">
          <h3>Monthly Spending</h3>
          {monthlyChartData.length === 0 ? (
            <p>No data.</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyChartData} margin={{ top: 10, right: 30, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={val => `₹${val}`} />
                <Legend />
                <Bar dataKey="total" name="Total" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="chart-card">
          <h3>Top Categories</h3>
          {categoryChartData.length === 0 ? (
            <p>No data.</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  dataKey="value"
                  nameKey="category"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
                >
                  {categoryChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={val => `₹${val}`} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="chart-card">
          <h3>Group vs Individual</h3>
          {!patterns ? (
            <p>No data.</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={groupChartData} margin={{ top: 10, right: 30, bottom: 5 }}>
                <XAxis dataKey="person" />
                <YAxis />
                <Tooltip formatter={val => `₹${val}`} />
                <Bar dataKey="spent" name="Spent">
                  {groupChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>
      </div>

      {/* ─── Original Text Summaries ─────────────────── */}
      <section className="mt-4">
        <h3>Monthly Spending (Detail)</h3>
        {monthly.length === 0 ? (
          <p>No data.</p>
        ) : (
          monthly.map(m => (
            <div key={`${m.year}-${m.month}`} className="mb-2">
              <strong>{m.year}-{String(m.month).padStart(2,'0')}</strong>: ₹{m.total}
              <ul>
                {m.categories.map(cat => (
                  <li key={cat.category}>
                    {cat.category}: ₹{cat.total} ({cat.count} txns)
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>

      <section className="mt-4">
        <h3>Group vs Individual Spending (Detail)</h3>
        {!patterns ? (
          <p>No data.</p>
        ) : (
          <div>
            <p>Group Total: ₹{patterns.groupTotal}</p>
            <p>Members: {patterns.memberCount}</p>
            <p>Avg per Person: ₹{patterns.groupAverage}</p>
            <ul>
              {patterns.members.map(m => (
                <li key={m.person}>
                  {m.person}: ₹{m.spent} ({m.count} txns)
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="mt-4">
        <h3>Top Transactions</h3>
        {topExpenses.length === 0 ? (
          <p>No data.</p>
        ) : (
          <ul>
            {topExpenses.map(exp => (
              <li key={exp._id || exp.id}>
                ₹{exp.amount} – {exp.description} (by {exp.paid_by} on{' '}
                {new Date(exp.createdAt).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-4 mb-5">
        <h3>Top Categories (List)</h3>
        {topCategories.length === 0 ? (
          <p>No data.</p>
        ) : (
          <ul>
            {topCategories.map(cat => (
              <li key={cat.category}>
                {cat.category}: ₹{cat.total}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
