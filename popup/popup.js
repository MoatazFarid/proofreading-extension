document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const error = document.getElementById('error');

    loading.style.display = 'block';
    result.style.display = 'none';
    error.style.display = 'none';

    chrome.runtime.onMessage.addListener((message) => {
        console.log('Popup received message:', message);
        loading.style.display = 'none';
        
        if (message.error) {
            error.textContent = message.error;
            error.style.display = 'block';
            result.style.display = 'none';
        } else if (message.improvedText) {
            result.textContent = message.improvedText;
            result.style.display = 'block';
            error.style.display = 'none';
        }
    });
}); 