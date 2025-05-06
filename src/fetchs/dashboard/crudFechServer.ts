
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const fetchData = async (endpoint: string, label: string, search: string) => {
  console.log("endpint, label, search", endpoint, label, search);

  try {

    const token = (await cookies()).get("token")?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Cookie: `token=${token}` }),
      },
      credentials: "include", // muy importante para que se envíen cookies
      cache: "no-store", // opcional, si querés evitar cacheo en server components
    });
    const resp = await response.json();
    return resp;
  } catch (error) {
    throw new Error(`Error al cargar los datos en ${label}. Error: ${error}`);
  }
};

export const fetchDataOne = async (endpoint: string, label: string, relationId: string) => {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) redirect("/login");



    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${relationId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();
    return resp;
  } catch (error) {
    throw new Error(`Error al cargar los datos en ${label}. Error: ${error}`);
  }
};

export const fetchPost = async (endpoint: string, label: string, body: object) => {
  try {
    const token = (await cookies()).get("token");
    if (!token) redirect("/login");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const resp = await response.json();
    return resp;
  } catch (error) {
    throw new Error(`Error al cargar los datos en ${label}. Error: ${error}`);
  }
};
