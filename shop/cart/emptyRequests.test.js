describe('Validation - Empty Requests', () => {
    test('Send an empty request to add an item', async () => {
      try {
        await apiClient.post('/cart/add', {});
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toBe('Request body cannot be empty');
      }
    });
  
    test('Send requests with invalid parameters', async () => {
      try {
        await apiClient.post('/cart/add', { productId: '12345', quantity: -1 });
      } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.error).toBe('Quantity must be a positive number');
      }
    });
  });
  