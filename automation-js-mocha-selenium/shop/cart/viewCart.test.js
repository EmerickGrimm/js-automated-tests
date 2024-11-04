describe('Cart - Viewing Cart Contents', () => {
    test('Verify correct display of items', async () => {
      await apiClient.post('/cart/add', { productId: '12345', quantity: 1 });
      const response = await apiClient.get('/cart');
      expect(response.status).toBe(200);
      expect(response.data.cart.items).toContainEqual(expect.objectContaining({ productId: '12345' }));
    });
  
    test('Verify total amount display', async () => {
      await apiClient.post('/cart/add', { productId: '12345', quantity: 2 });
      const response = await apiClient.get('/cart');
      expect(response.status).toBe(200);
      expect(response.data.cart.total).toBeGreaterThan(0);
    });
  
    test('Check tax and discount display', async () => {
      await apiClient.post('/cart/add', { productId: '67890', quantity: 1 });
      const response = await apiClient.get('/cart');
      expect(response.data.cart).toHaveProperty('taxes');
      expect(response.data.cart).toHaveProperty('discounts');
    });
  });
  