# Test Plan for Text Improver Extension

## Overview
This document outlines the test strategy for the Text Improver Chrome Extension.

## Test Structure
Tests are organized in the `/tests` directory:
- `/tests/unit/`
  - `contextMenu.test.js` - Context menu functionality tests
  - `apiKey.test.js` - API key management tests
  - `rateLimiting.test.js` - Rate limiting functionality tests
- `/tests/integration/`
  - `api.test.js` - OpenAI API integration tests
  - `storage.test.js` - Chrome storage integration tests
- `/tests/e2e/`
  - `popup.test.js` - Popup interface tests
  - `options.test.js` - Options page tests

## Test Cases

### 1. Context Menu Tests
### 1.1 Context Menu Creation
- ✓ Context menu should be created on extension installation
- ✓ Menu item should only appear when text is selected
- ✓ Menu item should display "Improve Text" as title

### 1.2 Text Selection
- ✓ Should capture the correct selected text
- ✓ Should handle multi-paragraph selections
- ✓ Should handle special characters
- ✓ Should handle maximum length restrictions

## 2. API Key Management Tests
### 2.1 Storage
- ✓ Should encrypt API key before storage
- ✓ Should successfully decrypt stored API key
- ✓ Should handle invalid API key format
- ✓ Should validate API key before saving

### 2.2 Security
- ✓ Should not store API key in plain text
- ✓ Should handle encryption/decryption failures gracefully
- ✓ Should clear API key when extension is uninstalled

## 3. Rate Limiting Tests
- ✓ Should prevent requests within 1 second of each other
- ✓ Should allow requests after cooldown period
- ✓ Should display appropriate error message during rate limiting

## 4. API Integration Tests
### 4.1 Request Handling
- ✓ Should send correct parameters to OpenAI API
- ✓ Should handle API response correctly
- ✓ Should respect model selection from settings

### 4.2 Error Handling
- ✓ Should handle network errors
- ✓ Should handle API errors
- ✓ Should handle timeout errors
- ✓ Should display user-friendly error messages

## 5. UI Tests
### 5.1 Popup Interface
- ✓ Should display improved text in popup
- ✓ Should show loading state during API calls
- ✓ Should handle long text appropriately
- ✓ Should display error messages when needed

### 5.2 Options Page
- ✓ Should save settings correctly
- ✓ Should load saved settings on page open
- ✓ Should validate input fields
- ✓ Should show success/error messages

## Running Tests

### Prerequisites
- Node.js 14+
- npm 6+
- Chrome browser

### Setup
1. Clone the repository
2. Run `npm install`
3. Configure test environment variables (see `.env.example`)

### Running Tests 
```bash
# Run all tests
npm test
# Run specific test suite
npm test:unit
npm test:integration
npm test:e2e
# Run with coverage
npm test:coverage
```

### Coverage Requirements
- Line coverage: minimum 80%
- Branch coverage: minimum 70%
- Function coverage: minimum 85%
- Statement coverage: minimum 80%

## Manual Testing Checklist

### Pre-release Testing
1. Extension Installation
   - [ ] Clean installation
   - [ ] Upgrade from previous version
   - [ ] Permissions granted correctly

2. Context Menu
   - [ ] Appears with text selection
   - [ ] Doesn't appear without selection
   - [ ] Correct menu text

[... continue with detailed manual testing steps ...]

## Test Reports
Test reports are generated in `/coverage` directory after running tests with coverage.

## Related Documents
- [Test Implementation Details](/tests/README.md)
- [E2E Test Setup Guide](/tests/e2e/README.md)
- [Mock Data Documentation](/tests/mocks/README.md)