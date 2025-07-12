// composables/useApi.ts

// Usa runtimeConfig do Nuxt, que permite configurar baseURL diferente em produção/dev
export const useApi = () => {
  // const config = useRuntimeConfig() 

  // Função para chamadas genéricas de API usando $fetch do Nuxt
  const fetchWithConfig = async <T = any>(endpoint: string, options: any = {}) => {
    const url = `/api${endpoint}`

    try {
      const data = await $fetch<T>(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })
      return data
    } catch (error: any) {
      console.error('Error details:', {
        endpoint: url + endpoint,
        options,
        error: error.message,
        statusCode: error.statusCode,
        statusMessage: error.statusMessage
      })

      if (error.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.')
      }

      throw error
    }
  }

  const foods = {
    getAll: () => fetchWithConfig('/foods'),
    getById: (id: number) => fetchWithConfig(`/foods/${id}`),
    create: (food: any) => fetchWithConfig('/foods', {
      method: 'POST',
      body: food, 
    }),
    update: (id: number, food: any) => fetchWithConfig(`/foods/${id}`, {
      method: 'PUT',
      body: food,
    }),
    delete: (id: number) => fetchWithConfig(`/foods/${id}`, {
      method: 'DELETE',
      headers: {}
    }),
  }

  return {
    foods
  }
}
