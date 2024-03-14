import { products } from './js/db.js';
import express from 'express';

const app = express()
const port = 3000

app.get('/products', (req,res) => {
    res.status(200).json({ products });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})