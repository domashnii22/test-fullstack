const expess = require('express');

const PORT = process.env.PORT || 8080;

const app = expess();

app.listen(PORT, () => console.log('server run'));
