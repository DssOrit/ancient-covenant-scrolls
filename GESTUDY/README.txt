GESTUDY ICON UPLOAD PACK

Upload these files to:
ancient-covenant-scrolls/GESTUDY/

Files:
- icon.png
- icon-180.png
- icon-192.png
- icon-512.png
- apple-touch-icon.png

Tell Claude to wire GESTUDY only, not GreatE.

index.html head:
<link rel="apple-touch-icon" href="./icon-180.png">
<link rel="apple-touch-icon" sizes="180x180" href="./icon-180.png">

manifest.json:
"icons": [
  { "src": "./icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
  { "src": "./icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
]
