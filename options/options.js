console.log('Options script loading...');
import { log, error } from '../utils/debug.js';
import { saveToStorage, loadFromStorage } from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
    log('Options page loaded');
    
    // Get DOM elements
    const apiKeyInput = document.getElementById('apiKey');
    const modelSelect = document.getElementById('model');
    const saveButton = document.getElementById('saveBtn');
    const testButton = document.getElementById('testBtn');
    const statusDiv = document.getElementById('status');

    if (!apiKeyInput || !modelSelect || !saveButton || !testButton || !statusDiv) {
        error('Failed to find required DOM elements');
        return;
    }

    // Load saved settings
    try {
        const result = await loadFromStorage(['apiKey', 'model']);
        if (result.apiKey) {
            apiKeyInput.value = result.apiKey;
            log('API key loaded from storage');
        }
        if (result.model) {
            modelSelect.value = result.model;
            log('Model loaded from storage:', result.model);
        }
    } catch (err) {
        error('Failed to load settings:', err);
    }

    // Save settings
    saveButton.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value.trim();
        const model = modelSelect.value;

        log('Save button clicked', {
            hasApiKey: !!apiKey,
            apiKeyLength: apiKey.length,
            model: model
        });

        if (!apiKey) {
            error('API key is empty');
            statusDiv.textContent = 'API key cannot be empty';
            statusDiv.className = 'error';
            return;
        }

        try {
            // Test API key before saving
            log('Testing API key...');
            const testResponse = await fetch('https://api.openai.com/v1/models', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            log('API test response:', {
                status: testResponse.status,
                ok: testResponse.ok
            });

            if (!testResponse.ok) {
                throw new Error(`Invalid API key (Status: ${testResponse.status})`);
            }

            // Save settings
            await saveToStorage({
                apiKey: apiKey,
                model: model
            });

            statusDiv.textContent = 'Settings saved successfully!';
            statusDiv.className = 'success';

            setTimeout(() => {
                statusDiv.textContent = '';
            }, 3000);

        } catch (err) {
            error('Save failed:', err);
            statusDiv.textContent = `Error: ${err.message}`;
            statusDiv.className = 'error';
        }
    });

    // Test storage
    testButton.addEventListener('click', async () => {
        try {
            const data = await loadFromStorage(['apiKey', 'model']);
            
            log('Current storage contents:', {
                hasApiKey: !!data.apiKey,
                apiKeyLength: data.apiKey?.length,
                model: data.model
            });
            
            statusDiv.textContent = `Storage test: API Key ${data.apiKey ? 'found' : 'not found'}, Model: ${data.model || 'not set'}`;
            statusDiv.className = 'info';
        } catch (err) {
            error('Storage test failed:', err);
            statusDiv.textContent = `Storage test failed: ${err.message}`;
            statusDiv.className = 'error';
        }
    });
}); 