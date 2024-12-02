const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const sizes = [16, 48, 128];
const iconDir = path.join(__dirname, '..', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir);
}

// Generate icons
sizes.forEach(size => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Draw a simple icon (green square with "TI" text)
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size/2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TI', size/2, size/2);

    // Save the icon
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(iconDir, `icon${size}.png`), buffer);
}); 