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

// Add tooltip functionality
function createTooltip(text, position, action) {
    // Remove any existing tooltip
    removeTooltip();

    const tooltip = document.createElement('div');
    tooltip.className = 'text-improver-tooltip';
    tooltip.setAttribute('data-action', action);
    tooltip.innerHTML = `
        <span class="close">&times;</span>
        <div class="content">${text}</div>
        <div class="actions">
            <button class="copy">Copy to Clipboard</button>
            <button class="replace">Replace Original</button>
        </div>
    `;

    // Position the tooltip
    tooltip.style.left = `${position.x}px`;
    tooltip.style.top = `${position.y}px`;

    // Add event listeners
    tooltip.querySelector('.close').addEventListener('click', removeTooltip);
    tooltip.querySelector('.copy').addEventListener('click', () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                const button = tooltip.querySelector('.copy');
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy to Clipboard';
                }, 2000);
            });
    });

    tooltip.querySelector('.replace').addEventListener('click', () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
            removeTooltip();
        }
    });

    // Make tooltip draggable
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    tooltip.addEventListener('mousedown', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') return;
        isDragging = true;
        initialX = e.clientX - tooltip.offsetLeft;
        initialY = e.clientY - tooltip.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        tooltip.style.left = `${currentX}px`;
        tooltip.style.top = `${currentY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.body.appendChild(tooltip);
}

function removeTooltip() {
    const existingTooltip = document.querySelector('.text-improver-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
}

// Update the improveText function to show the tooltip
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
                        content: message.systemPrompt
                    },
                    {
                        role: "user",
                        content: message.userPrompt
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

            // Get the current selection position
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Show tooltip above the selected text
            createTooltip(improvedText, {
                x: rect.left,
                y: rect.top - 10 // Position above the text
            });

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