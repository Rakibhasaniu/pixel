import ProductCard from '../components/ProductCard';
import { products } from '../utils/products';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="container">
        <header className="page-header">
          <h1>Welcome to Our Store</h1>
          <p>Discover amazing products at great prices</p>
        </header>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
