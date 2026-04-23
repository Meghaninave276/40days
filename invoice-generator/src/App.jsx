import { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { PlusIcon, TrashIcon, ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/outline';
import './App.css';

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'INR', symbol: '₹' },
  { code: 'GBP', symbol: '£' },
];

function ItemRow({ item, index, onUpdate, onRemove, currencySymbol }) {
  const updateItem = (field, value) => {
    onUpdate(index, { ...item, [field]: value });
  };

  const total = item.quantity * item.price;

  return (
    <tr>
      <td>
        <input
          type="text"
          value={item.name}
          onChange={(e) => updateItem('name', e.target.value)}
          placeholder="Item name"
          className="item-input"
        />
      </td>
      <td>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateItem('quantity', parseFloat(e.target.value) || 0)}
          min="0"
          className="qty-input"
        />
      </td>
      <td>
        <input
          type="number"
          value={item.price}
          onChange={(e) => updateItem('price', parseFloat(e.target.value) || 0)}
          min="0"
          step="0.01"
          className="price-input"
        />
      </td>
      <td className="total-cell">
        {currencySymbol}{total.toFixed(2)}
      </td>
      <td>
        <button onClick={() => onRemove(index)} className="btn-danger">
          <TrashIcon className="icon-small" />
        </button>
      </td>
    </tr>
  );
}

function App() {
  const [company, setCompany] = useState({ name: 'Veloura Gems', address: '123 Business Stn City, State 12345', email: 'vg@gmail.com', phone: '+1 (555) 123-4567' });
  const [customer, setCustomer] = useState({ name: '', address: '', email: '' });
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([{ id: Date.now(), name: '', quantity: 1, price: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const taxAmount = subtotal * (taxRate / 100);
  const grandTotal = subtotal + taxAmount;

  const addItem = useCallback(() => {
    setItems(prev => [...prev, { id: Date.now(), name: '', quantity: 1, price: 0 }]);
  }, []);

  const updateItem = useCallback((index, updatedItem) => {
    setItems(prev => prev.map((item, i) => i === index ? updatedItem : item));
  }, []);

  const removeItem = useCallback((index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const generatePDF = useCallback(() => {
    const doc = new jsPDF();
    const currencySymbol = currency.symbol;

    let y = 20;
    doc.setFontSize(20);
    doc.text('INVOICE', 20, y);
    y += 15;

    doc.setFontSize(12);
    doc.text(`Invoice #${invoiceNumber || 'N/A'}`, 20, y);
    y += 10;
    doc.text(`Date: ${new Date(invoiceDate).toLocaleDateString()}`, 20, y);
    y += 10;
    if (dueDate) doc.text(`Due: ${new Date(dueDate).toLocaleDateString()}`, 20, y);
    y += 20;

    doc.text('From:', 20, y);
    y += 5;
    doc.text(company.name, 20, y);
    y += 5;
    doc.text(company.address.replace(/\\\\n/g, '\\n'), 20, y);
    y += 10;
    doc.text(company.email, 20, y);
    y += 5;
    doc.text(company.phone, 20, y);
    y += 15;

    doc.text('To:', 100, y);
    y += 5;
    doc.text(customer.name || 'N/A', 100, y);
    y += 10;
    doc.text(customer.address.replace(/\\\\n/g, '\\n'), 100, y);
    y += 10;
    doc.text(customer.email || '', 100, y);
    y += 20;

    doc.text('Description', 20, y);
    doc.text('Qty', 80, y);
    doc.text('Price', 100, y);
    doc.text('Total', 140, y);
    y += 10;

    items.forEach(item => {
      const total = item.quantity * item.price;
      doc.text(item.name || 'N/A', 20, y);
      doc.text(item.quantity.toString(), 80, y);
      doc.text(`${currencySymbol}${item.price.toFixed(2)}`, 100, y);
      doc.text(`${currencySymbol}${total.toFixed(2)}`, 140, y);
      y += 8;
    });

    y += 10;
    doc.text(`Subtotal: ${currencySymbol}${subtotal.toFixed(2)}`, 140, y);
    y += 8;
    doc.text(`Tax (${taxRate}%): ${currencySymbol}${taxAmount.toFixed(2)}`, 140, y);
    y += 8;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Grand Total: ${currencySymbol}${grandTotal.toFixed(2)}`, 140, y);

    doc.save(`invoice-${invoiceNumber || 'temp'}.pdf`);
  }, [company, customer, invoiceNumber, invoiceDate, dueDate, items, currency, subtotal, taxAmount, grandTotal, taxRate]);

  const handlePrint = () => window.print();

  return (
    <>
      <div className="min-h-screen container py-8 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="title mb-4">Invoice Generator</h1>
            <p className="subtitle">
              Create professional invoices with real-time calculations and PDF export
            </p>
          </div>

          <div className="form-grid gap-8">
            <div className="card">
              <h2 className="section-title">
                <PrinterIcon className="icon-large" />
                Company Details
              </h2>
              <div className="input-group">
                <input
                  type="text"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  placeholder="Company Name"
                  className="input-field"
                />
                <input
                  type="text"
                  value={company.address}
                  onChange={(e) => setCompany({ ...company, address: e.target.value })}
                  placeholder="Address"
                  className="input-field"
                />
                <div className="form-grid">
                  <input
                    type="email"
                    value={company.email}
                    onChange={(e) => setCompany({ ...company, email: e.target.value })}
                    placeholder="Email"
                    className="input-field"
                  />
                  <input
                    type="tel"
                    value={company.phone}
                    onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                    placeholder="Phone"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="section-title">Customer Details</h2>
              <div className="input-group">
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Customer Name"
                  className="input-field"
                />
                <input
                  type="text"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Customer Address"
                  className="input-field"
                />
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="Customer Email"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="input-group flex-1 min-w-[200px]">
                <label>Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-group flex-1 min-w-[200px]">
                <label>Invoice Date</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-group flex-1 min-w-[200px]">
                <label>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-end mb-8">
              <div className="input-group flex-1 min-w-[200px]">
                <label>Tax Rate (%)</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                  className="input-field"
                />
              </div>
              <div className="input-group flex-1 min-w-[200px]">
                <label>Currency</label>
                <select
                  value={currency.code}
                  onChange={(e) => setCurrency(CURRENCIES.find((c) => c.code === e.target.value))}
                  className="input-field"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={addItem} className="btn btn-primary">
                <PlusIcon className="icon-small" />
                Add Item
              </button>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      index={index}
                      onUpdate={updateItem}
                      onRemove={removeItem}
                      currencySymbol={currency.symbol}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="totals-section">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>{currency.symbol}{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax ({taxRate}%):</span>
                <span>{currency.symbol}{taxAmount.toFixed(2)}</span>
              </div>
              <div className="grand-total-row">
                <span>Grand Total:</span>
                <span>{currency.symbol}{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="button-group">
              <button onClick={handlePrint} className="btn btn-secondary">
                <PrinterIcon className="icon-small" />
                Print
              </button>
              <button onClick={generatePDF} className="btn btn-primary" disabled={grandTotal === 0}>
                <ArrowDownTrayIcon className="icon-small" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

