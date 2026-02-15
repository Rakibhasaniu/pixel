import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { trackInitiateCheckout } from '../utils/pixel';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const cartTotal = getCartTotal();

  const handleProceedToOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Track InitiateCheckout event when navigating to order page
    trackInitiateCheckout(cartItems, cartTotal);

    navigate('/order');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Shopping Cart</h1>
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

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button
                    className="btn btn-small"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="btn btn-small"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-danger btn-small"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary-content">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span className="subtotal-amount">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-large" onClick={handleProceedToOrder}>
              Proceed to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
