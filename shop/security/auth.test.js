describe('Security - Authentication and Authorization', () => {
    test('Access API without token', async () => {
      try {
        await axios.get('https://api.example.com/cart');
      } catch (error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.error).toBe('Authorization token is required');
      }
    });
  
    test('Use an expired token', async () => {
      const expiredToken = 'expired_token_example';
      try {
        await apiClient.get('/cart', { headers: { Authorization: `Bearer ${expiredToken}` } });
      } catch (error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.error).toBe('Token has expired');
      }
    });
  
    test('Use a token of another user', async () => {
      const anotherUserToken = 'another_user_token_example';
      try {
        await apiClient.get('/cart', { headers: { Authorization: `Bearer ${anotherUserToken}` } });
      } catch (error) {
        expect(error.response.status).toBe(403);
        expect(error.response.data.error).toBe('Access denied');
      }
    });
  });
  