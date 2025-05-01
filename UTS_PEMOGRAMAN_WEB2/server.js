const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Buat server HTTP untuk menyajikan file HTML
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'index.html');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading page');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

// Setup server WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client terhubung');

  ws.on('message', (message) => {
    console.log('Pesan diterima: %s', message);

    // Kirim ke semua klien
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client terputus');
  });
});

// Jalankan server di port 3000
server.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
