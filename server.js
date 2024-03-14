import express from 'express';
import { products, search } from './js/db.js';

const app = express()
const port = 3000

app.get('/products', (req,res) => {
    res.status(200).json({ products });
})

app.get('/search', (req,res) => {
    res.setHeader("Content-Type", "text/html");
    const searchResultsHTML = search.results.map(result => {
        return `
        <div class="p-10 ">
            <h3 class="mb-4 text-lg">${result.name}</h3>
            <p>${result.model}</p> 
        </div>
        `;
    }).join('');

    console.log(searchResultsHTML);

    res.send(
        searchResultsHTML
    )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})