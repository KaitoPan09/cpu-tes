import { Download, FileUploadOutlined, Summarize } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  GridAddIcon,
  GridLoadIcon,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import React from "react";

export const CustomToolbar = ({
  handleAdd,
  btnText,
  setOpen,
  handleBack,
  handleGenerateReport,
  handleExport,
  handleMod,
}) => {
  return (
    <GridToolbarContainer>
      {handleAdd && btnText && (
        <Button
          color="primary"
          startIcon={<GridAddIcon />}
          onClick={handleAdd}
          sx={{
            padding: "4px 5px",
            fontSize: "0.833rem",
          }}
        >
          {btnText}
        </Button>
      )}
      {handleMod && btnText && (
        <Button
          color="primary"
          startIcon={<GridLoadIcon />}
          onClick={handleMod}
          sx={{
            padding: "4px 5px",
            fontSize: "0.833rem",
          }}
        >
          {btnText}
        </Button>
      )}
      {handleMod && btnText && (
        <Button
          color="primary"
          startIcon={<GridLoadIcon />}
          onClick={handleMod}
          sx={{
            padding: "4px 5px",
            fontSize: "0.833rem",
          }}
        >
          {btnText}
        </Button>
      )}
      {/* <IconButton size="small">
                <AddIcon/>
                ADD NEW USER
            </IconButton> */}
      {/* <GridToolbarColumnsButton /> */}
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector /> */}
      {setOpen && (
        <Button
          color="primary"
          startIcon={<FileUploadOutlined />}
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            padding: "4px 5px",
            fontSize: "0.833rem",
          }}
        >
          Import Data
        </Button>
      )}
      {handleGenerateReport && (
        <Button
          color="primary"
          startIcon={<Summarize />}
          onClick={handleGenerateReport}
          sx={{
            padding: "4px 5px",
            fontSize: "0.833rem",
          }}
        >
          Generate Report
        </Button>
      )}
      {handleExport && (
        <Button
          color="primary"
          startIcon={<Download />}
          onClick={handleExport}
          sx={{
            padding: "4px 5px",
            fontSize: "0.833rem",
          }}
        >
          Export
        </Button>
      )}

      {handleBack && (
        <Button
          color="primary"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={handleBack}
          sx={{
            padding: "4px 5px",
            fontSize: "0.833rem",
          }}
        >
          Return
        </Button>
      )}
    </GridToolbarContainer>
  );
};
