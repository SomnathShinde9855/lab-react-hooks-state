import React from 'react'
import { describe, expect, jest, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../components/ProductCard'
import styles from '../styles/ProductCard.module.css'

describe('ProductCard', () => {
  const product = {
    id: 1,
    name: 'Apple',
    price: '$1.00',
    inStock: true
  }

  test('renders product name, price, and availability status', () => {
    render(<ProductCard product={product} onAddToCart={jest.fn()} />)

    expect(screen.getByText(/Apple/i)).toBeInTheDocument()
    expect(screen.getByText(/Price: \$1.00/i)).toBeInTheDocument()
    expect(screen.getByText(/Status: In Stock/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  test('calls onAddToCart with the product when button is clicked', () => {
    const handleAddToCart = jest.fn()

    render(<ProductCard product={product} onAddToCart={handleAddToCart} />)

    fireEvent.click(screen.getByTestId('product-1'))

    expect(handleAddToCart).toHaveBeenCalledTimes(1)
    expect(handleAddToCart).toHaveBeenCalledWith(product)
  })

  test('applies out-of-stock styling when product is not in stock', () => {
    const outOfStockProduct = { ...product, inStock: false }

    const { container } = render(
      <ProductCard product={outOfStockProduct} onAddToCart={jest.fn()} />
    )

    expect(screen.getByText(/Status: Out of Stock/i)).toBeInTheDocument()
    expect(container.firstChild).toHaveClass(styles.card)
    expect(container.firstChild).toHaveClass(styles.outOfStock)
  })

  test('does not apply out-of-stock styling when product is in stock', () => {
    const { container } = render(
      <ProductCard product={product} onAddToCart={jest.fn()} />
    )

    expect(container.firstChild).toHaveClass(styles.card)
    expect(container.firstChild).not.toHaveClass(styles.outOfStock)
  })
})
