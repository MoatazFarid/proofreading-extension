const DEBUG = true;

export const log = (...args) => {
    if (DEBUG) {
        console.log('[Text Improver]', ...args);
    }
};

export const error = (...args) => {
    if (DEBUG) {
        console.error('[Text Improver]', ...args);
    }
};

export const warn = (...args) => {
    if (DEBUG) {
        console.warn('[Text Improver]', ...args);
    }
}; 