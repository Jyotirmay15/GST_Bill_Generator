import React from 'react';
import {
  TextField,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { BuyerDetails } from '../types/bill.types';

interface BuyerFormProps {
  buyer: BuyerDetails;
  onBuyerChange: (buyer: BuyerDetails) => void;
}

const BuyerForm: React.FC<BuyerFormProps> = ({ buyer, onBuyerChange }) => {
  const handleChange = (field: keyof BuyerDetails, value: string) => {
    onBuyerChange({
      ...buyer,
      [field]: value,
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#2196F3', fontWeight: 'bold' }}>
        Buyer Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Company/Customer Name"
            value={buyer.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter buyer name"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Address"
            multiline
            rows={3}
            value={buyer.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Enter complete address"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="GST Number"
            value={buyer.gstNumber}
            onChange={(e) => handleChange('gstNumber', e.target.value)}
            placeholder="Enter GST number"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Phone Number"
            value={buyer.phone}
            type='number'
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter phone number"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Email"
            type="email"
            value={buyer.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter email address"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuyerForm;