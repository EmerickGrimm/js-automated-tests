const https = require('https');

describe('Security - SSL/TLS Encryption Verification', () => {
  test('Ensure API uses HTTPS', async () => {
    try {
      const response = await apiClient.get('/health-check'); 
      expect(response.request.res.socket.encrypted).toBe(true); // Check if the connection is encrypted
    } catch (error) {
      throw new Error('Failed to connect over HTTPS');
    }
  });

  test('Check for valid SSL certificate', async () => {
    const url = 'https://api.example.com';
    const agent = new https.Agent({ rejectUnauthorized: true });

    https.get(url, { agent }, (res) => {
      expect(res.socket.authorized).toBe(true); // Verify that the certificate is authorized
      expect(res.statusCode).toBe(200); // Ensure the request is successful
    });
  });
});
