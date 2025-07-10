// form-utils.ts: validaciones con Zod y React Hook Form
"use client";
import { useForm, UseFormRegister, FieldErrors, SubmitHandler } from 'react-hook-form';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * useZodForm
 * Hook para crear formularios con React Hook Form y Zod.
 * Devuelve register, handleSubmit, formState, etc.
 */
export function useZodForm<TSchema extends ZodSchema>(schema: TSchema) {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });
  return form as {
    register: UseFormRegister<z.infer<TSchema>>;
    handleSubmit: (callback: SubmitHandler<z.infer<TSchema>>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    formState: { errors: FieldErrors<z.infer<TSchema>> };
  };
}

export type FormRegister<T> = UseFormRegister<T>;
export type FormErrors<T> = FieldErrors<T>;