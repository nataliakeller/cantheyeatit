export const useApi = () => {
  const fetchWithConfig = async <T = any>(endpoint: string): Promise<T> => {
    try {
      const data = await $fetch<T>(endpoint)
      return data
    } catch (error: any) {
      console.error('Errore:', error)
      throw error
    }
  }

  const foods = {
    getAll: () => fetchWithConfig('/food.json'),
    getById: async (id: number) => {
      const allFoods = await fetchWithConfig<any[]>('/food.json')
      return allFoods.find(f => f.id === id)
    }
  }

  return {
    foods
  }
}
