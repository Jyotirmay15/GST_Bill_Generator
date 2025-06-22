import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { BillData } from "../types/bill.types";

interface TaxCalculationTableProps {
  billData: BillData;
}

const TaxCalculationTable: React.FC<TaxCalculationTableProps> = ({
  billData,
}) => {
  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

  if (billData.items.length === 0) {
    return null;
  }

  return (
    <Box className="section" sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: "#2196F3",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd",
          pb: 1,
        }}
        className="section-title"
      >
        Description
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ border: "1px solid #ddd", mb: 2 }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Items
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                HSN/SAC
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Qty/Unit
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Rate (Excl. Tax)
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Rate (Incl. Tax)
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Amount Without Tax
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                CGST
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                SGST
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                Total Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billData.items.map((item, index) => {
              const cgstAmount = (item.amount * item.cgst) / 100;
              const sgstAmount = (item.amount * item.sgst) / 100;
              const totalWithTax = item.amount + cgstAmount + sgstAmount;

              return (
                <TableRow key={item.id}>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    {item.description}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", border: "1px solid #ddd" }}
                  >
                    {item.hsnCode}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", border: "1px solid #ddd" }}
                  >
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "right", border: "1px solid #ddd" }}
                  >
                    {formatCurrency(item.rate)}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "right", border: "1px solid #ddd" }}
                  >
                    {formatCurrency(item.rateWithTax || item.rate * 1.18)}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "right", border: "1px solid #ddd" }}
                  >
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "right", border: "1px solid #ddd" }}
                  >
                    {formatCurrency(cgstAmount)}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "right", border: "1px solid #ddd" }}
                  >
                    {formatCurrency(sgstAmount)}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "right",
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                    }}
                  >
                    {formatCurrency(totalWithTax)}
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Summary Row */}
            <TableRow sx={{ bgcolor: "#e3f2fd" }}>
              <TableCell
                sx={{ fontWeight: "bold", border: "1px solid #ddd" }}
                colSpan={5}
              >
                TOTAL
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                {formatCurrency(billData.subtotal)}
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                {formatCurrency(billData.cgst)}
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                }}
              >
                {formatCurrency(billData.sgst)}
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  bgcolor: "#2196F3",
                  color: "white",
                }}
              >
                {formatCurrency(billData.total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaxCalculationTable;
