import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite');
db.exec(`CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  issuer TEXT NOT NULL,
  recipient TEXT NOT NULL, 
  invoice_number TEXT NOT NULL UNIQUE,
  invoice_date TEXT NOT NULL,
  fulfillment_date TEXT,
  payment_deadline TEXT,
  total_amount REAL NOT NULL,
  vat_rate REAL NOT NULL
)`);

export function getInvoices() {
  return db.prepare('SELECT * FROM invoices').all();
}

export function getInvoiceById(id) {
  return db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
}

export function createInvoice(issuer, recipient, invoiceNumber, invoiceDate, fulfillmentDate, paymentDeadline, totalAmount, vatRate) {
  return db.prepare('INSERT INTO invoices (issuer, recipient, invoice_number, invoice_date, fulfillment_date, payment_deadline, total_amount, vat_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(issuer, recipient, invoiceNumber, invoiceDate, fulfillmentDate, paymentDeadline, totalAmount, vatRate);
}

export function updateInvoice(id, issuer, recipient, invoiceNumber, invoiceDate, fulfillmentDate, paymentDeadline, totalAmount, vatRate) {
  return db.prepare('UPDATE invoices SET issuer = ?, recipient = ?, invoice_number = ?, invoice_date = ?, fulfillment_date = ?, payment_deadline = ?, total_amount = ?, vat_rate = ? WHERE id = ?')
    .run(issuer, recipient, invoiceNumber, invoiceDate, fulfillmentDate, paymentDeadline, totalAmount, vatRate, id);
}

export function deleteInvoice(id) {
  return db.prepare('DELETE FROM invoices WHERE id = ?').run(id);
}