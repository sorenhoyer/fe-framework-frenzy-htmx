import express from 'express';
import { getCartById, products } from './js/db.js';

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

app.get('/cart', async (req,res) => {
    const cart = await getCartById('asd');

    res.setHeader("Content-Type", "text/html");
    res.send(`
        <div>
          <ul>
            ${
              cart?.items?.map(item => {
                return "<li>{item?.displayName}</li>"
              })
            }
          </ul>
          <div>
            Total: ${cart.total.value}
          </div>
        </div>
    `)
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
