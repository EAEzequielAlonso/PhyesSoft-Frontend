
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const fetchData = async (endpoint: string, label: string, search: string) => {

  try {
    const token = (await cookies()).get("token");
    if (!token) redirect("/login");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?${search}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();
    return resp;
  } catch (error) {
    throw new Error(`Error al cargar los datos en ${label}. Error: ${error}`);
  }
};

export const fetchDataOne = async (endpoint: string, label: string, brandId: string) => {
  try {
    const token = (await cookies()).get("token");
    if (!token) redirect("/login");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${brandId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();
    return resp;
  } catch (error) {
    throw new Error(`Error al cargar los datos en ${label}. Error: ${error}`);
  }
};