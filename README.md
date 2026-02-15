# E-Commerce Demo - Facebook Pixel Testing

A simple, responsive e-commerce demo web application built with React (Vite) for testing Facebook Pixel integration. This app demonstrates proper implementation of Meta Pixel events throughout the customer journey.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📋 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar with cart count badge
│   │   └── ProductCard.jsx      # Reusable product card component
│   ├── context/
│   │   └── CartContext.jsx      # Global cart state management
│   ├── pages/
│   │   ├── LandingPage.jsx      # Home page with product listing
│   │   ├── CartPage.jsx         # Shopping cart page
│   │   └── OrderPage.jsx        # Checkout and order confirmation
│   ├── utils/
│   │   ├── pixel.js             # Facebook Pixel integration module
│   │   └── products.js          # Sample product data
│   ├── App.jsx                  # Main app component with routing
│   ├── App.css                  # Global styles
│   └── main.jsx                 # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Facebook Pixel Configuration

### Setting Your Pixel ID

1. Open `src/utils/pixel.js`
2. Locate the `PIXEL_ID` constant at the top of the file:
```javascript
const PIXEL_ID = '3904488719768073';
```
3. Replace with your actual Facebook Pixel ID

### Pixel Events Implemented

The application tracks the following Facebook Pixel events:

| Event | Trigger | Location | Parameters |
|-------|---------|----------|------------|
| **PageView** | Every route change | `src/App.jsx` | None |
| **ViewContent** | Product click/view | `src/components/ProductCard.jsx` | `content_ids`, `content_name`, `value`, `currency` |
| **AddToCart** | Add to cart button | `src/context/CartContext.jsx` | `content_ids`, `content_name`, `value`, `currency` |
| **RemoveFromCart** | Remove item from cart | `src/context/CartContext.jsx` | `content_ids`, `content_name`, `value`, `currency` |
| **InitiateCheckout** | Navigate cart → order | `src/pages/CartPage.jsx` | `content_ids`, `value`, `currency`, `num_items` |
| **Purchase** | Place order success | `src/pages/OrderPage.jsx` | `content_ids`, `value`, `currency`, `num_items` |

## 🧪 Testing Facebook Pixel Events

### Method 1: Meta Pixel Helper (Chrome Extension)

