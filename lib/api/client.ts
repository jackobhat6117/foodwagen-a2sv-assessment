const BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io"

export const apiClient = {
  async getFoods() {
    const response = await fetch(`${BASE_URL}/Food`)
    if (!response.ok) throw new Error("Failed to fetch foods")
    return response.json()
  },

  async searchFoods(searchParam: string) {
    const response = await fetch(`${BASE_URL}/Food?name=${searchParam}`)
    if (!response.ok) throw new Error("Failed to search foods")
    return response.json()
  },

  async createFood(data: any) {
    const response = await fetch(`${BASE_URL}/Food`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create food")
    return response.json()
  },

  async updateFood(id: string, data: any) {
    const response = await fetch(`${BASE_URL}/Food/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update food")
    return response.json()
  },

  async deleteFood(id: string) {
    const response = await fetch(`${BASE_URL}/Food/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete food")
    return response.json()
  },
}
