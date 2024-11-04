describe('Security - SQL Injection Testing', () => {
    test('Attempt SQL Injection in product ID', async () => {
      try {
        await apiClient.post('/cart/add', { productId: '12345 OR 1=1', quantity: 1 });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toBe('Invalid product ID format');
      }
    });
  });
  