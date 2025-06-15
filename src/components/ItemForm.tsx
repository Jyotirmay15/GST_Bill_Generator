import React, { useState } from "react";
import { TextField, Button, Box, MenuItem, Typography, InputAdornment } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { BillItem } from "../types/bill.types";

interface ItemFormProps {
  onAddItem: (item: Omit<BillItem, "id">) => void;
}

const units = ["Kg", "Ltr", "Mtr", "Sqft", "Bag", "Set", "Pair"];

const ItemForm: React.FC<ItemFormProps> = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    description: "",
    hsnCode: "",
    quantity: 1,
    unit: "Kg",
    rateWithoutTax: 0,
    rateWithTax: 0,
    amount: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | number) => {
    const newFormData = { ...formData, [field]: value };

    // Auto-calculate rates and amounts
    if (field === "rateWithoutTax") {
      const rateWithoutTax = Number(value);
      const rateWithTax = rateWithoutTax * 1.18; // Adding 18% tax
      const amount = newFormData.quantity * rateWithoutTax;
      newFormData.rateWithTax = rateWithTax;
      newFormData.amount = amount;
    } else if (field === "rateWithTax") {
      const rateWithTax = Number(value);
      const rateWithoutTax = rateWithTax / 1.18; // Removing 18% tax
      const amount = newFormData.quantity * rateWithoutTax;
      newFormData.rateWithoutTax = rateWithoutTax;
      newFormData.amount = amount;
    } else if (field === "quantity") {
      const amount = Number(value) * newFormData.rateWithoutTax;
      newFormData.amount = amount;
    }

    setFormData(newFormData);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.hsnCode.trim()) {
      newErrors.hsnCode = "HSN/SAC code is required";
    }
    if (formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }
    if (formData.rateWithoutTax <= 0) {
      newErrors.rateWithoutTax = "Rate must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddItem({
        description: formData.description,
        hsnCode: formData.hsnCode,
        quantity: formData.quantity,
        unit: formData.unit,
        rate: formData.rateWithoutTax,
        rateWithTax: formData.rateWithTax,
        amount: formData.amount,
      });

      // Reset form
      setFormData({
        description: "",
        hsnCode: "",
        quantity: 1,
        unit: "Kg",
        rateWithoutTax: 0,
        rateWithTax: 0,
        amount: 0,
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Typography
        variant="h6"
        sx={{ mb: 3, color: "#2196F3", fontWeight: "bold" }}
      >
        Add Item
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextField
          fullWidth
          size="small"
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
          required
          placeholder="Enter item description"
        />

        <TextField
          fullWidth
          size="small"
          label="HSN/SAC Code"
          value={formData.hsnCode}
          onChange={(e) => handleChange("hsnCode", e.target.value)}
          error={!!errors.hsnCode}
          helperText={errors.hsnCode}
          placeholder="Enter HSN/SAC code"
          required
        />

        <TextField
          fullWidth
          size="small"
          label="Quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) =>
            handleChange("quantity", parseFloat(e.target.value) || 0)
          }
          error={!!errors.quantity}
          required
          helperText={errors.quantity}
          inputProps={{ min: 0, step: 0.01 }}
        />

        <TextField
          fullWidth
          size="small"
          select
          label="Unit"
          value={formData.unit}
          onChange={(e) => handleChange("unit", e.target.value)}
          required
        >
          {units.map((unit) => (
            <MenuItem key={unit} value={unit}>
              {unit}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          size="small"
          label="Rate (Without Tax) ₹"
          type="number"
          value={formData.rateWithoutTax}
          onChange={(e) =>
            handleChange("rateWithoutTax", parseFloat(e.target.value) || 0)
          }
          error={!!errors.rateWithoutTax}
          helperText={errors.rateWithoutTax}
        />

        <TextField
          fullWidth
          size="small"
          label="Rate (With Tax) ₹"
          type="number"
          value={formData.rateWithTax}
          onChange={(e) =>
            handleChange("rateWithTax", parseFloat(e.target.value) || 0)
          }
          helperText="Auto-calculated (18% tax included)"
        />

        <TextField
          fullWidth
          size="small"
          label="Round of Amount without tax ₹"
          type="number"
          value={formData.amount.toFixed(2)}
          InputProps={{ readOnly: true }}
          sx={{ bgcolor: "#f5f5f5" }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mt: 1 }}
        >
          Add Item
        </Button>
      </div>
    </Box>
  );
};

export default ItemForm;
