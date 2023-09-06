import { Button } from "@mui/material";
import {
  GridAddIcon,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React from "react";

export const CustomToolbar = ({handleAdd, btnText}) => {
  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<GridAddIcon />}
        onClick={handleAdd}
        sx={{
          padding: "4px 5px",
          fontSize: "0.6964285714285714rem",
        }}
      >
        {btnText}
      </Button>
      {/* <IconButton size="small">
                <AddIcon/>
                ADD NEW USER
            </IconButton> */}
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};
