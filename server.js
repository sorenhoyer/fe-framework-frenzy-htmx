import express from 'express';
import { getCartById, products, search } from './public/js/db.js';

const app = express()

app.use(express.static('public'))
app.use(express.static('files'))

const port = 3000

app.get('/api/products', (req,res) => {
    res.status(200).json({ products });
});

app.get('/api/search', (req,res) => {
    res.setHeader("Content-Type", "text/html");
    const searchResultsHTML = search.results.map(result => {
        return /*html*/`
        <div hx-boost class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="${result.url}">
                <img src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
                <div class="px-4 py-3 w-72">
                    <span class="text-gray-400 mr-3 uppercase text-xs">${result.model}</span>
                    <p class="text-lg font-bold text-black truncate block capitalize">${result.name}</p>
                    <div class="flex items-center">
                        <p class="text-lg font-semibold text-black cursor-auto my-3">$${result.cost_in_credits}</p>
                        // <del>
                        //     <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                        // </del>
                        <div class="ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                <path
                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `;
    }).join('');

    console.log(searchResultsHTML);

    res.send(
        searchResultsHTML
    )
})

app.get('/api/products/:productId', (req,res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(`
        <h1>${req.params.productId}</h1>
    `)
});

app.get('/api/cart', async (req,res) => {
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
