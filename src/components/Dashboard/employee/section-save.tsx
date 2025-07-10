"use client";

import React from "react";

interface Props {
    payAndSave?: boolean;
    sendEmail?: boolean;
    setPayAndSave: React.Dispatch<React.SetStateAction<boolean>>;
    setSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SectionSave({ payAndSave, sendEmail, setPayAndSave, setSendEmail }: Props) {

    return (
        <div className="bg-white p-4 rounded-xl shadow gap-2 text-xs border border-gray-300 flex flex-col">
            <label className="inline-flex items-center space-x-2">
                <input
                type="checkbox"
                checked={payAndSave}
                onChange={(e) => setPayAndSave(e.target.checked)}
                className="form-checkbox h-4 w-4"
                />
                <span>Pagar liquidación</span>
            </label>
            <label className="inline-flex items-center space-x-2">
                <input
                type="checkbox"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                className="form-checkbox h-4 w-4"
                />
                <span>Enviar por email</span>
            </label>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
                Guardar
            </button>
        </div>
    );
}