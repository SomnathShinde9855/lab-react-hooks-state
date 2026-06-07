import React from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import ProductCard from '../components/ProductCard'
import styles from '../styles/ProductCard.module.css'

describe('ProductCard', () => {
  const product = {
    id: 1,
    name: 'Apple',
    price: '$1.00',
    inStock: true
  }

  afterEach(() => cleanup())

  test('renders product name, price, and availability status', () => {
    render(<ProductCard product={product} onAddToCart={vi.fn()} />)

    expect(screen.getByText(/Apple/i)).toBeInTheDocument()
    expect(screen.getByText(/Price: \$1.00/i)).toBeInTheDocument()
    expect(screen.getByText(/Status: In Stock/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  test('calls onAddToCart with the product when button is clicked', () => {
    const handleAddToCart = vi.fn()

    render(<ProductCard product={product} onAddToCart={handleAddToCart} />)

    fireEvent.click(screen.getByTestId('product-1'))

    expect(handleAddToCart).toHaveBeenCalledTimes(1)
    expect(handleAddToCart).toHaveBeenCalledWith(product)
  })

  test('applies out-of-stock styling when product is not in stock', () => {
    const outOfStockProduct = { ...product, inStock: false }

    const { container } = render(
      <ProductCard product={outOfStockProduct} onAddToCart={vi.fn()} />
    )

    expect(screen.getByText(/Status: Out of Stock/i)).toBeInTheDocument()
    expect(container.firstChild).toHaveClass(styles.card)
    expect(container.firstChild).toHaveClass(styles.outOfStock)
  })

  test('does not apply out-of-stock styling when product is in stock', () => {
    const { container } = render(
      <ProductCard product={product} onAddToCart={vi.fn()} />
    )

    expect(container.firstChild).toHaveClass(styles.card)
    expect(container.firstChild).not.toHaveClass(styles.outOfStock)
  })
})
