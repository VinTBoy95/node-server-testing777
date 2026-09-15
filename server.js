const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/log', (req, res) => {
  console.log('Received:', req.body.text);
  res.json({ ok: true });
});

[3000, 8080, 80, 5000].forEach(port => {
  const server = require('http').createServer(app);
  server.listen(port, '0.0.0.0', () => console.log(`Also listening on ${port}`))
    .on('error', () => {}); // ignore if port unavailable
});
