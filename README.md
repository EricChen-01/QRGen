# QRGen

A small React + TypeScript web application to create and style QR codes.

Try it here: https://qrgen.ericgchen.com

## Features

- Live QR code preview
- Adjustable size
- Colorable QR Code
- Embed an image or MUI SVG icon in the center (configurable size)
- Download as `png`, `jpeg`, `webp`, or `svg`

## Usage

- Enter the URL or text to encode.
- Adjust styles you want.
- Click Download to save the QR image.

## Development & build
Prerequisites: Node.js (LTS recommended) and `npm`.

Install node packages
```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open the displayed dev URL (usually `http://localhost:5173`).

Build for production:

The following npm commands should not fail. 
```bash
npm run build
npm run preview
```

Github Actions will automatically `build` and `deploy` when PRs are merged into main.