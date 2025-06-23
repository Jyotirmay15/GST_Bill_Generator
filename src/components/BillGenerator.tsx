import React, { useState, useRef } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
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
import Note from "./Note";
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
    total: 0,
  });

  const calculateTotals = (items: BillItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const cgst = items.reduce(
      (sum, items) => sum + (items.amount * items.cgst) / 100,
      0
    );
    const sgst = items.reduce(
      (sum, items) => sum + (items.amount * items.sgst) / 100,
      0
    );
    const total = subtotal + cgst + sgst;

    return { subtotal, cgst, sgst, total };
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

            subtitle2 {
              font-size: 1rem;
            }
            
            .section {
              margin-bottom: 12px;
            }

            .bill-summary-footer {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-top: 24px;
            }

            .specificSection {
              display: flex;
              justify-content: space-between;
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

            .authorised-signatory {
              margin-top: 30px;
              margin-left: 100px;
            }

            .declaration {
              width: 300px;
            }

            .amount-in-words {
            font-weight: bold;
            }
            
            .section-title {
              font-size: 12px;
              color: #2196F3;
              font-weight: bold;
              margin-bottom: 2px;
              padding-bottom: 4px;
            }

            .declaration-text {
            white-space: pre-line;
            }
            
            .subtitle2 {
              font-size: 12px;
              color: #2196F3;
              font-weight: bold;
            }
            
            .bill-summary-table {
              width: 310px;
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
  const [savedNote, setSavedNote] = useState<string | undefined>(undefined);

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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <Paper
              style={{
                padding: "20px",
                flex: 1,
                maxWidth: "800px",
                minWidth: "300px",
              }}
            >
              <BuyerForm
                buyer={billData.buyer}
                onBuyerChange={handleBuyerChange}
              />
              <ItemForm onAddItem={handleAddItem} />
              <Note setSavedNote={setSavedNote} />
            </Paper>
            <div>
              <BuyerDetails buyer={billData.buyer} />
              <ItemsTable
                items={billData.items}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
              />
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
                  className="invoice-title"
                >
                  Note
                </Typography>
                <Box>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px dashed #ddd",
                      borderRadius: 1,
                      mb: 3,
                    }}
                  >
                    {(savedNote === "" || savedNote === undefined) && (
                      <Typography variant="body1" color="text.secondary">
                        No note added yet. Use the form on the left to add a
                        note
                      </Typography>
                    )}
                    {savedNote && (
                      <Typography sx={{ color: "#333" }}>
                        {savedNote}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
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
            <TaxCalculationTable billData={billData} />
            <BillSummary billData={billData} savedNote={savedNote} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 6,
                fontSize: "13px",
              }}
              className="bill-summary-footer"
            >
              <Box sx={{ maxWidth: 350 }} className="declaration">
                <Typography
                  className="subtitle2"
                  sx={{ fontWeight: "bold", mb: 0.5, color: "#2196F3" }}
                >
                  Terms & Conditions
                </Typography>
                <ol
                  style={{
                    listStyleType: "decimal",
                    paddingLeft: 12,
                    marginBottom: 0,
                  }}
                >
                  <li>
                    <Typography variant="body2" component="span">
                      Our responsibility ceases for shortage, loss, damage or
                      delay after delivery to carrier.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" component="span">
                      All claims should be made by buyer directly with concerned
                      carrier
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" component="span">
                      Goods once sold are not Exchangeable/Returnable.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" component="span">
                      Subject to Gwalior Jurisdiction.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" component="span">
                      E.&.O.E
                    </Typography>
                  </li>
                </ol>
              </Box>
              {/* Authorised Signatory on bottom right */}
              <Box sx={{ textAlign: "right", minWidth: 250 }}>
                <Typography
                  className="subtitle2"
                  sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                  for KAMAL PRAKASH ENTERPRISES
                </Typography>
                <Box sx={{ mt: 6 }} className="authorised-signatory">
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Authorised Signatory
                  </Typography>
                </Box>
              </Box>
            </Box>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default BillGenerator;
