import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import styles from './MealCard.module.css'

function MealCard({ meal }) {
  const { toggleFavourite, isFavourite } = useFavourites()
  const favourite = isFavourite(meal.idMeal)

  return (
    <article className={styles.card}>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className={styles.image}
      />

      <div className={styles.content}>
        <h3>{meal.strMeal}</h3>
        {meal.strCategory && <p>{meal.strCategory}</p>}

        <div className={styles.actions}>
          <Link to={`/meal/${meal.idMeal}`} className={styles.linkButton}>
            View Details
          </Link>

          <button
            className={styles.favouriteButton}
            onClick={() => toggleFavourite(meal)}
          >
            {favourite ? 'Remove' : 'Add Favourite'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default MealCard
