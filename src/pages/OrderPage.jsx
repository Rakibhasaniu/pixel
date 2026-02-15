import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { trackPurchase } from '../utils/pixel';

const OrderPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const cartTotal = getCartTotal();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, phone, address } = formData;

    if (!name.trim()) {
      alert('Please enter your name');
      return false;
    }

    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email');
      return false;
    }

    if (!phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }

    if (!address.trim()) {
      alert('Please enter your address');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Block if cart is empty
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      navigate('/');
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Generate fake order ID
    const newOrderId = 'ORD-' + Date.now();
    setOrderId(newOrderId);

    // Track Purchase event with Facebook Pixel
    trackPurchase(cartItems, cartTotal, newOrderId);

    // Show success message
    setOrderPlaced(true);

    // Clear cart after successful order
    clearCart();
  };

  // Redirect if cart is empty and order not placed
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="order-page">
        <div className="container">
          <div className="empty-cart">
            <p className="empty-cart-message">Your cart is empty</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="order-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">✅</div>
            <h1>Order Placed Successfully!</h1>
            <p className="order-id">Order ID: <strong>{orderId}</strong></p>
            <p className="success-message">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="container">
        <h1>Checkout</h1>

        <div className="order-content">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <h2>Shipping Information</h2>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main St, Apt 4B, New York, NY 10001"
                rows="3"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              Place Order - ${cartTotal.toFixed(2)}
            </button>
          </form>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="order-item-info">
                    <span>{item.name}</span>
                    <span className="order-item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="order-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total:</span>
              <span className="total-amount">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
