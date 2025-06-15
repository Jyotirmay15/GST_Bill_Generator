import React from "react";
import { Box, Typography } from "@mui/material";
import { BuyerDetails as BuyerDetailsType } from "../types/bill.types";

interface BuyerDetailsProps {
  buyer: BuyerDetailsType;
}

const BuyerDetails: React.FC<BuyerDetailsProps> = ({ buyer }) => {
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
        className="invoice-title"
      >
        Buyer (Bill to)
      </Typography>
      <Box>
        {!buyer.name && (
          <Box
            sx={{
              textAlign: "center",
              p: 4,
              border: "1px dashed #ddd",
              borderRadius: 1,
              mb: 3,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No customer added yet. Use the form on the left to add customer details.
            </Typography>
          </Box>
        )}
        {buyer.name && (
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
          >
            {buyer.name || "Customer Name"}
          </Typography>
        )}
        {buyer.address && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Address:</strong> {buyer.address || "Customer Address"}
          </Typography>
        )}
        {buyer.gstNumber && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>GSTIN/UIN:</strong> {buyer.gstNumber}
          </Typography>
        )}
        {buyer.phone && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Phone:</strong> {buyer.phone}
          </Typography>
        )}
        {buyer.email && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Email:</strong> {buyer.email}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BuyerDetails;
