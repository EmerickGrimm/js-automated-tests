describe('Security - CSRF Protection Tests', () => {
    test('CSRF protection should prevent unauthorized actions', async () => {
      // Simulate an unauthorized request
      try {
        await apiClient.post('/cart/add', { productId: '12345', quantity: 1 }, { headers: { 'X-CSRF-Token': 'invalid_token' } });
      } catch (error) {
        expect(error.response.status).toBe(403);
        expect(error.response.data.error).toBe('CSRF token is invalid or missing');
      }
    });
  
    test('Valid CSRF token should allow the action', async () => {
      // First, retrieve a valid CSRF token
      const tokenResponse = await apiClient.get('/csrf-token');
      const csrfToken = tokenResponse.data.token;
  
      // Now, attempt to add an item with the valid token
      const response = await apiClient.post('/cart/add', { productId: '12345', quantity: 1 }, { headers: { 'X-CSRF-Token': csrfToken } });
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.cart.items).toContainEqual(expect.objectContaining({ productId: '12345' }));
    });
  });
  