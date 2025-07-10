// Select.tsx
"use client"
import React from 'react';
import clsx from 'clsx';
import { FormRegister, FormErrors } from './form-utils';

interface Option { id: string | number; label: string; }
interface SelectProps {
  label?: string;
  name: string;
  options: Option[];
  register: FormRegister<any>;
  errors?: FormErrors<any>;
  validation?: any;
}

export const Select: React.FC<SelectProps> = ({ label, name, options, register, errors, validation }) => (
  <div className="mb-4">
    {label && <label htmlFor={name} className="block mb-1 font-medium text-gray-700">{label}</label>}
    <select
      id={name}
      {...register(name, validation)}
      className={clsx(
        'w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
        errors?.[name] ? 'border-red-500' : 'border-gray-300'
      )}
    >
      <option value="">Seleccione...</option>
      {options.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
    </select>
    {errors && errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name].message?.toString()}</p>}
  </div>
);