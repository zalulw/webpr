import express from 'express';
import { getInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice } from '../models/invoiceModel.js';

const router = express.Router();

router.get('/', (req, res) => {
    const invoices = getInvoices();
    res.json(invoices);
});

router.get('/:id', (req, res) => {
    const invoice = getInvoiceById(req.params.id);
    if (invoice) {
        res.json(invoice);
    } else {
        res.status(404).json({ message: 'Invoice not found' });
    }
});

router.post('/', (req, res) => {
    const { issuer, recipient, invoiceNumber, invoiceDate, fulfillmentDate, paymentDeadline, totalAmount, vatRate } = req.body;
    const newInvoice = createInvoice(issuer, recipient, invoiceNumber, invoiceDate, fulfillmentDate, paymentDeadline, totalAmount, vatRate);
    res.status(201).json(newInvoice);
});

router.put('/:id', (req, res) => {
    const { issuer, recipient, invoiceNumber, invoiceDate, fulfillmentDate, paymentDeadline, totalAmount, vatRate } = req.body;
    const updatedInvoice = updateInvoice(req.params.id, issuer, recipient, invoiceNumber, invoiceDate, fulfillmentDate, paymentDeadline, totalAmount, vatRate);
    if (updatedInvoice) {
        res.json(updatedInvoice);
    } else {
        res.status(404).json({ message: 'Invoice not found' });
    }
});

router.delete('/:id', (req, res) => {
    deleteInvoice(req.params.id);
    res.status(204).send();
});

export default router;