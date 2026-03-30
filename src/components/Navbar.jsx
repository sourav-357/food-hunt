import { NavLink } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import styles from './Navbar.module.css'

function Navbar() {
  const { favourites } = useFavourites()

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>FoodHunt</div>

      <nav className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Favourites
          <span className={styles.badge}>{favourites.length}</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
