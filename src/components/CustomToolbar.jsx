import { FileUploadOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  GridAddIcon,
  GridLoadIcon,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import React from "react";

export const CustomToolbar = ({ handleAdd, btnText, setOpen, handleBack }) => {
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

      {/* <Button 
          color="primary" 
          startIcon={<ArrowBackOutlinedIcon />}
          sx={{
              padding: "4px 5px",
              fontSize: "0.6964285714285714rem"
          }}
          >
          RETURN
      </Button> */}
    </GridToolbarContainer>
  );
};
