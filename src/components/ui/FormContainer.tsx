// FormContainer.tsx
"use client"
import React from 'react';

export const FormContainer: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg">{children}</div>
);