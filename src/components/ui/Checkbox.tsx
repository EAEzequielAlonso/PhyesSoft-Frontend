// Checkbox.tsx
"use client"
import React from 'react';
import { FormRegister, FormErrors } from './form-utils';
import { Path } from 'react-hook-form';

interface CheckboxProps<TFormValues> {
  label: string;
  name: Path<TFormValues>;
  register: FormRegister<TFormValues>;
  errors?: FormErrors<TFormValues>;
}

export function Checkbox<TFormValues>({ label, name, register, errors }: CheckboxProps<TFormValues>) {
  const errorMessage = errors?.[name]?.message?.toString();
  return (
    <div className="mb-4">
      <label className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          {...register(name)}
          className="form-checkbox h-5 w-5 text-green-600"
        />
        <span className="text-gray-700">{label}</span>
      </label>
      {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}