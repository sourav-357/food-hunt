const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

async function fetchData(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Unable to load data. Please try again.')
  }

  return response.json()
}

export const getCategories = () => fetchData(`${BASE_URL}/categories.php`)

export const getMealsByCategory = (category) =>
  fetchData(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`)

export const searchMeals = (query) =>
  fetchData(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`)

export const getMealById = (id) =>
  fetchData(`${BASE_URL}/lookup.php?i=${id}`)
