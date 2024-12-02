# Text Improver Chrome Extension

A Chrome extension that uses OpenAI's GPT-3.5 to improve selected text while maintaining its original meaning.

## Features

- Right-click menu integration for text improvement
- OpenAI GPT-3.5 Turbo powered text enhancement
- Simple configuration interface
- Secure API key storage
- Rate limiting to prevent excessive API usage

## Installation

### For Users

1. Download the latest release from the releases page
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the downloaded extension folder
5. Configure your OpenAI API key in the extension options

### For Developers

```bash
# Clone the repository
git clone https://github.com/yourusername/text-improver-extension.git

# Navigate to project directory
cd text-improver-extension

# Install dependencies
npm install

# Build the extension
npm run build
```

Then load the `dist` folder as an unpacked extension in Chrome.

## Configuration

1. Click the extension icon in Chrome
2. Go to Options (or right-click the icon and select "Options")
3. Enter your OpenAI API key
4. Click Save

## Usage

1. Select any text on a webpage
2. Right-click the selected text
3. Choose "Improve Text" from the context menu
4. Wait for the improved version to appear

## Development

### Project Structure
```
chrome-extension/
├── manifest.json        # Extension configuration
├── background.js       # Background service worker
├── content.js         # Content script
├── popup/            # Popup UI
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── options/         # Options page
│   ├── options.html
│   ├── options.js
│   └── options.css
├── utils/          # Utility functions
│   ├── debug.js
│   └── storage.js
└── icons/         # Extension icons
```

### Available Scripts

```bash
# Build for development
npm run build

# Build for production
npm run build:prod

# Watch for changes
npm run watch
```

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test:coverage
```

## Technical Details

- Built with Manifest V3
- Uses OpenAI's Chat Completion API
- Implements rate limiting and error handling
- Secure API key storage using Chrome's storage API

## Security

- API keys are stored securely in Chrome's storage
- No data is stored except the last improvement
- All communication with OpenAI is done via HTTPS
- Content script runs in isolated world

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b MoatazFarid/proofreading-extension`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin MoatazFarid/proofreading-extension`)
5. Open a Pull Request

## Requirements

- Node.js 14+
- npm 6+
- Chrome browser
- OpenAI API key

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT API
- Chrome Extensions documentation
- All contributors and users

## Support

For support, please open an issue in the GitHub repository. 