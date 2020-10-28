import express from 'express';
import bodyParser from 'body-parser'

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('TS + Express test');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});