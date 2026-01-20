import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));

const SHOWROOM_BASE = 'https://showroom.eis24.me/c300/api/v4/test';

app.get('/api/meters', async (req, res) => {
  try {
    const response = await axios.get(`${SHOWROOM_BASE}/meters/`, {
      params: req.query,
    });
    res.json(response.data);
  } catch (e) {
    res
      .status(e.response?.status || 500)
      .json(e.response?.data || { error: 'Ошибка' });
  }
});

app.get('/api/areas', async (req, res) => {
  try {
    const ids = req.query.id__in;
    let query = '';

    if (Array.isArray(ids)) {
      query = ids.map((id) => `id__in=${encodeURIComponent(id)}`).join('&');
    } else if (typeof ids === 'string') {
      query = `id__in=${encodeURIComponent(ids)}`;
    }

    const url = `${SHOWROOM_BASE}/areas/?${query}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (e) {
    console.error(e);
    res
      .status(e.response?.status || 500)
      .json(e.response?.data || { error: 'Ошибка' });
  }
});

app.delete('/api/meters/:id', async (req, res) => {
  try {
    const response = await axios.delete(
      `${SHOWROOM_BASE}/meters/${req.params.id}/`
    );
    res.json(response.data || { success: true });
  } catch (e) {
    res
      .status(e.response?.status || 500)
      .json(e.response?.data || { error: 'Ошибка' });
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Порт:${PORT}`);
});
