describe('Cart - Removing Items', () => {
    test('Remove a single item from the cart', async () => {
      await apiClient.post('/cart/add', { productId: '12345', quantity: 1 });
      const response = await apiClient.delete('/cart/remove', { data: { productId: '12345' } });
      expect(response.status).toBe(200);
      expect(response.data.cart.items.find(item => item.productId === '12345')).toBeUndefined();
    });
  
    test('Remove all items from the cart', async () => {
      await apiClient.post('/cart/add', [{ productId: '12345', quantity: 1 }, { productId: '67890', quantity: 1 }]);
      const response = await apiClient.delete('/cart/clear');
      expect(response.status).toBe(200);
      expect(response.data.cart.items.length).toBe(0);
    });
  
    test('Remove items one by one', async () => {
      await apiClient.post('/cart/add', { productId: '12345', quantity: 1 });
      const response = await apiClient.delete('/cart/remove', { data: { productId: '12345' } });
      expect(response.status).toBe(200);
      expect(response.data.cart.items).toHaveLength(0);
    });
  
    test('Attempt to remove an item not in the cart', async () => {
      try {
        await apiClient.delete('/cart/remove', { data: { productId: 'nonexistent' } });
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toBe('Item not found in the cart');
      }
    });
  });
  