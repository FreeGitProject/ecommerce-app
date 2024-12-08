import React from "react";
import { useCart } from "../context/CartContext"; // Context for managing cart state
import axios from "axios";

const Checkout = () => {
  const { cart, dispatch } = useCart();

  // Handle order placement
  const handleOrder = async () => {
    try {
      // Calculate the total price of the order
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Send the order data to the server to be saved
      const user = JSON.parse(localStorage.getItem("user")); // Assuming user info is stored in localStorage
      if (!user) {
        alert("Please log in to place an order");
        return;
      }
      // Assuming productDetails is an array of product objects
      const cartItems = cart.map((product) => ({
        productId: product.id,
        size: product.selectedSize,
        quantity: product.quantity,
        price: product.price,
      }));
      const orderData = {
        userId: user.id,
        cartItems: cartItems,
        total: total,
      };

      // Send POST request to save the order
      const response = await axios.post(
        "http://localhost:5000/api/orders/place-order",
        orderData
      );

      // Notify the user and clear the cart if the order was placed successfully
      alert("Order Placed Successfully!");
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // If the cart is empty
  if (cart.length === 0) {
    return (
      <div>
        <h2>Checkout</h2>
        <p>Your cart is empty. Add items to proceed to checkout.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Size: {item.selectedSize}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-actions">
        <button onClick={handleOrder} className="checkout-button">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
