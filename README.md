# Text Improver Chrome Extension

A Chrome extension that uses OpenAI's GPT-3.5 to enhance text with multiple improvement options.

## Features

- Multiple text enhancement options:
  - ✨ Improve Text - Enhances writing while maintaining meaning
  - 📨 Convert to E-mail - Transforms text into professional email format
  - 📝 Proofread Only - Corrects grammar, spelling, and punctuation
  - 🔄 Translate to Arabic - Translates text to Arabic
  - 🔄 Translate to English - Translates text to English
- OpenAI GPT-3.5 Turbo powered text enhancement
- Interactive floating tooltip interface:
  - Draggable positioning
  - Copy to clipboard
  - Replace original text
  - Color-coded actions
- Secure API key storage
- Customizable prompts for each action
- Rate limiting to prevent excessive API usage
- Floating, draggable tooltip interface
- Copy to clipboard functionality
- Replace original text option
- Dark mode support
- Responsive and accessible design

## About

Developed by [Moataz Farid](https://linkedin.com/in/moatazfarid). This extension aims to provide a seamless text enhancement experience using the power of OpenAI's GPT models.

## Installation

### For Users

1. Download the latest release from the releases page
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the downloaded extension folder
5. Configure your OpenAI API key in the extension options
6. Optionally customize the prompts for each action

### For Developers

```bash
# Clone the repository
git clone https://github.com/MoatazFarid/text-improver-extension

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
4. Customize prompts if desired
5. Click Save

### Default Prompts

The extension comes with carefully crafted default prompts for each action:
- **Improve Text**: Enhances text while maintaining original meaning
- **Email Conversion**: Transforms text into professional email format
- **Proofreading**: Focuses on grammar, spelling, and punctuation
- **Translation**: Maintains tone and meaning during translation

You can customize these prompts in the options page to better suit your needs.

## Usage

1. Select any text on a webpage
2. Right-click and hover over "Text Improver"
3. Choose from available options:
  - "Improve Text" for general enhancement
  - "Convert to E-mail" for professional email format
  - "Proofread Only" for grammar and spelling
  - "Translate to Arabic" for English to Arabic translation
  - "Translate to English" for Arabic to English translation
4. A tooltip will appear with the improved text
5. You can:
    - Copy the improved text to clipboard
    - Replace the original text with the improved version
    - Drag the tooltip to a different position
    - Close the tooltip when done

Each action has its own color-coded indicator for easy identification:
- 🟢 Green: Text Improvement
- 🔵 Blue: Email Conversion
- 🟠 Orange: Proofreading
- 🟣 Purple: Translation

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
├── styles/         # Shared styles
│   └── tooltip.css
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
- Modern CSS with animations and transitions
- Responsive design with dark mode support
- Drag and drop functionality
- Clipboard API integration

## Security

- API keys are stored securely in Chrome's storage
- No data is stored except the last improvement
- All communication with OpenAI is done via HTTPS
- Content script runs in isolated world
- CSP compliant
- No external dependencies for UI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b MoatazFarid/text-improver-extension`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin MoatazFarid/text-improver-extension`)
5. Open a Pull Request

## Browser Support

- Chrome 88+
- Edge 88+ (Chromium-based)
- Opera 74+
- Brave

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

## Roadmap

- [ ] Multiple language support
- [ ] Custom styling options
- [ ] Keyboard shortcuts
- [ ] History of improvements
- [ ] Export/import settings
- [ ] Additional text enhancement options:
  - [ ] Summarize text
  - [ ] Change tone (formal/casual)
  - [ ] Convert to different formats
  - [ ] Custom prompts
- [ ] Language detection
- [ ] Batch processing
- [ ] Context-aware improvements