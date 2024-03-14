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

app.get('/mobile-menu', (req, res) => {
    res.setHeader("Content-Type", "text/html");
/*     const mobileMenuTemplate = `
    <div
    class="sm:hidden"
    id="mobile-menu"
    _="on closeMobileMenu add .closing then wait for animationend then remove me"
><div class="space-y-1 px-2 pb-3 pt-2">
    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
    <a
        href="#"
        class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
        aria-current="page"
        >Frontpage</a
    >
    <a
        href="#"
        class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        >Category</a
    >
</div>
<div class="absolute z-[index: ]-1 inset-0 bg-gray-700" _="on click trigger closeMobileMenu"></div>

</div>
`; */

const dummy = "<p>Hello</p>"
    res.send(dummy);
});
