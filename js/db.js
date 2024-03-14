export const products = [
    { id: '1', displayName: 'Product #1', price: 50 }
]

const cartDB = [
    {
        id: 'asd',
        items: [],
        total: {
            formatted: '0.00 DKK',
            value: 0,
        },
    },
];

export const getCartById = async (id) =>
    cartDB.find((item) => item.id === id) || {
        id: '00000000-0000-0000-0000-000000000000',
        items: [],
        total: {
            formatted: '0.00 DKK',
            value: 0,
        },
    };
export const updateLineItem = async (
    cartId,
    { productId, quantity },
) => {
    const cart = cartDB.find((item) => item.id === cartId);
    if (!cart) {
        console.log('cart is not in db');
        return;
    }
    const existingProduct = cart?.items.find((item) => item.sku === productId);
    // add
    if (!existingProduct) {
        const product = productsDB.find((item) => item.sku === productId);
        if (!product) {
            console.log(`No product with id ${productId} in db`);
            return;
        }
        const newLineItem = {
            description: product.description,
            displayName: product.displayName,
            priceBeforeDiscount: {
                formatted: `${product.priceBeforeDiscount}`,
                value: product.priceBeforeDiscount,
            },
            quantity,
            sku: productId,
        };
        cart.items.push(newLineItem);
        const cartTotal = cart.items.reduce((partialSum, item) => partialSum + item.priceBeforeDiscount.value, 0);
        cart.total = {
            formatted: `${cartTotal} DKK`,
            value: cartTotal,
        };
        cartDB[0] = cart;
        return cart;
    }
    // update quantity
    if (existingProduct && quantity > 0) {
        const existingLineItem = cart.items.find((item) => item.sku === productId);
        if (!existingLineItem) {
            console.log(`line item was not found for product with id ${productId}`);
            return;
        }
        const pricePerQuantity = existingLineItem.priceBeforeDiscount.value / existingLineItem.quantity;
        const price = pricePerQuantity * quantity;
        const formatted = `${price}`;
        const newLineItem = {
            ...existingLineItem,
            priceBeforeDiscount: {
                formatted,
                value: price,
            },
            quantity,
        };
        cart.items[cart.items.findIndex((item) => item.sku === productId)] = newLineItem;
        const cartTotal = cart.items.reduce((partialSum, item) => partialSum + item.priceBeforeDiscount.value, 0);
        cart.total = {
            formatted: `${cartTotal} DKK`,
            value: cartTotal,
        };
        cartDB[0] = cart;
        return cart;
    }
    // remove
    cart.items = cart.items.filter((item) => item.sku !== productId);
    cart.total.formatted = '0 DKK';
    cart.total.value = 0;
    cartDB[0] = cart;
    return cart;
};
