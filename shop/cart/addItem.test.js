const axios = require('axios');
const apiClient = axios.create({ baseURL: 'https://api.example.com', timeout: 5000 });

describe('Cart - Adding Items', () => {
  test('Add a single item to the cart', async () => {
    const response = await apiClient.post('/cart/add', { productId: '12345', quantity: 1 });
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.cart.items).toContainEqual(expect.objectContaining({ productId: '12345' }));
  });

  test('Add multiple items to the cart', async () => {
    const response = await apiClient.post('/cart/add', [
      { productId: '12345', quantity: 2 },
      { productId: '67890', quantity: 1 }
    ]);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.cart.items.length).toBeGreaterThan(1);
  });

  test('Add the same item multiple times (increase quantity)', async () => {
    await apiClient.post('/cart/add', { productId: '12345', quantity: 1 });
    const response = await apiClient.post('/cart/add', { productId: '12345', quantity: 2 });
    expect(response.data.cart.items.find(item => item.productId === '12345').quantity).toBe(3);
  });

  test('Add items with different attributes (e.g., size, color)', async () => {
    const response = await apiClient.post('/cart/add', { productId: '12345', attributes: { size: 'M', color: 'red' } });
    expect(response.status).toBe(200);
    expect(response.data.cart.items).toContainEqual(expect.objectContaining({ attributes: { size: 'M', color: 'red' } }));
  });

  test('Attempt to add out-of-stock items', async () => {
    try {
      await apiClient.post('/cart/add', { productId: '99999', quantity: 1 });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('Product is out of stock');
    }
  });
});
