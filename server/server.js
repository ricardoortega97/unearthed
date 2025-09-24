import express from 'express'
const app = express();
import router from './routes/gifts.js';

app.use('/public', express.static('./public'));
app.use('/scripts', express.static('./public/scripts'));

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>')
});

const PORT = 3001 || process.env.port

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
});

app.use('/gifts', router)