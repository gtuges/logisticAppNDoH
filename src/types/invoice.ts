export interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  totalWeightKg: number;
  rate: number;
  gst: number;
  amount: number;
}