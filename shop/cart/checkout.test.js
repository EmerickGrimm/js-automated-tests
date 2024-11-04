describe('Cart - Checkout Process', () => {
    test('Successful checkout with correct data', async () => {
      await apiClient.post('/cart/add', { productId: '12345', quantity: 1 });
      const response = await apiClient.post('/checkout', { paymentMethod: 'credit_card', address: '123 Main St' });
      expect(response.status).toBe(200);
      expect(response.data.order.status).toBe('confirmed');
    });
  
    test('Checkout with missing address', async () => {
      try {
        await apiClient.post('/checkout', { paymentMethod: 'credit_card' });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toBe('Address is required');
      }
    });
  
    test('Checkout with invalid payment method', async () => {
      try {
        await apiClient.post('/checkout', { paymentMethod: 'invalid_method', address: '123 Main St' });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toBe('Invalid payment method');
      }
    });
  });
  