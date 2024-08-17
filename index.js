require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const productRoutes = require('./routes/productRoutes')

const PORT = process.env.PORT || 5000;

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ti5xab5.mongodb.net/${process.env.DB_NAME}`;

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const corsOptions = {
    origin: [
        'https://product-showcase-82903.web.app',
        'http://product-showcase-82903.firebaseapp.com'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};


app.use(cors(corsOptions));

app.use('/products', productRoutes);


app.get('/', (req, res) => {
    res.send('SCIC server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
