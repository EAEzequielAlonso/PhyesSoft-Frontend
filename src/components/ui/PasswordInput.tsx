// PasswordInput.tsx
"use client"
import React from 'react';
import { z } from 'zod';
import { Input } from './Input';

const passwordSchema = z.string().min(8, 'Mínimo 8 caracteres').regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Debe incluir mayúscula, minúscula y número');

export const PasswordInput: React.FC<{ label?: string; register: any; errors?: any }> = ({ label, register, errors }) => (
  <Input
    type="password"
    label={label}
    name="password"
    register={register}
    errors={errors}
    validation={{
      required: 'Requerido',
      validate: (value: string) => passwordSchema.safeParse(value).success || 'Password débil'
    }}
  />
);