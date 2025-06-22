import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { BillItem } from "../types/bill.types";

import taxRates from "../data/taxRates.json";

interface ItemsTableProps {
  items: BillItem[];
  onEditItem: (item: BillItem) => void;
  onDeleteItem: (id: string) => void;
}

const units = ["Nos", "Kg", "Ltr", "Mtr", "Sqft", "Box", "Set", "Pair"];

const ItemsTable: React.FC<ItemsTableProps> = ({
  items,
  onEditItem,
  onDeleteItem,
}) => {
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    item: BillItem | null;
  }>({
    open: false,
    item: null,
  });
  const [editFormData, setEditFormData] = useState({
    description: "",
    hsnCode: "",
    quantity: 1,
    unit: "Nos",
    rateWithoutTax: 0,
    rateWithTax: 0,
    amount: 0,
  });

  const TAX_PERCENT = taxRates.gst;
  const TAX_MULTIPLIER = 1 + TAX_PERCENT / 100;

  const handleEditClick = (item: BillItem) => {
    setEditFormData({
      description: item.description,
      hsnCode: item.hsnCode,
      quantity: item.quantity,
      unit: item.unit,
      rateWithoutTax: item.rate,
      rateWithTax: item.rateWithTax || item.rate * TAX_MULTIPLIER,
      amount: item.amount,
    });
    setEditDialog({ open: true, item });
  };

  const handleEditChange = (field: string, value: string | number) => {
    const newFormData = { ...editFormData, [field]: value };

    // Auto-calculate rates and amounts
    if (field === "rateWithoutTax") {
      const rateWithoutTax = Number(value);
      const rateWithTax = rateWithoutTax * TAX_MULTIPLIER;
      const amount = newFormData.quantity * rateWithoutTax;
      newFormData.rateWithTax = rateWithTax;
      newFormData.amount = amount;
    } else if (field === "rateWithTax") {
      const rateWithTax = Number(value);
      const rateWithoutTax = rateWithTax / TAX_MULTIPLIER;
      const amount = newFormData.quantity * rateWithoutTax;
      newFormData.rateWithoutTax = rateWithoutTax;
      newFormData.amount = amount;
    } else if (field === "quantity") {
      const amount = Number(value) * newFormData.rateWithoutTax;
      newFormData.amount = amount;
    }

    setEditFormData(newFormData);
  };

  const handleEditSave = () => {
    if (editDialog.item) {
      const updatedItem: BillItem = {
        ...editDialog.item,
        description: editFormData.description,
        hsnCode: editFormData.hsnCode,
        quantity: editFormData.quantity,
        unit: editFormData.unit,
        rate: editFormData.rateWithoutTax,
        rateWithTax: editFormData.rateWithTax,
        amount: editFormData.amount,
      };
      onEditItem(updatedItem);
      setEditDialog({ open: false, item: null });
    }
  };

  if (items.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          border: "1px dashed #ddd",
          borderRadius: 1,
          mb: 3,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No items added yet. Use the form on the left to add items.
        </Typography>
      </Box>
    );
  }

  return (
    <>
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
          className= "section-title"
        >
          Items / Services
        </Typography>
        <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
          <Table className="items-table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid #ddd",
                  }}
                >
                  S.No.
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid #ddd",
                  }}
                >
                  Description
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
                  Qty
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid #ddd",
                  }}
                >
                  Unit
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
                  Amount (with tax)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "1px solid #ddd",
                  }}
                  className="no-print"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell
                    sx={{ textAlign: "center", border: "1px solid #ddd" }}
                  >
                    {index + 1}
                  </TableCell>
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
                    {item.quantity}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", border: "1px solid #ddd" }}
                  >
                    {item.unit}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "right", border: "1px solid #ddd" }}
                  >
                    ₹{item.rate.toFixed(2)}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "right", border: "1px solid #ddd" }}
                  >
                    ₹{item.rateWithTax?.toFixed(2)}
                  </TableCell>

                  <TableCell
                    sx={{ textAlign: "center", border: "1px solid #ddd" }}
                    className="no-print"
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(item)}
                      sx={{ mr: 1, color: "#2196F3" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDeleteItem(item.id)}
                      sx={{ color: "#f44336" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false, item: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={editFormData.description}
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="HSN/SAC Code"
                  value={editFormData.hsnCode}
                  onChange={(e) => handleEditChange("hsnCode", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Unit"
                  value={editFormData.unit}
                  onChange={(e) => handleEditChange("unit", e.target.value)}
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
                  value={editFormData.quantity}
                  onChange={(e) =>
                    handleEditChange(
                      "quantity",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Rate (Without Tax) ₹"
                  type="number"
                  value={editFormData.rateWithoutTax}
                  onChange={(e) =>
                    handleEditChange(
                      "rateWithoutTax",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Rate (With Tax) ₹"
                  type="number"
                  value={editFormData.rateWithTax.toFixed(2)}
                  onChange={(e) =>
                    handleEditChange(
                      "rateWithTax",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount ₹"
                  type="number"
                  value={editFormData.amount.toFixed(2)}
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: "#f5f5f5" }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setEditDialog({ open: false, item: null })}
            color="inherit"
          >
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" sx={{ px: 4 }}>
            Update Item
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemsTable;
