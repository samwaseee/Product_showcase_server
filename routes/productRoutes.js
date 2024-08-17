const express = require('express');
const product = require('../models/product');

const router = express.Router();

router.get('/', async (req, res) => {
    const { sort, keyword, category, brand, priceValue, page = 0, rowsPerPage = 10 } = req.query;
    let sortBy = {};
    let query = {};
    let pageNumber = parseInt(page, 10);
    let limit = parseInt(rowsPerPage, 10);

    // Ensure page and rowsPerPage are numbers and not negative
    if (isNaN(pageNumber) || pageNumber < 0) pageNumber = 0;
    if (isNaN(limit) || limit <= 0) limit = 10;

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
        // Fetch paginated results
        const products = await product.find(query)
            .sort(sortBy)
            .skip(pageNumber * limit)
            .limit(limit);

        // Count the total number of documents that match the query
        const totalCount = await product.countDocuments(query);

        // Send paginated results and total count
        res.send({ products, totalCount });
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch products' });
    }
});



module.exports = router;