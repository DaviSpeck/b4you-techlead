const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000/api/v1';

export const api = {
  async get<T>(endpoint: string, token?: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
  },

  async post<T>(endpoint: string, data: any, token?: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao enviar dados');
    return res.json();
  },

  async patch<T>(endpoint: string, data: any, token?: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao atualizar dados');
    return res.json();
  },

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Erro ao deletar recurso');
    return res.json();
  },
};