import { jest } from '@jest/globals';
import { setupContextMenu } from '../../background';

describe('Context Menu Tests', () => {
  beforeEach(() => {
    global.chrome = {
      contextMenus: {
        create: jest.fn(),
        onClicked: { addListener: jest.fn() }
      },
      runtime: {
        onInstalled: { addListener: jest.fn() }
      }
    };
  });

  test('should create context menu on installation', () => {
    setupContextMenu();
    expect(chrome.contextMenus.create).toHaveBeenCalledWith({
      id: "improveText",
      title: "Improve Text",
      contexts: ["selection"]
    });
  });
}); 