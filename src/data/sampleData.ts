// Sample data for development and testing
import { Receipt } from '../types/receipt';
import { Invoice } from '../types/invoice';

export const sampleReceiptData: Receipt = {
  durationMin: 120,
  receivingOfficer: "Dr. Sarah Williams",
  receivingOfficerDesignation: "Chief Medical Officer",
  receivingOfficerPhone: "+675 7654 3210",
  transportModes: [1, 2], // Road and Sea
  podNumber: "POD-2024-0456",
  isPodAttached: true,
  isPhoNotified: true,
  totalWeightKg: 2547.50
};

export const sampleInvoiceData: Invoice = {
  invoiceNumber: "INV-2024-0789",
  invoiceDate: new Date().toISOString().split('T')[0],
  totalWeightKg: 2547.50,
  rate: 2.75, // Rate per kg
  gst: 700.56, // 10% GST
  amount: 7706.19 // Total amount including GST
};