const API_URL = "https://wishlist-backend-telo.onrender.com";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Autenticación
  register: async (data: any) => {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).detail || "Error en el registro");
    return res.json();
  },

  login: async (email: string, password: string) => {
    // IMPORTANTE: Enviamos como Form Data porque el backend usa OAuth2PasswordRequestForm
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
    if (!res.ok) throw new Error("Credenciales incorrectas");
    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    return data;
  },

  // Listas
  createList: async (title: string) => {
    const res = await fetch(`${API_URL}/lists/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ title }),
    });
    return res.json();
  },

  getMyLists: async () => {
    const res = await fetch(`${API_URL}/lists/my-lists`, { headers: getHeaders() });
    return res.json();
  },

  getSharedLists: async () => {
    const res = await fetch(`${API_URL}/lists/shared-with-me`, { headers: getHeaders() });
    return res.json();
  },

  addItem: async (listId: number, data: { name: string; link?: string; price?: number }) => {
    const res = await fetch(`${API_URL}/lists/${listId}/items`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).detail);
    return res.json();
  },

  shareList: async (listId: number, email: string) => {
    const res = await fetch(`${API_URL}/lists/${listId}/share`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ user_email: email }),
    });
    if (!res.ok) throw new Error((await res.json()).detail);
    return res.json();
  },

  buyItem: async (itemId: number) => {
    const res = await fetch(`${API_URL}/lists/items/${itemId}/buy`, {
      method: "PUT",
      headers: getHeaders(),
    });
    return res.json();
  }
};