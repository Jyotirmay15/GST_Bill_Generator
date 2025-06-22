export interface BillItem {
  id: string;
  description: string;
  hsnCode: string;
  quantity: number;
  unit: string;
  rate: number;
  rateWithTax?: number;
  sgst: number;
  cgst: number;
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
  total: number;
}