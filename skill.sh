Create a simple, responsive e-commerce demo web app using React (Vite) for Facebook Pixel testing.

Tech:
- React + Vite
- React Router for 3 pages
- Plain CSS (no UI framework)
- localStorage for cart persistence

Pages:
1) Landing page (`/`)
- Show 4–6 products (image, name, price, Add to Cart)
- Product click should trigger content view event

2) Cart page (`/cart`)
- List selected items
- Increase/decrease quantity
- Remove item
- Show subtotal
- “Proceed to Order” button

3) Order page (`/order`)
- Simple checkout form (name, email, phone, address)
- “Place Order” button
- Mock successful order with fake order ID
- Clear cart after success

Facebook Pixel:
- Add Meta Pixel to app using this Pixel ID: {{3904488719768073}}
- Fire events with parameters:
  - `PageView` on every route change
  - `ViewContent` on product view/click
  - `AddToCart` on add action
  - `RemoveFromCart` on remove action
  - `InitiateCheckout` when navigating cart -> order
  - `Purchase` on successful place order
- Include params like: `content_ids`, `content_name`, `value`, `currency`, `num_items`
- Keep all pixel logic in a dedicated module (e.g., `src/utils/pixel.js`)
- Add clear comments where each event is triggered

Behavior requirements:
- Cart count badge in header/navbar
- Block checkout/purchase when cart is empty
- Persist cart across refresh/navigation via localStorage
- Basic validation for checkout form

Project structure:
- Clean folder structure with reusable components
- Example:
  - `src/pages/LandingPage.jsx`
  - `src/pages/CartPage.jsx`
  - `src/pages/OrderPage.jsx`
  - `src/components/ProductCard.jsx`
  - `src/components/Navbar.jsx`
  - `src/context/CartContext.jsx`
  - `src/utils/pixel.js`

Output required:
1) Full folder structure
2) Complete code for all files
3) `README.md` with:
- install/run steps
- where to place Pixel ID
- how to test events in Meta Pixel Helper + Events Manager Test Events
- sample testing flow (visit page -> add cart -> checkout -> purchase)
