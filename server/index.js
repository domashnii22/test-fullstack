const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/product.routes');
const categoryRouter = require('./routes/category.routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api', productRouter);
app.use('/api', categoryRouter);

app.listen(PORT);
