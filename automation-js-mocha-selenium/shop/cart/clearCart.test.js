describe('Cart - Clearing the Cart', () => {
    test('Clear a filled cart', async () => {
      await apiClient.post('/cart/add', { productId: '12345', quantity: 1 });
      const response = await apiClient.delete('/cart/clear');
      expect(response.status).toBe(200);
      expect(response.data.cart.items.length).toBe(0);
    });
  
    test('Clear an empty cart', async () => {
      const response = await apiClient.delete('/cart/clear');
      expect(response.status).toBe(200);
      expect(response.data.cart.items.length).toBe(0);
    });
  });
  