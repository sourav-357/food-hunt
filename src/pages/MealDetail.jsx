import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useFavourites } from '../context/FavouritesContext'
import useFetch from '../hooks/useFetch'
import { getMealById } from '../services/api'
import styles from './MealDetail.module.css'

function getIngredients(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim())
    }
  }

  return ingredients
}

function MealDetail() {
  const { id } = useParams()
  const { toggleFavourite, isFavourite } = useFavourites()
  const { data, loading, error } = useFetch(() => getMealById(id), [id])

  const meal = data?.meals?.[0]

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!meal) {
    return <div className="status-box">Meal not found.</div>
  }

  const ingredients = getIngredients(meal)

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <div className={styles.card}>
        <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.image} />

        <div className={styles.content}>
          <h1>{meal.strMeal}</h1>
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Country:</strong> {meal.strArea}
          </p>

          <button
            className={styles.actionButton}
            onClick={() => toggleFavourite(meal)}
          >
            {isFavourite(meal.idMeal) ? 'Remove from Favourites' : 'Add to Favourites'}
          </button>

          <div className={styles.section}>
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Instructions</h2>
            <p>{meal.strInstructions}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MealDetail
