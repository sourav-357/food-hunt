import { Link } from 'react-router-dom'
import MealCard from '../components/MealCard'
import { useFavourites } from '../context/FavouritesContext'
import styles from './Favourites.module.css'

function Favourites() {
  const { favourites } = useFavourites()

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Your favourite meals</h1>
        <p>Meals saved here stay in localStorage even after refresh.</p>
      </div>

      {favourites.length === 0 ? (
        <div className="status-box">
          No favourites yet. <Link to="/">Browse meals</Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {favourites.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favourites
