describe('Security - DoS Attack Resilience', () => {
    test('Prevent excessive requests from a single client', async () => {
      const requests = [];
      const limit = 100; // Example limit
      for (let i = 0; i < limit; i++) {
        requests.push(apiClient.post('/cart/add', { productId: '12345', quantity: 1 }));
      }
      
      try {
        await Promise.all(requests);
      } catch (error) {
        expect(error.response.status).toBe(429); // Too Many Requests
        expect(error.response.data.error).toBe('Too many requests from this client');
      }
    });
  
    test('Verify service availability under stress', async () => {
      const stressTest = async () => {
        const requests = [];
        for (let i = 0; i < 1000; i++) {
          requests.push(apiClient.post('/cart/add', { productId: '12345', quantity: 1 }));
        }
        const responses = await Promise.all(requests);
        expect(responses.every(response => response.status === 200)).toBe(true);
      };
      
      await stressTest();
    });
  });
  