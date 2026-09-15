const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post('/log', (req, res) => {
  console.log('Received:', req.body.text);
  res.json({ ok: true });
});

[3000, 8080, 80, 5000].forEach(port => {
  require('http').createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`Listening on ${port}`);
  }).on('error', () => {});
});
