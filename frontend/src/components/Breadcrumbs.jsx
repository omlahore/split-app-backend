// frontend/src/components/Breadcrumbs.jsx
import React from 'react';

/**
 * A simple breadcrumb trail.
 * @param {{ items: { label: string; href?: string }[] }} props
 */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item, idx) => (
          <li key={idx} className={idx === items.length - 1 ? 'current' : ''}>
            {item.href && idx !== items.length - 1 ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="separator">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