1. **Install the Extension**
   - Go to [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
   - Click "Add to Chrome"

2. **Test Your Events**
   - Start your development server
   - Open your app in Chrome
   - Click the Meta Pixel Helper icon in your browser toolbar
   - You should see a green icon with the number of pixels detected
   - Click the icon to see event details

3. **What to Look For**
   - ✅ Green icon = Pixel is working correctly
   - ⚠️ Yellow icon = Warnings (still works, but check for issues)
   - ❌ Red icon = Errors (pixel not working)

### Method 2: Events Manager Test Events

1. **Access Test Events**
   - Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
   - Select your Pixel
   - Click on "Test Events" in the left sidebar

2. **Start Testing**
   - Open your app in a browser
   - In Events Manager, click "Open Website" and enter your development URL
   - Alternatively, use the "Test Browser Events" option

3. **Monitor Events in Real-Time**
   - As you interact with your app, events will appear in real-time
   - Click on each event to see detailed parameters
   - Verify that all parameters are being sent correctly

### Method 3: Browser Console

- Open browser DevTools (F12)
- Check the Console tab for log messages:
  ```
  ✅ Facebook Pixel initialized with ID: 3904488719768073
  📊 FB Pixel: PageView tracked
  📊 FB Pixel: ViewContent tracked for Wireless Headphones
  📊 FB Pixel: AddToCart tracked for Wireless Headphones
  ```

## 🧭 Sample Testing Flow

Follow this step-by-step flow to test all Facebook Pixel events:

### 1. Initial Page Load
- **Action**: Open the app homepage
- **Expected Event**: `PageView`
- **Verification**: Check Meta Pixel Helper or Events Manager

### 2. View Product
- **Action**: Click on any product card on the landing page
- **Expected Event**: `ViewContent`
- **Verification**: Event should include product ID, name, and price

### 3. Add to Cart
- **Action**: Click "Add to Cart" button on a product
- **Expected Event**: `AddToCart`
- **Verification**:
  - Cart badge in navbar should increment
  - Event should include product details

### 4. Navigate to Cart
- **Action**: Click "Cart" in the navigation
- **Expected Event**: `PageView`
- **Verification**: Cart page should display added items

### 5. Modify Cart (Optional)
- **Action**: Change quantity or remove items
- **Expected Event**: `RemoveFromCart` (if removed)
- **Verification**: Cart updates accordingly

### 6. Proceed to Checkout
- **Action**: Click "Proceed to Order" button
- **Expected Events**:
  - `InitiateCheckout` - when navigating to order page
  - `PageView` - for the order page
- **Verification**:
  - Order page loads with checkout form
  - InitiateCheckout includes all cart items and total value

### 7. Place Order
- **Action**: Fill out checkout form and click "Place Order"
- **Expected Event**: `Purchase`
- **Verification**:
  - Success message with order ID appears
  - Purchase event includes order details
  - Cart is cleared (badge shows 0)

### 8. Return to Shopping
- **Action**: Click "Continue Shopping"
- **Expected Event**: `PageView`
- **Verification**: Returns to homepage with empty cart

## 📊 Event Parameters Reference

### ViewContent & AddToCart & RemoveFromCart
```javascript
{
  content_ids: ['prod_001'],
  content_name: 'Wireless Headphones',
  content_type: 'product',
  value: 79.99,
  currency: 'USD'
}
```

### InitiateCheckout & Purchase
```javascript
{
  content_ids: ['prod_001', 'prod_002'],
  content_type: 'product',
  value: 279.98,
  currency: 'USD',
  num_items: 2
}
```

## ✨ Features

- ✅ **3 Pages**: Landing, Cart, Order
- ✅ **Product Catalog**: 6 sample products with images
- ✅ **Shopping Cart**: Add, remove, update quantities
- ✅ **Cart Persistence**: Uses localStorage to persist across refreshes
- ✅ **Cart Badge**: Shows item count in navigation
- ✅ **Form Validation**: Basic validation on checkout form
- ✅ **Empty Cart Protection**: Blocks checkout when cart is empty
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **Facebook Pixel**: Complete event tracking throughout the funnel

## 🔍 Troubleshooting

### Pixel Not Firing
1. Check browser console for errors
2. Verify Pixel ID is correct in `src/utils/pixel.js`
3. Ensure ad blockers are disabled
4. Clear browser cache and reload

### Events Not Showing in Events Manager
1. Wait 20-30 seconds for events to appear
2. Refresh the Test Events page
3. Verify you're looking at the correct Pixel ID
4. Check that your browser allows third-party cookies

### Cart Not Persisting
1. Check browser localStorage is enabled
2. Clear localStorage: `localStorage.clear()`
3. Check browser console for errors

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Context API** - State management
- **localStorage** - Cart persistence
- **Plain CSS** - Styling (no frameworks)
- **Facebook Pixel** - Event tracking

## 📝 Notes

- This is a **demo application** for testing purposes only
- Product images are from Unsplash (free stock photos)
- No actual payment processing is implemented
- Cart data is stored locally in the browser
- All Facebook Pixel events are logged to the browser console for debugging

## 🤝 Support

For issues with:
- **This app**: Check the code comments and console logs
- **Facebook Pixel**: Visit [Meta Business Help Center](https://www.facebook.com/business/help)
- **Pixel Helper**: Check the [official documentation](https://www.facebook.com/business/help/742478679120153)

## 📄 License

This is a demo project for educational purposes. Feel free to use and modify as needed.

---

**Happy Testing! 🎉**
