import {
  Box,
  Typography,
  useTheme,
  Button,
  DialogContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { dummyYearData } from "../../data/dummyData";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";
import TimerOffOutlinedIcon from "@mui/icons-material/TimerOffOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Header from "../../components/Header";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React, { useState } from "react";
// import React, { useState } from 'react';

const AcademicYear = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //dialogbox
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRowData(params.row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const [rowData, setRowData] = useState(dummyYearData);//
  // const handleStatusToggle = (id) => {
  //     setRowData((prevData) => {
  //       return prevData.map((row) => {
  //         if (row.id === id) {
  //           return {
  //             ...row,
  //             status: row.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
  //           };
  //         }
  //         return row;
  //       });
  //     });
  //   };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "academicYear",
      headerName: "Academic Year",
      flex: 1,
      cellClassName: "yearCell",
    },
    {
      field: "semester",
      headerName: "Semester",
      flex: 1,
      cellClassName: "semesterCell",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="55%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "ACTIVE"
                ? colors.greenAccent[600]
                : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {status === "ACTIVE" && <AlarmOnOutlinedIcon />}
            {status === "INACTIVE" && <TimerOffOutlinedIcon />}
            <Typography colors={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ACADEMIC YEAR" subtitle="Current Active Survey" />
        <Box p="0">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <CreateOutlinedIcon sx={{ mr: "10px" }} />
            New Academic Year
          </Button>
        </Box>
      </Box>
      <Box
        // mt="25px"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .yearCell": { color: colors.yellowAccent[300] },
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
        }}
      >
        <DataGrid
          rows={dummyYearData}
          columns={columns}
          //dialogbox click
          onRowClick={handleRowClick}

          // initialState={{
          //     ...{dummyYearData}.initialState,
          //     pagination: { paginationModel: { pageSize: 7 } },
          //   }}
          //   pageSizeOptions={[7, 10, 25]}
        />

        {/* dialogbox */}
        <Dialog open={openDialog}>
          <DialogTitle>Modify Data</DialogTitle>
          <DialogContent>
            {selectedRowData && (
              <Box>
                <Box>
                  <Typography>Academic Year: </Typography>
                  <input type="text" value={selectedRowData.academicYear} />
                </Box>
                <Box>
                  <Typography>Semester: </Typography>
                  <input type="text" value={selectedRowData.semester} />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => console.log("Data Updated!")}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AcademicYear;
