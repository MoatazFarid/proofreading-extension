import { jest } from '@jest/globals';

describe('Text Improver Extension', () => {
  beforeEach(() => {
    global.chrome = {
      runtime: {
        onMessage: {
          addListener: jest.fn()
        },
        sendMessage: jest.fn()
      },
      storage: {
        local: {
          get: jest.fn(),
          set: jest.fn()
        }
      },
      contextMenus: {
        create: jest.fn(),
        onClicked: {
          addListener: jest.fn()
        }
      }
    };
  });

  describe('API Key Handling', () => {
    test('should encrypt API key before storage', async () => {
      const apiKey = 'test-key';
      const encrypted = await encryptApiKey(apiKey);
      expect(encrypted).toHaveProperty('encrypted');
      expect(encrypted).toHaveProperty('iv');
      expect(encrypted).toHaveProperty('key');
    });
  });

  describe('Rate Limiting', () => {
    test('should prevent rapid successive calls', async () => {
      // Simulate rapid calls
      const handler = chrome.contextMenus.onClicked.addListener.mock.calls[0][0];
      await handler({ menuItemId: 'improveText', selectionText: 'test' });
      await handler({ menuItemId: 'improveText', selectionText: 'test' });
      
      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
        error: 'RATE_LIMIT'
      });
    });
  });
}); 