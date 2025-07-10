// PercentageInput.tsx
"use client"
import React from 'react';
import { Input } from './Input';

export const PercentageInput: React.FC<{ label?: string; name: string; register: any; errors?: any }> = ({ label, name, register, errors }) => (
  <Input
    type="number"
    label={label}
    name={name}
    register={register}
    errors={errors}
    validation={{
      required: 'Requerido',
      min: { value: 0, message: '>= 0' },
      max: { value: 100, message: '<= 100' }
    }}
  />
);
