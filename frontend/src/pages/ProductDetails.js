import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1); // To handle quantity selection

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setSelectedSize(response.data.sizes ? response.data.sizes[0].size : ''); // Default size to first available size
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleBuyNow = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please log in to continue');
      navigate('/login'); // Redirect to login page
    } else {
        if (!selectedSize) {
            alert('Please select a size!');
            return;
          }
      
          // Find selected size and quantity
          const selectedProduct = { ...product, selectedSize, quantity };
          dispatch({
            type: 'ADD_TO_CART',
            payload: selectedProduct,
          });
      navigate('/checkout'); // Proceed to checkout if authenticated
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size!');
      return;
    }

    // Find selected size and quantity
    const selectedProduct = { ...product, selectedSize, quantity };
    dispatch({
      type: 'ADD_TO_CART',
      payload: selectedProduct,
    });

    alert('Added to Cart!');
  };

  // Update the selected size when the user selects a new one
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  // Handle quantity change
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>

      {/* Size Dropdown */}
      <div>
        <label>Select Size:</label>
        <select value={selectedSize} onChange={handleSizeChange}>
          {product.sizes.map((sizeOption) => (
            <option key={sizeOption.size} value={sizeOption.size}>
              {sizeOption.size} - Available: {sizeOption.quantity}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity Input */}
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default ProductDetails;
