describe('Security - XSS Testing', () => {
    test('Attempt XSS attack through product name', async () => {
      try {
        await apiClient.post('/cart/add', { productId: '12345', attributes: { customName: '<script>alert("XSS")</script>' } });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toContain('Invalid input');
      }
    });
  });
  