// CurrencyInput.tsx
"use client"
import React from 'react';
import { Input } from './Input';

export const CurrencyInput: React.FC<{ label?: string; name: string; register: any; errors?: any }> = ({ label, name, register, errors }) => (
  <Input
    type="text"
    label={label}
    name={name}
    register={register}
    errors={errors}
    validation={{
      required: 'Requerido',
      pattern: { value: /^\d+(?:[\.,]\d{1,2})?$/, message: 'Formato de moneda inválido' }
    }}
    onBlur={(e: any) => {
      const num = parseFloat(e.target.value.replace(',', '.')) || 0;
      e.target.value = num.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    }}
  />
);
