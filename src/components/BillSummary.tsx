import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { BillData } from "../types/bill.types";
import SellerDetails from "../data/SellerDetails.json";

interface BillSummaryProps {
  billData: BillData;
  savedNote?: string;
}

function numberToWords(num: number): string {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function inWords(n: number): string {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " and " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );
    return (
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + inWords(n % 10000000) : "")
    );
  }

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  let words = "";
  if (rupees > 0) words += inWords(rupees) + " Rupees";
  if (paise > 0) words += (words ? " and " : "") + inWords(paise) + " Paise";
  if (!words) words = "Zero Rupees";
  return words + " Only";
}

const BillSummary: React.FC<BillSummaryProps> = ({ billData, savedNote }) => {
  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}  className="specificSection">
        <div>
          {savedNote != undefined && savedNote.trim() !== "" && (
            <>
              <Typography
                variant="h6"
                sx={{ color: "#2196F3", fontWeight: "bold" }}
                className="section-title"
              >
                Note
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                {savedNote}
              </Typography>
            </>
          )}
          <>
            <Typography
              variant="h6"
              sx={{ color: "#2196F3", fontWeight: "bold" }}
              className="section-title"
            >
              Bank Details
            </Typography>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Account Name: {SellerDetails.BankDetails.name}</span>
              <span>Bank Name: {SellerDetails.BankDetails.bankName}</span>
              <span>Branch: {SellerDetails.BankDetails.branch}</span>
              <span>IFSC Code: {SellerDetails.BankDetails.IFSC}</span>
              <span>Account Number: {SellerDetails.BankDetails.accountNumber}</span>  
            </div>
          </>
        </div>
        <Box sx={{ width: { xs: "100%", md: "500px" } }} className="bill-summary-table">
          <Typography
            variant="h6"
            sx={{ color: "#2196F3", fontWeight: "bold" }}
            className="section-title"
          >
            Bill Summary
          </Typography>
          <Table sx={{ border: "1px solid #ddd" }}>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    bgcolor: "#f5f5f5",
                    border: "1px solid #ddd",
                  }}
                >
                  Subtotal
                </TableCell>
                <TableCell
                  sx={{ textAlign: "right", border: "1px solid #ddd" }}
                >
                  {formatCurrency(billData.subtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    bgcolor: "#f5f5f5",
                    border: "1px solid #ddd",
                  }}
                >
                  CGST {}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "right", border: "1px solid #ddd" }}
                >
                  {formatCurrency(billData.cgst)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    bgcolor: "#f5f5f5",
                    border: "1px solid #ddd",
                  }}
                >
                  SGST {}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "right", border: "1px solid #ddd" }}
                >
                  {formatCurrency(billData.sgst)}
                </TableCell>
              </TableRow>
              <TableRow className="total-row">
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    bgcolor: "#2196F3",
                    color: "white",
                    border: "1px solid #ddd",
                  }}
                >
                  Total Amount
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "right",
                    fontWeight: "bold",
                    bgcolor: "#2196F3",
                    color: "white",
                    border: "1px solid #ddd",
                  }}
                >
                  {formatCurrency(billData.total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography variant="body2" sx={{ mt: 2, fontSize: "16px", fontWeight: "bold" }} className="amount-in-words">
            Amount in Words: {numberToWords(billData.total)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BillSummary;
