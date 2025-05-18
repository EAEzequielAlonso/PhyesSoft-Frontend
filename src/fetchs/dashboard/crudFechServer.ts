
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getToken = async () => {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");
  return token
}

export const fetchData = async (endpoint: string, label: string, search: string) => {

  try {

    const token = await getToken();
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
    
    if (!response.ok)
      throw new Error(`${resp.status} - ${resp.error}`);

    return resp
  } catch (error) {
    throw new Error(`${label}. ${error instanceof Error && `Error: ${error.message}`}`);
  }
};

export const fetchDataOne = async (endpoint: string, label: string, relationId: string) => {
  try {

    const token = await getToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${relationId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();
    console.log("resp: " ,JSON.stringify(resp))
    if (!response.ok) 
      throw new Error(`${resp.status} - ${resp.error}`);

    return resp
  } catch (error) {
    throw new Error(`${label}. ${error instanceof Error && `Error: ${error.message}`}`);
  }
};

export const fetchPost = async (endpoint: string, label: string, body: object) => {
  try {

    const token = await getToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const resp = await response.json();
    console.log("resp: " ,JSON.stringify(resp))
    if (!response.ok) 
      throw new Error(`${resp.status} - ${resp.error}`);

    return resp
  } catch (error) {
    throw new Error(`${label}. ${error instanceof Error && `Error: ${error.message}`}`);
  }
};

export const fetchDataRelation = async (endpoint: string, label:string) => {
  try {

    const token = await getToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/commerce`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Cookie: `token=${token}` }),
      },
    });

    const resp = await response.json();
    
    if (!response.ok)
      throw new Error(`${resp.status} - ${resp.error}`);

    return resp
  } catch (error) {
    throw new Error(`${label}. ${error instanceof Error && `Error: ${error.message}`}`);
  }
};
