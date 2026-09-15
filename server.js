const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post('/log', (req, res) => {
  console.log('Received:', req.body.text);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
