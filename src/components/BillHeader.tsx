import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { BillData } from "../types/bill.types";
import companyDetails from "../data/SellerDetails.json";
import BuyerDetails from "./BuyerDetails";

interface BillHeaderProps {
  billData: BillData;
}

const BillHeader: React.FC<BillHeaderProps> = ({ billData }) => {
  return (
    <Box className="section">
      <Box
        className="header"
        sx={{
          textAlign: "center",
          mb: 4,
          pb: 3,
          borderBottom: "2px solid #2196F3",
        }}
      >
        <Typography
          variant="h4"
          className="company-name"
          sx={{ color: "#2196F3", fontWeight: "bold", mb: 1 }}
        >
          {companyDetails.companyName}
        </Typography>
        <Typography
          variant="body1"
          className="company-details"
          sx={{ color: "#666", mb: 1 }}
        >
          {companyDetails.addressLine1}
        </Typography>
        <Typography
          variant="body2"
          className="company-details"
          sx={{ color: "#666", mb: 1 }}
        >
          {companyDetails.addressLine2}
        </Typography>
        <Typography
          variant="body2"
          className="company-details"
          sx={{ color: "#666", mb: 1 }}
        >
          GSTIN: {companyDetails.gstin} | Phone: {companyDetails.phone} | Email:{" "}
          {companyDetails.email}
        </Typography>
        <Typography
          variant="h5"
          sx={{ mt: 2, color: "#2196F3", fontWeight: "bold" }}
        >
          INVOICE
        </Typography>
      </Box>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} md={6}>
          <BuyerDetails buyer={billData.buyer} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#2196F3", fontWeight: "bold" }}
              className="invoice-title"
            >
              Invoice Details
            </Typography>
            <Box sx={{ display: "flex", mb: 1, flexWrap: "nowrap" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", minWidth: "120px" }}
              >
                Invoice No: {billData.billNumber}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", minWidth: "120px" }}
              >
                Date: {new Date(billData.date).toLocaleDateString("en-IN")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mb: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", minWidth: "120px" }}
              >
                Place of Supply: {companyDetails.placeOfSupply}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </div>
    </Box>
  );
};

export default BillHeader;
