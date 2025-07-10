// Card.tsx
"use client"
import React from 'react';

export const Card: React.FC<React.PropsWithChildren<{title?: string}>> = ({ title, children }) => (
  <div className="p-6 bg-white rounded-2xl shadow-lg">{title && <h3 className="text-xl font-semibold mb-3">{title}</h3>}{children}</div>
);