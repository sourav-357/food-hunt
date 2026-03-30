import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Favourites from './pages/Favourites'
import Home from './pages/Home'
import MealDetail from './pages/MealDetail'

function App() {
  return (
    <div>
      <Navbar />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal/:id" element={<MealDetail />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
