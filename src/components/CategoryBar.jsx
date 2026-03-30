import styles from './CategoryBar.module.css'

function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className={styles.bar}>
      {categories.map((category) => (
        <button
          key={category.idCategory}
          className={
            selectedCategory === category.strCategory
              ? `${styles.button} ${styles.active}`
              : styles.button
          }
          onClick={() => onSelectCategory(category.strCategory)}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar
