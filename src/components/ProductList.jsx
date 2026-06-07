import React from 'react'
import ProductCard from './ProductCard'

// Sample product data (for display purposes only)
export const sampleProducts = [
  { id: 1, name: 'Apple', price: '$1.00', category: 'Fruits', inStock: true },
  { id: 2, name: 'Milk', price: '$2.50', category: 'Dairy', inStock: false }
]

const ProductList = ({ products, category, onAddToCart }) => {
  const filteredProducts =
    category === 'all'
      ? products
      : products.filter((product) => product.category === category)

  return (
    <div className="product-list">
      <h2>Available Products</h2>

      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))
      )}
    </div>
  )
}

export default ProductList
