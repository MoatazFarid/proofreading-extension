const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];
const iconDir = path.join(__dirname, '..', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir);
}

// Create placeholder icons
sizes.forEach(size => {
    const iconPath = path.join(iconDir, `icon${size}.png`);
    if (!fs.existsSync(iconPath)) {
        // Copy a default icon or create a simple one
        // For now, we'll just create an empty file
        fs.writeFileSync(iconPath, '');
    }
}); 