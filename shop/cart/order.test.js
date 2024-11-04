const axios = require('axios');
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

let orderId;

describe('Ordering test', () => {
  test('Creating an order', async () => {
    const response = await apiClient.post('/order/create', {
      cartId: 'cart12345',
      paymentMethod: 'credit_card',
      deliveryAddress: {
        street: '123 Main St',
        city: 'Metropolis',
        postalCode: '54321'
      }
    });
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('orderId');
    orderId = response.data.orderId;
  });

  test('Cheking order status', async () => {
    const response = await apiClient.get(`/order/status/${orderId}`);
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('Pending');
  });

});
