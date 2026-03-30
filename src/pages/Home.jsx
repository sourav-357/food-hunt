import { useEffect, useMemo, useState } from 'react'
import CategoryBar from '../components/CategoryBar'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import MealCard from '../components/MealCard'
import Pagination from '../components/Pagination'
import useFetch from '../hooks/useFetch'
import { getCategories, getMealsByCategory, searchMeals } from '../services/api'
import styles from './Home.module.css'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(getCategories, [])

  const categories = categoriesData?.categories || []

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].strCategory)
    }
  }, [categories, selectedCategory])

  const {
    data: mealsData,
    loading: mealsLoading,
    error: mealsError,
  } = useFetch(
    () => {
      if (submittedSearch.trim()) {
        return searchMeals(submittedSearch.trim())
      }

      return getMealsByCategory(selectedCategory || 'Beef')
    },
    [selectedCategory, submittedSearch],
  )

  const meals = useMemo(() => mealsData?.meals || [], [mealsData])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, submittedSearch])

  const startIndex = (currentPage - 1) * 8
  const paginatedMeals = meals.slice(startIndex, startIndex + 8)
  const totalPages = Math.ceil(meals.length / 8)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedSearch(searchInput)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSearchInput('')
    setSubmittedSearch('')
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Discover tasty meals</h1>
          <p>Filter by category, search by name, and save favourites.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search for pasta, chicken, cake..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>

      {categoriesLoading ? (
        <LoadingSpinner />
      ) : categoriesError ? (
        <ErrorMessage message={categoriesError} />
      ) : (
        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      )}

      <div className={styles.infoBar}>
        {submittedSearch ? (
          <p>Showing search results for: {submittedSearch}</p>
        ) : (
          <p>Selected category: {selectedCategory || 'Loading...'}</p>
        )}
      </div>

      {mealsLoading ? (
        <LoadingSpinner />
      ) : mealsError ? (
        <ErrorMessage message={mealsError} />
      ) : meals.length === 0 ? (
        <div className="status-box">No meals found.</div>
      ) : (
        <>
          <div className={styles.grid}>
            {paginatedMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  )
}

export default Home
