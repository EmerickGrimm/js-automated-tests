describe('Cart - Update Quantity of Items', () => {
    test('Increase item quantity in the cart', async () => {
      await apiClient.post('/cart/add', { productId: '12345', quantity: 1 });
      const response = await apiClient.put('/cart/update', { productId: '12345', quantity: 3 });
      expect(response.status).toBe(200);
      expect(response.data.cart.items.find(item => item.productId === '12345').quantity).toBe(3);
    });
  
    test('Decrease item quantity to zero (remove item)', async () => {
      await apiClient.post('/cart/add', { productId: '12345', quantity: 1 });
      const response = await apiClient.put('/cart/update', { productId: '12345', quantity: 0 });
      expect(response.status).toBe(200);
      expect(response.data.cart.items.find(item => item.productId === '12345')).toBeUndefined();
    });
  
    test('Attempt to set a negative quantity', async () => {
      try {
        await apiClient.put('/cart/update', { productId: '12345', quantity: -2 });
      } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.error).toBe('Quantity must be a non-negative number');
      }
    });
  
    test('Set quantity exceeding stock availability', async () => {
      try {
        await apiClient.put('/cart/update', { productId: '12345', quantity: 1000 });
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toBe('Requested quantity exceeds available stock');
      }
    });
  });
  