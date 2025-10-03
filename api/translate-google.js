// Simple Node.js Express server for Google Translate API
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import translate from '@vitalets/google-translate-api';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/translate-google', async (req, res) => {
  const { text, target = 'vi' } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: 'Missing "text"' });
  }
  try {
    const result = await translate(text, { to: target });
    return res.json({ ok: true, translated: result.text });
  } catch (e) {
    console.error('[translate-google] Error:', e);
    return res.status(500).json({ error: 'Translate failed', details: String(e) });
  }
});

app.get('/', (req, res) => {
  res.send('Google Translate API backend is running.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Translate backend listening on port ${PORT}`);
});
