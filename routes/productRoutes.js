const express = require('express');
const product = require('../models/product');

const router = express.Router();

router.get('/', async (req, res) => {
    const { sort, keyword, category, brand, priceValue } = req.query;
    let sortBy = {};
    let query = {};
    // console.log(req.query)

    switch (sort) {
        case 'highToLow':
            sortBy = { price: -1 };
            break;
        case 'lowToHigh':
            sortBy = { price: 1 };
            break;
        case 'newestFirst':
            sortBy = { creation_date: -1 };
            break;
    }

    if (keyword) {
        query.phone_name = { $regex: keyword, $options: 'i' };
    }

    if (category) {
        query['category.name'] = category;
    }
    console.log(priceValue);

    if (brand) {
        query.brand = brand;
    }

    if (priceValue) {
        // Ensure priceValue is an array and contains exactly two elements
        const prices = Array.isArray(priceValue) ? priceValue.map(Number) : [];
        if (prices.length === 2 && !isNaN(prices[0]) && !isNaN(prices[1])) {
            const [minPrice, maxPrice] = prices;
            query.price = { $gte: minPrice, $lte: maxPrice };
        }
    }

    try {
        const products = await product.find(query).sort(sortBy);
        res.send(products);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch products' });
    }
})


module.exports = router;