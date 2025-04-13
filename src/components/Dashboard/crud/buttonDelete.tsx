"use client"

import { LuTrash } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { ConfirmModal } from "@/components";

interface Props {
  id: string;
  endpoint: string;
  label: string;
}

export function ButtonDelete({ id, endpoint, label }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!result.ok) throw new Error();

      showToast(`${label} eliminada con éxito`, "success");
      router.refresh();
    } catch {
      showToast(`Error al eliminar ${label}`, "error");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button className="btn-text-red mx-2 my-1" onClick={() => setShowConfirm(true)}>
        <LuTrash />
      </button>

      <ConfirmModal
        show={showConfirm}
        label={label}
        message={`¿Seguro que desea eliminar el registro?`}
        labelCancel="Cancelar"
        labelConfirm="Eliminar"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
