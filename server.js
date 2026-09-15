const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/log', (req, res) => {
  console.log('Received:', req.body.text);
  res.json({ ok: true });
});

// IMPORTANT: use the platform's assigned PORT, and bind to 0.0.0.0
// This is the #1 cause of "Bad Gateway" on hosts like Infrlo/Render/Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
console.log('ENV DUMP:', JSON.stringify(process.env, null, 2));
