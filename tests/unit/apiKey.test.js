import { encryptApiKey, decryptApiKey, validateApiKey } from '../../background';

describe('API Key Management Tests', () => {
  test('should encrypt and decrypt API key', async () => {
    const apiKey = 'sk-test123456789';
    const encrypted = await encryptApiKey(apiKey);
    const decrypted = await decryptApiKey(encrypted);
    expect(decrypted).toBe(apiKey);
  });
}); 