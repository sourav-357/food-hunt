import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const FavouritesContext = createContext()
const STORAGE_KEY = 'foodhunt-favourites'

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY)
    return savedItems ? JSON.parse(savedItems) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  const addToFavourites = (meal) => {
    setFavourites((currentItems) => {
      const alreadySaved = currentItems.some((item) => item.idMeal === meal.idMeal)
      return alreadySaved ? currentItems : [...currentItems, meal]
    })
  }

  const removeFromFavourites = (mealId) => {
    setFavourites((currentItems) =>
      currentItems.filter((item) => item.idMeal !== mealId),
    )
  }

  const toggleFavourite = (meal) => {
    const exists = favourites.some((item) => item.idMeal === meal.idMeal)

    if (exists) {
      removeFromFavourites(meal.idMeal)
    } else {
      addToFavourites(meal)
    }
  }

  const isFavourite = (mealId) =>
    favourites.some((item) => item.idMeal === mealId)

  const value = useMemo(
    () => ({
      favourites,
      addToFavourites,
      removeFromFavourites,
      toggleFavourite,
      isFavourite,
    }),
    [favourites],
  )

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  const context = useContext(FavouritesContext)

  if (!context) {
    throw new Error('useFavourites must be used inside FavouritesProvider')
  }

  return context
}
