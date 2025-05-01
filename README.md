# UTS_PEMOGRAMAN_WEB-2

|Nama|NIM|Kelas|Mata Kuliah|
|----|---|-----|------|
|**Wasis Wibisono**|**312310661**|**TI.23.A6**|**Pemrograman Web 2**|
 

 # 1. Pastikan Node.js terinstal di komputer Anda
 ## 2.Buat folder baru untuk aplikasi dan masuk ke folder tersebut
### Buat Server WebSocket: Buat file server menggunakan ws untuk mendengarkan koneksi pada port 3000.**

### server.js
```Javascript
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
```
### Penjelasan:
### Server HTTP: Ketika klien mengunjungi http://localhost:3000, server HTTP akan mengirimkan file index.html yang berisi halaman web.
### Server WebSocket: Setelah klien terhubung ke WebSocket, komunikasi real-time dapat dimulai. Klien dapat mengirim pesan yang akan diteruskan ke semua klien lainnya yang terhubung.
### Pesan Real-Time: Ketika satu klien mengirimkan pesan, pesan tersebut akan disebarkan ke semua klien yang terhubung, memungkinkan aplikasi untuk berfungsi sebagai aplikasi chat atau aplikasi real-time lainnya.
### Port yang Sama untuk HTTP dan WebSocket: Kedua server (HTTP dan WebSocket) berjalan pada port yang sama (port 3000), sehingga klien dapat terhubung ke kedua protokol ini pada port yang sama.

## 3. Membuat Client WebSocket
### Untuk membuat client yang terhubung ke server WebSocket, kita akan menggunakan HTML dan JavaScript. Client akan menerima pesan dari server dan menampilkannya dalam bentuk notifikasi.

### index.html
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Chat WebSocket Sederhana</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    #chat { list-style: none; padding: 0; }
    #chat li { padding: 5px; border-bottom: 1px solid #ccc; }
  </style>
</head>
<body>
  <h2>Chat Room</h2>
  <input id="msg" type="text" placeholder="Tulis pesan..." />
  <button onclick="send()">Kirim</button>
  <ul id="chat"></ul>

  <script>
    const socket = new WebSocket('ws://' + window.location.host);

    socket.onmessage = function(event) {
      const chat = document.getElementById('chat');
      const li = document.createElement('li');
      li.textContent = event.data;
      chat.appendChild(li);
    };

    function send() {
      const input = document.getElementById('msg');
      if (input.value.trim() !== '') {
        socket.send(input.value);
        input.value = '';
      }
    }
  </script>
</body>
</html>
```
### Penjelasan:

• Client membuka koneksi WebSocket ke server yang berjalan di ws://localhost:3000.

• SSetiap kali menerima pesan dari server, pesan tersebut akan ditambahkan sebagai elemen baru di halaman HTML.

• Client akan mencatat status koneksi, seperti saat terhubung atau terputus.


### Pentingnya WebSocket
### WebSocket adalah protokol komunikasi yang menyediakan saluran komunikasi dua arah antara klien dan server secara real-time. Ini sangat berguna untuk aplikasi yang membutuhkan pembaruan data secara langsung, seperti aplikasi chat, aplikasi notifikasi, atau aplikasi game online.

## 4. Menjalankan Aplikasi
### Untuk menjalankan aplikasi, lakukan langkah-langkah berikut:
### • Buat file server.js dan index.html di direktori yang sama.
### • Jalankan server WebSocket dengan perintah:
```bash
node server.js
```
### • Buka file index.html di browser. Anda akan melihat pesan real-time yang diterima dari server setiap 5 detik.

# Output
