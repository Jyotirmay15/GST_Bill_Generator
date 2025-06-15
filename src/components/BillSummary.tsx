import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { BillData } from '../types/bill.types';

interface BillSummaryProps {
  billData: BillData;
}

const BillSummary: React.FC<BillSummaryProps> = ({ billData }) => {
  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

  return (
    <Box className="section">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Box sx={{ width: { xs: '100%', md: '400px' } }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#2196F3', fontWeight: 'bold' }} className='section-title'>
            Bill Summary
          </Typography>
          <Table sx={{ border: '1px solid #ddd' }}>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', border: '1px solid #ddd' }}>
                  Subtotal
                </TableCell>
                <TableCell sx={{ textAlign: 'right', border: '1px solid #ddd' }}>
                  {formatCurrency(billData.subtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', border: '1px solid #ddd' }}>
                  CGST (9%)
                </TableCell>
                <TableCell sx={{ textAlign: 'right', border: '1px solid #ddd' }}>
                  {formatCurrency(billData.cgst)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5', border: '1px solid #ddd' }}>
                  SGST (9%)
                </TableCell>
                <TableCell sx={{ textAlign: 'right', border: '1px solid #ddd' }}>
                  {formatCurrency(billData.sgst)}
                </TableCell>
              </TableRow>
              <TableRow className="total-row">
                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#2196F3', color: 'white', border: '1px solid #ddd' }}>
                  Total Amount
                </TableCell>
                <TableCell sx={{ textAlign: 'right', fontWeight: 'bold', bgcolor: '#2196F3', color: 'white', border: '1px solid #ddd' }}>
                  {formatCurrency(billData.total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center', fontSize: '11px', color: '#666', '@media print': { mt: 6 } }}>
        <Typography variant="caption" display="block" sx={{ mb: 1 }}>
          This is a Computer Generated Invoice
        </Typography>
      </Box>
    </Box>
  );
};

export default BillSummary;