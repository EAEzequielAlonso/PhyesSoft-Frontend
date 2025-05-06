export const fetchGetClient = async (endpoint:string, queryParams = '', label: string) => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });
      const resp = await response.json();
      return resp
  
    } catch (error) {
      throw new Error(`Error al cargar los datos en ${label}. Error: ${error}`);
    }
  };

  export const fetchPost = async (endpoint: string, label: string, body: object) => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
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
  