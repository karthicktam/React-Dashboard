import styled from "@emotion/styled";
import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import BarChart from "./BarChart";

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.bgcolor} !important`,
  color: theme.palette.primary.deepfir,
  fontWeight: "bold",
  textTransform: "initial",
  boxShadow: "none",
  outline: "none !important",
  ":hover": {
    bgcolor: `${theme.palette.primary.bgcolor} !important`,
    color: theme.palette.primary.deepfir,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

function ModalAction() {
  const [open, setOpen] = React.useState(false);

  const matches = useMediaQuery("(max-width:1024px)");

  const [file, setFile] = useState(null);

  const handleClose = () => {
    if (file) {
      setFile(null);
    }
    setOpen(false);
  };

  return (
    <Box
      style={{ padding: 15, margin: 0 }}
      display="flex"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <h3>Invoices owed to you</h3>
      <StyledButton
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ fontSize: matches && "0.8rem" }}
      >
        New Sales Invoice
      </StyledButton>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Please upload your file
            </Typography>

            {file && <Box>{file}</Box>}
            <input type="file" onChange={(e) => setFile(e.target.value)} />
            <StyledButton variant="contained" onClick={handleClose}>
              Save
            </StyledButton>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

const barData = [
  { label: "older", value: 20 },
  { label: "Jan 01-08", value: 40 },
  { label: "Jan 09-16", value: 70 },
  { label: "Jan 17-24", value: 45 },
  { label: "Jan 25-31", value: 55 },
  { label: "Future", value: 30 },
];

function BarChartSection() {
  return (
    <Box sx={{ bgcolor: "white", height: "100%" }}>
      <ModalAction />
      <hr />
      <BarChart data={barData} />
    </Box>
  );
}

export default BarChartSection;
