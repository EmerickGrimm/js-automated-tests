describe('Cart - Applying Coupons and Discounts', () => {
    test('Apply a valid coupon', async () => {
      const response = await apiClient.post('/cart/apply-coupon', { code: 'SAVE10' });
      expect(response.status).toBe(200);
      expect(response.data.cart.discount).toBeGreaterThan(0);
    });
  
    test('Apply an invalid coupon', async () => {
      try {
        await apiClient.post('/cart/apply-coupon', { code: 'INVALID' });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toBe('Invalid coupon code');
      }
    });
  
    test('Apply an expired coupon', async () => {
      try {
        await apiClient.post('/cart/apply-coupon', { code: 'EXPIRED' });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toBe('Coupon has expired');
      }
    });
  });
  