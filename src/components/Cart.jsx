import React from 'react'

const Cart = ({ cartItems }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={`${item.id}-${index}`}>{item.name} is in your cart.</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Cart
