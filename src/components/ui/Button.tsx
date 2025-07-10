// components/ui/Button.tsx
"use client"

import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
  const base = 'px-4 py-2 rounded shadow active:scale-95 transition-transform text-sm font-medium';
  const styles: Record<string,string> = {
    primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500',
    secondary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500',
    text: 'bg-transparent text-blue-600 hover:underline focus:ring-0 px-0'
  };
  return (
    <button
      className={clsx(base, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};