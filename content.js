console.log('Content script loaded');

// Debug utilities
const DEBUG = true;
const log = (...args) => {
    if (DEBUG) console.log('[Text Improver]', ...args);
};
const error = (...args) => {
    if (DEBUG) console.error('[Text Improver]', ...args);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    log('Content script received message', {
        hasText: !!message.text,
        textLength: message?.text?.length,
        hasApiKey: !!message.apiKey,
        model: message.model
    });
    
    if (message.text) {
        improveText(message, sendResponse);
        return true; // Keep the message channel open
    }
});

async function improveText(message, sendResponse) {
    try {
        log('Preparing API request');
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${message.apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that improves text while maintaining its original meaning."
                    },
                    {
                        role: "user",
                        content: `Please improve this text: ${message.text}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        if (data.choices && data.choices[0]?.message?.content) {
            const improvedText = data.choices[0].message.content.trim();
            await chrome.storage.local.set({
                lastImprovement: {
                    original: message.text,
                    improved: improvedText,
                    timestamp: Date.now()
                }
            });
            log('Improvement stored');
            sendResponse({ 
                improvedText: improvedText,
                status: 'success'
            });
        }
    } catch (err) {
        error('Content script error:', err);
        sendResponse({ 
            error: err.message,
            status: 'error'
        });
    }
} 