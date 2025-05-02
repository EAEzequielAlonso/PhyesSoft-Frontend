"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const CajaDiariaPage = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [sucursal, setSucursal] = useState("");
  const [saldoInicial, setSaldoInicial] = useState(0);
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);

  const saldoFinal = saldoInicial + ingresos - egresos;

  const handleGuardar = () => {
    // Aquí iría la lógica para enviar datos al backend
    console.log({ fecha, sucursal, saldoInicial, ingresos, egresos, saldoFinal });
  };

  return (
    <motion.div 
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Caja Diaria</h1>

      <Card className="mb-6">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
            <Label>Fecha</Label>
            <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>

          <div>
            <Label>Sucursal</Label>
            <Select onValueChange={(val) => setSucursal(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar sucursal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="central">Central</SelectItem>
                <SelectItem value="norte">Sucursal Norte</SelectItem>
                <SelectItem value="sur">Sucursal Sur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Saldo inicial</Label>
            <Input
              type="number"
              value={saldoInicial}
              onChange={(e) => setSaldoInicial(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <Label>Ingresos</Label>
            <Input
              type="number"
              value={ingresos}
              onChange={(e) => setIngresos(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <Label>Egresos</Label>
            <Input
              type="number"
              value={egresos}
              onChange={(e) => setEgresos(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <Label>Saldo Final</Label>
            <Input value={saldoFinal.toFixed(2)} readOnly className="bg-gray-100" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleGuardar}>Guardar Caja</Button>
      </div>
    </motion.div>
  );
};

export default CajaDiariaPage;
