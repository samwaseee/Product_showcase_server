const express = require('express');
const product = require('../models/product');

const router = express.Router();

router.get('/', async(req,res) =>{
    const { sort, keyword, category } = req.query;
    console.log(req.query)
    const products = await product.find();
    res.send(products);
})


module.exports = router;