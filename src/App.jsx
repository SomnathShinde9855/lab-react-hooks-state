import React, { useState } from 'react'
import ProductList, { sampleProducts } from './components/ProductList'
import DarkModeToggle from './components/DarkModeToggle'
import Cart from './components/Cart'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [category, setCategory] = useState('all')

  const handleToggleDarkMode = () => {
    setDarkMode((previous) => !previous)
  }

  const handleAddToCart = (product) => {
    setCartItems((previousItems) => [...previousItems, product])
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <h1>🛒 Shopping App</h1>
      <p>
        Welcome! Your task is to implement filtering, cart management, and dark
        mode.
      </p>

      <DarkModeToggle darkMode={darkMode} onToggle={handleToggleDarkMode} />

      <div className="filter-row">
        <label htmlFor="category-filter">Filter by Category: </label>
        <select
          id="category-filter"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
        </select>
      </div>

      <ProductList
        products={sampleProducts}
        category={category}
        onAddToCart={handleAddToCart}
      />

      <Cart cartItems={cartItems} />
    </div>
  )
}

export default App
