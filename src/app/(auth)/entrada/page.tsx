"use client"
import React, { useState } from 'react';
import { z } from 'zod';
import { useZodForm } from '@/components/ui/form-utils';
import {
  FormContainer,
  Input,
  EmailInput,
  PasswordInput,
  CurrencyInput,
  PercentageInput,
  Select,
  Checkbox,
  Button,
  Card
} from '@/components/ui';

// Esquema Zod
const formSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  salario: z.string(),
  porcentaje: z.number().min(0, '>=0').max(100, '<=100'),
  departamento: z.enum(['ventas','marketing','finanzas'], 'Selecciona un departamento'),
  acepta: z.boolean().refine(v => v, 'Debes aceptar los términos')
});
type FormData = z.infer<typeof formSchema>;

export default function DynamicFormPage() {
  const { register, handleSubmit, formState: { errors } } = useZodForm(formSchema);
  const [modalData, setModalData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => setModalData(data);

  return (
    <>
      <FormContainer>
        <Card title="Registro de Usuario">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input<FormData> label="Nombre" name="nombre" register={register} errors={errors} validation={{ required: 'Requerido' }} />
            <EmailInput<FormData> label="Correo" register={register} errors={errors} />
            <PasswordInput<FormData> label="Contraseña" register={register} errors={errors} />
            <CurrencyInput<FormData> label="Salario" name="salario" register={register} errors={errors} />
            <PercentageInput<FormData> label="Porcentaje de comisión" name="porcentaje" register={register} errors={errors} />
            <Select<FormData>
              label="Departamento"
              name="departamento"
              options={[
                { id: 'ventas', label: 'Ventas' },
                { id: 'marketing', label: 'Marketing' },
                { id: 'finanzas', label: 'Finanzas' }
              ]}
              register={register}
              errors={errors}
              validation={{ required: 'Requerido' }}
            />
            <Checkbox<FormData> label="Acepto términos" name="acepta" register={register} errors={errors} />
            <div className="flex justify-end">
              <Button type="submit" variant="primary">Enviar</Button>
            </div>
          </form>
        </Card>
      </FormContainer>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card title="Datos del Formulario">
            <pre className="text-sm bg-gray-100 p-4 rounded">{JSON.stringify(modalData, null, 2)}</pre>
            <div className="flex justify-end mt-4">
              <Button variant="secondary" onClick={() => setModalData(null)}>Cerrar</Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
