// EmailInput.tsx
"use client"
import React from 'react';
import { z } from 'zod';
import { Input } from './Input';

const emailSchema = z.string().email({ message: 'Correo inválido' });

export const EmailInput: React.FC<{ label?: string; register: any; errors?: any }> = ({ label, register, errors }) => (
  <Input
    type="email"
    label={label}
    name="email"
    register={register}
    errors={errors}
    validation={{
      required: 'Requerido',
      validate: (value: string) => emailSchema.safeParse(value).success || 'Formato de email inválido'
    }}
  />
);