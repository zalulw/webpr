const express = require('express');
const bodyParser = require('body-parser');
const invoiceRoutes = require('./api/invoices');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});