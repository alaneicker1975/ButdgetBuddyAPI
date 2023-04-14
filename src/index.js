import express from 'express';
import cors from 'cors';
import './db';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Running!');
});

app.listen(port, () => console.log('Server running on port', port));
