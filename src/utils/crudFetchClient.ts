export const fetchGetClient = async (endpoint:string, queryParams = '', label: string) => {
    try {
      //const token = await redirectToLogin()
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

  