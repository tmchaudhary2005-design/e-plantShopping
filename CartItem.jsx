import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      {cartItems.map(item => (
        <div key={item.name} className="cart-item">
          <img src={item.thumbnail} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Unit Price: ${item.price}</p>
            <p>Subtotal: ${item.price * item.quantity}</p>
            <button onClick={() => handleDecrement(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrement(item)}>+</button>
            <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
          </div>
        </div>
      ))}

      <button onClick={onContinueShopping}>Continue Shopping</button>
      <button onClick={() => alert('Coming Soon')}>Checkout</button>
    </div>
  );
};

export default CartItem;
