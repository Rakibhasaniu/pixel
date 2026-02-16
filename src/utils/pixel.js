/**
 * Facebook Pixel Integration Module
 *
 * This module handles all Facebook Pixel tracking events.
 * Replace PIXEL_ID with your actual Facebook Pixel ID.
 */

const PIXEL_ID = '1038768000129263';

/**
 * Initialize Facebook Pixel
 * This should be called once when the app loads
 */
export const initPixel = () => {
  if (typeof window === 'undefined') return;

  // Facebook Pixel Code
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );

  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');

  console.log('✅ Facebook Pixel initialized with ID:', PIXEL_ID);
};

/**
 * Track PageView event
 * Fires on every route change
 */
export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
    console.log('📊 FB Pixel: PageView tracked');
  }
};

/**
 * Track ViewContent event
 * Fires when a product is viewed/clicked
 *
 * @param {Object} product - Product object with id, name, price
 */
export const trackViewContent = (product) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: 'USD',
    });
    console.log('📊 FB Pixel: ViewContent tracked for', product.name);
  }
};

/**
 * Track AddToCart event
 * Fires when a product is added to cart
 *
 * @param {Object} product - Product object with id, name, price
 */
export const trackAddToCart = (product) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: 'USD',
    });
    console.log('📊 FB Pixel: AddToCart tracked for', product.name);
  }
};

/**
 * Track RemoveFromCart event
 * Fires when a product is removed from cart
 *
 * @param {Object} product - Product object with id, name, price
 */
export const trackRemoveFromCart = (product) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'RemoveFromCart', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: 'USD',
    });
    console.log('📊 FB Pixel: RemoveFromCart tracked for', product.name);
  }
};

/**
 * Track InitiateCheckout event
 * Fires when user navigates from cart to order page
 *
 * @param {Array} cartItems - Array of cart items
 * @param {Number} totalValue - Total cart value
 */
export const trackInitiateCheckout = (cartItems, totalValue) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const contentIds = cartItems.map(item => item.id);
    const numItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    window.fbq('track', 'InitiateCheckout', {
      content_ids: contentIds,
      content_type: 'product',
      value: totalValue,
      currency: 'USD',
      num_items: numItems,
    });
    console.log('📊 FB Pixel: InitiateCheckout tracked with', numItems, 'items, value:', totalValue);
  }
};

/**
 * Track Purchase event
 * Fires when order is successfully placed
 *
 * @param {Array} cartItems - Array of cart items
 * @param {Number} totalValue - Total purchase value
 * @param {String} orderId - Order ID
 */
export const trackPurchase = (cartItems, totalValue, orderId) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const contentIds = cartItems.map(item => item.id);
    const numItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    window.fbq('track', 'Purchase', {
      content_ids: contentIds,
      content_type: 'product',
      value: totalValue,
      currency: 'USD',
      num_items: numItems,
    });
    console.log('📊 FB Pixel: Purchase tracked - Order ID:', orderId, ', Value:', totalValue);
  }
};
