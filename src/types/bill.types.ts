export interface BillItem {
  id: string;
  description: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  rate: number;
  rateWithTax?: number;
  amount: number;
}

export interface BuyerDetails {
  name: string;
  address: string;
  gstNumber: string;
  phone: string;
  email: string;
}

export interface BillData {
  billNumber: string;
  date: string;
  buyer: BuyerDetails;
  items: BillItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}