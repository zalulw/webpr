import express from 'express';
import bodyParser from 'body-parser';
import invoiceRoutes from './api/invoices.js';
import sellerRoutes from './api/sellers.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/sellers', sellerRoutes);

app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});