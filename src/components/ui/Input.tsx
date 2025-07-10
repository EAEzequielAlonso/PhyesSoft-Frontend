// Input.tsx
"use client"
import React from 'react';
import clsx from 'clsx';
import { FormRegister, FormErrors } from './form-utils';

interface InputProps {
  label?: string;
  name: string;
  register: FormRegister<any>;
  errors?: FormErrors<any>;
  validation?: any; // pasa reglas extra a register
  [key: string]: any;
}

export const Input: React.FC<InputProps> = ({ label, name, register, errors, validation, className, ...props }) => (
  <div className="mb-4">
    {label && <label htmlFor={name} className="block mb-1 font-medium text-gray-700">{label}</label>}
    <input
      id={name}
      {...register(name, validation)}
      {...props}
      className={clsx(
        'w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
        errors?.[name] ? 'border-red-500' : 'border-gray-300',
        className
      )}
    />
    {errors && errors[name] && (
      <p className="mt-1 text-sm text-red-600">{errors[name].message?.toString()}</p>
    )}
  </div>
);