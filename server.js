import express from 'express';
import { products } from './js/db.js';

const app = express()
const port = 3000

app.get('/products', (req,res) => {
    res.status(200).json({ products });
});

app.get('/products/:productId', (req,res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(`
        <h1>${req.params.productId}</h1>
    `)
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

});
