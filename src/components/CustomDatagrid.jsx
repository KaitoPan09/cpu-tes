import { DataGrid } from "@mui/x-data-grid";
import { CustomToolbar } from "./CustomToolbar";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { Box } from "@mui/material";

const CustomDataGrid = ({
  rows,
  columns,
  handleAdd,
  btnText,
  handleRowDoubleClick,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      height="70vh"
      sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": { borderBottom: "none" },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.darkBlue[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        onRowDoubleClick={handleRowDoubleClick}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: { handleAdd: handleAdd, btnText: btnText },
          panel: {
            sx: {
              "& .MuiFormLabel-root": {
                color: `${colors.yellowAccent[300]}`,
              },
              "& .MuiInput-underline:after": {
                borderBottom: `${colors.yellowAccent[300]}`,
              },
              "& .MuiButtonBase-root": {
                color: `${colors.yellowAccent[300]}`,
              },
              "& .Mui-checked+ .MuiSwitch-track": {
                backgroundColor: `${colors.yellowAccent[300]}`,
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default CustomDataGrid;
