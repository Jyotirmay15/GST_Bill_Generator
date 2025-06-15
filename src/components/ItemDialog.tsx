import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
} from '@mui/material';
import { BillItem } from '../types/bill.types';

interface ItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<BillItem, 'id'>) => void;
  editingItem?: BillItem | null;
}

const units = ['Nos', 'Kg', 'Ltr', 'Mtr', 'Sqft', 'Box', 'Set', 'Pair'];

const ItemDialog: React.FC<ItemDialogProps> = ({ open, onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState({
    description: '',
    hsnCode: '',
    quantity: 1,
    unit: 'Nos',
    rate: 0,
    amount: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingItem) {
      setFormData({
        description: editingItem.description,
        hsnCode: editingItem.hsnCode,
        quantity: editingItem.quantity,
        unit: editingItem.unit,
        rate: editingItem.rate,
        amount: editingItem.amount,
      });
    } else {
      setFormData({
        description: '',
        hsnCode: '',
        quantity: 1,
        unit: 'Nos',
        rate: 0,
        amount: 0,
      });
    }
    setErrors({});
  }, [editingItem, open]);

  useEffect(() => {
    const amount = formData.quantity * formData.rate;
    setFormData(prev => ({ ...prev, amount }));
  }, [formData.quantity, formData.rate]);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.hsnCode.trim()) {
      newErrors.hsnCode = 'HSN/SAC code is required';
    }
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    if (formData.rate <= 0) {
      newErrors.rate = 'Rate must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      description: '',
      hsnCode: '',
      quantity: 1,
      unit: 'Nos',
      rate: 0,
      amount: 0,
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingItem ? 'Edit Item' : 'Add New Item'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Enter item description"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="HSN/SAC Code"
                value={formData.hsnCode}
                onChange={(e) => handleChange('hsnCode', e.target.value)}
                error={!!errors.hsnCode}
                helperText={errors.hsnCode}
                placeholder="Enter HSN/SAC code"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Unit"
                value={formData.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
              >
                {units.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', parseFloat(e.target.value) || 0)}
                error={!!errors.quantity}
                helperText={errors.quantity}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Rate (₹)"
                type="number"
                value={formData.rate}
                onChange={(e) => handleChange('rate', parseFloat(e.target.value) || 0)}
                error={!!errors.rate}
                helperText={errors.rate}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Amount (₹)"
                type="number"
                value={formData.amount.toFixed(2)}
                InputProps={{ readOnly: true }}
                sx={{ bgcolor: '#f5f5f5' }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          sx={{ px: 4 }}
        >
          {editingItem ? 'Update Item' : 'Add Item'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDialog;