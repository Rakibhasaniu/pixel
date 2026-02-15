import { useCart } from '../context/CartContext';
import { trackViewContent } from '../utils/pixel';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Track ViewContent event when product is clicked
  const handleProductClick = () => {
    trackViewContent(product);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
