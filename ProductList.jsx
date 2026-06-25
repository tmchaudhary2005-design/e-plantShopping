import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // You must expand this array to have 3 categories and 6 items per category!
  const plantsArray = [
    { category: "Air Purifying", name: "Snake Plant", price: 15, thumbnail: "url" },
    // ... add more plants
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Calculate total items for the navbar
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      {/* Navbar implementation */}
      <nav>
        <ul>
          <li><a href="#" onClick={() => setShowCart(false)}>Plants</a></li>
          <li>
            <a href="#" onClick={() => setShowCart(true)}>
              Cart (Icon: {totalItems})
            </a>
          </li>
        </ul>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((plant, index) => (
            <div key={index} className="product-card">
              <img src={plant.thumbnail} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>${plant.price}</p>
              <button 
                onClick={() => handleAddToCart(plant)}
                disabled={cartItems.some(item => item.name === plant.name)}
              >
                {cartItems.some(item => item.name === plant.name) ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
};

export default ProductList;
