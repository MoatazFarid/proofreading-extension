// Simple API key storage functions
export async function storeApiKey(apiKey) {
    try {
        return apiKey; // Just return the API key as-is
    } catch (error) {
        console.error('Storage error:', error);
        return null;
    }
}

export async function getApiKey(storedKey) {
    return storedKey; // Return the stored key as-is
}

module.exports = {
    storeApiKey,
    getApiKey
}; 