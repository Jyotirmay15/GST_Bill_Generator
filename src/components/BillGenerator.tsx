import React, { useState, useRef } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
} from "@mui/material";
import { Print as PrintIcon } from "@mui/icons-material";
import BillHeader from "./BillHeader";
import BuyerDetails from "./BuyerDetails";
import BuyerForm from "./BuyerForm";
import ItemForm from "./ItemForm";
import ItemsTable from "./ItemsTable";
import BillSummary from "./BillSummary";
import TaxCalculationTable from "./TaxCalculationTable";
import CloseIcon from "@mui/icons-material/Close";
import {
  BillItem,
  BillData,
  BuyerDetails as BuyerDetailsType,
} from "../types/bill.types";

const BillGenerator: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [billData, setBillData] = useState<BillData>({
    billNumber: `INV-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    buyer: {
      name: "",
      address: "",
      gstNumber: "",
      phone: "",
      email: "",
    },
    items: [],
    subtotal: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    total: 0,
  });

  const calculateTotals = (items: BillItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const cgst = subtotal * 0.09; // 9% CGST
    const sgst = subtotal * 0.09; // 9% SGST
    const igst = 0; // For intrastate, IGST is 0
    const total = subtotal + cgst + sgst + igst;

    return { subtotal, cgst, sgst, igst, total };
  };

  const handleBuyerChange = (buyer: BuyerDetailsType) => {
    setBillData({
      ...billData,
      buyer,
    });
  };

  const handleAddItem = (item: Omit<BillItem, "id">) => {
    const newItem: BillItem = {
      ...item,
      id: Date.now().toString(),
    };

    const newItems = [...billData.items, newItem];
    const totals = calculateTotals(newItems);

    setBillData({
      ...billData,
      items: newItems,
      ...totals,
    });
  };

  const handleEditItem = (updatedItem: BillItem) => {
    const newItems = billData.items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );

    const totals = calculateTotals(newItems);

    setBillData({
      ...billData,
      items: newItems,
      ...totals,
    });
  };

  const handleDeleteItem = (id: string) => {
    const newItems = billData.items.filter((item) => item.id !== id);
    const totals = calculateTotals(newItems);

    setBillData({
      ...billData,
      items: newItems,
      ...totals,
    });
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>&nbsp;</title>
          <meta charset="utf-8">
          <style>
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
            }
            
            body { 
              font-family: 'Roboto', Arial, sans-serif; 
              font-size: 12px; 
              line-height: 1.4; 
              color: #333; 
              background: white;
            }
            
            .print-container { 
              max-width: 800px; 
              margin: 20px auto; 
              padding: 20px; 
            }
            
            .no-print { 
              display: none !important; 
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
            }
            
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
            .mb-1 { margin-bottom: 4px; }
            .mb-2 { margin-bottom: 8px; }
            .mb-3 { margin-bottom: 12px; }
            .mb-4 { margin-bottom: 16px; }
            .p-2 { padding: 8px; }
            .border { border: 1px solid #ddd; }
            .bg-gray { background-color: #f9f9f9; }
            .text-blue { color: #2196F3; }
            .border-bottom { border-bottom: 2px solid #2196F3; }
            
            .header {
              text-align: center;
              margin-bottom: 16px;
              padding-bottom: 12px;
              border-bottom: 2px solid #2196F3;
            }
            
            .company-name {
              font-size: 24px;
              color: #2196F3;
              font-weight: bold;
              margin-bottom: 4px;
            }
            
            .invoice-title {
              font-size: 1rem;
              color: #2196F3;
              font-weight: bold;
              margin-top: 8px;
            }
            
            .section {
              margin-bottom: 12px;
            }

            .invoice-details {
              width: 50%;
            }
            
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              margin-bottom: 12px;
            }
            
            .info-box {
              border: 1px solid #ddd;
              padding: 8px;
              border-radius: 4px;
              background-color: #f9f9f9;
            }
            
            .section-title {
              font-size: 12px;
              color: #2196F3;
              font-weight: bold;
              margin-bottom: 8px;
              padding-bottom: 4px;
            }
            
            @media print {
              body { margin: 0; }
              .print-container { margin: 0; padding: 15px; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
  };

  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            color="primary"
            fontWeight="bold"
          >
            Invoice Generator
          </Typography>
          <Button
            variant="contained"
            onClick={() => setPreviewOpen(true)}
            disabled={billData.items.length === 0}
            sx={{ px: 3 }}
            className="no-print"
          >
            Preview Bill
          </Button>
        </Box>

        <div>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <Paper style={{ width: "50%", padding: "20px" }}>
              <BuyerForm
                buyer={billData.buyer}
                onBuyerChange={handleBuyerChange}
              />
              <ItemForm onAddItem={handleAddItem} />
            </Paper>
            <div>
              <BuyerDetails buyer={billData.buyer} />
              <ItemsTable
                items={billData.items}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Dialog for Bill Preview */}
      <Dialog
        fullScreen
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        PaperProps={{ sx: { bgcolor: "#fff" } }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setPreviewOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Bill Preview
            </Typography>
            <Button
              color="inherit"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              disabled={billData.items.length === 0}
              className="no-print"
            >
              Print Bill
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: { xs: 1, sm: 4 } }}>
          <div ref={printRef}>
            <BillHeader billData={billData} />
            <BuyerDetails buyer={billData.buyer} />
            <TaxCalculationTable billData={billData} />
            <BillSummary billData={billData} />
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default BillGenerator;
