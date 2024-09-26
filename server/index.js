const expess = require('express');
const cors = require('cors');
const productRouter = require('./routes/product.routes');
const categoryRouter = require('./routes/category.routes');

const PORT = process.env.PORT || 3000;

const app = expess();

app.use(cors());

app.use('/api', productRouter);
app.use('/api', categoryRouter);

app.listen(PORT);
