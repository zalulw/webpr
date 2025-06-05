// filepath: c:\Users\06zal\OneDrive\Asztali gép\webpr\bill\public\script.js

document.addEventListener('DOMContentLoaded', () => {
    loadInvoices();
    
    document.getElementById('invoiceForm').addEventListener('submit', createInvoice);
});

async function loadInvoices() {
    const response = await fetch('/api/invoices');
    const invoices = await response.json();
    const invoiceList = document.getElementById('invoiceList');
    invoiceList.innerHTML = '';

    invoices.forEach(invoice => {
        const listItem = document.createElement('li');
        listItem.textContent = `Invoice #${invoice.invoice_number} from ${invoice.issuer} to ${invoice.recipient}`;
        invoiceList.appendChild(listItem);
    });
}

async function createInvoice(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        loadInvoices();
        event.target.reset();
    } else {
        console.error('Failed to create invoice');
    }
}