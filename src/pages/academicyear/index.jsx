import {
  Box,
  Typography,
  useTheme,
  Button,
  DialogContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
import { useAuth } from "../../context/AuthContext";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormDialog from "../../components/FormDialog";
import useFetch from "../../hooks/useFetch";
// import React, { useState } from 'react';

const AcademicYear = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { academicYear, setAcademicYear } = useAuth();
  const { postData, request } = useFetch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openNewAcadYear, setOpenNewAcadYear] = useState(false);
  const submitNewAcadYear = async (data) => {
    const response = await postData(`/api/academic_years/add`, data);
    if (response) {
      setAcademicYear(response);
    }
  };
  const [openUpdateAcadYear, setOpenUpdateAcadYear] = useState(false);
  const updateAcadYear = (data) => {
    console.log(data);
    setOpenUpdateAcadYear(false);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ACADEMIC YEAR" />
      </Box>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <Typography variant="h4">Current academic year and semester</Typography>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={4} md={2}>
            <Typography variant="h5" color="text.secondary">
              Academic Year:
            </Typography>
          </Grid>
          <Grid item xs={8} md={10}>
            <Typography variant="h5" sx={{ color: colors.yellowAccent[300] }}>
              {academicYear?.year ? academicYear.year : "Not set"}
            </Typography>
          </Grid>
          <Grid item xs={4} md={2}>
            <Typography variant="h5" color="text.secondary">
              Semester:
            </Typography>
          </Grid>
          <Grid item xs={8} md={10}>
            <Typography variant="h5" sx={{ color: colors.yellowAccent[300] }}>
              {academicYear?.semester ? academicYear.semester : "Not set"}
            </Typography>
          </Grid>
          <Grid item xs={4} md={2}>
            <Typography variant="h5" color="text.secondary">
              Start Date:
            </Typography>
          </Grid>
          <Grid item xs={8} md={10}>
            <Typography variant="h5" sx={{ color: colors.yellowAccent[300] }}>
              {academicYear?.start_date ? academicYear.start_date : "Not set"}
            </Typography>
          </Grid>
          <Grid item xs={4} md={2}>
            <Typography variant="h5" color="text.secondary">
              End Date:
            </Typography>
          </Grid>
          <Grid item xs={8} md={10}>
            <Typography variant="h5" sx={{ color: colors.yellowAccent[300] }}>
              {academicYear?.start_date ? academicYear.end_date : "Not set"}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            onClick={() => setOpenNewAcadYear(true)}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              width: "200px",
            }}
          >
            Start a New Academic Year
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => setOpenUpdateAcadYear(true)}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              width: "200px",
            }}
          >
            Update Current Academic Year
          </Button>
        </Grid>
      </Grid>
      <FormDialog
        open={openNewAcadYear}
        setOpen={setOpenNewAcadYear}
        submit={submitNewAcadYear}
        dialogTitle={"New Academic Year"}
        dialogContentText={"Start a new academic year"}
        fields={[
          {
            type: "textField",
            label: "Academic Year",
            name: "acad_year",
          },
          {
            type: "select",
            label: "Semester",
            name: "semester",
            options: ["1st Semester", "2nd Semester", "Summer"],
          },
          {
            type: "date",
            label: "Start Date",
            name: "start_date",
          },
          {
            type: "date",
            label: "End Date",
            name: "end_date",
          },
        ]}
      />
      <FormDialog
        open={openUpdateAcadYear}
        setOpen={setOpenUpdateAcadYear}
        submit={updateAcadYear}
        dialogTitle={"Update Academic Year"}
        dialogContentText={"Update the current academic year"}
        fields={[
          {
            type: "textField",
            label: "Academic Year",
            name: "acad_year",
            defaultValue: academicYear?.year,
          },
          {
            type: "select",
            label: "Semester",
            name: "semester",
            options: ["1st Semester", "2nd Semester", "Summer"],
            defaultValue: academicYear?.semester,
          },
          {
            type: "date",
            label: "Start Date",
            name: "start_date",
            defaultValue: academicYear?.start_date,
          },
          {
            type: "date",
            label: "End Date",
            name: "end_date",
            defaultValue: academicYear?.end_date,
          },
        ]}
      />

      {/* <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <Typography variant="h6">Set the current academic year</Typography>
        </Grid>
        <Grid item>
          <FormControl sx={{ width: "320px" }}>
            <TextField
              id="outlined-basic"
              label="Academic Year"
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ width: "320px" }}>
            <InputLabel>Semester</InputLabel>
            <Select label="Semester">
              <MenuItem value="1st Semester">1st Semester</MenuItem>
              <MenuItem value="2nd Semester">2nd Semester</MenuItem>
              <MenuItem value="Summer">Summer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DesktopDatePicker
                label="Start Date"
                disablePast
                inputFormat="MM/DD/YYYY"
                value={startDate}
                onChange={(newValue) =>
                  setStartDate(dayjs(newValue).format("MM-DD-YYYY"))
                }
                sx={{ width: "320px" }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DesktopDatePicker
                label="End Date"
                disablePast
                inputFormat="MM/DD/YYYY"
                value={endDate}
                onChange={(newValue) =>
                  setEndDate(dayjs(newValue).format("MM-DD-YYYY"))
                }
                sx={{ width: "320px" }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid> */}
    </Box>
  );
  // //dialogbox
  // const [openDialog, setOpenDialog] = useState(false);
  // const [selectedRowData, setSelectedRowData] = useState(null);

  // const handleRowClick = (params) => {
  //   setSelectedRowData(params.row);
  //   setOpenDialog(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

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

  // const columns = [
  //   { field: "id", headerName: "ID" },
  //   {
  //     field: "academicYear",
  //     headerName: "Academic Year",
  //     flex: 1,
  //     cellClassName: "yearCell",
  //   },
  //   {
  //     field: "semester",
  //     headerName: "Semester",
  //     flex: 1,
  //     cellClassName: "semesterCell",
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     flex: 1,
  //     headerAlign: "center",
  //     renderCell: ({ row: { status } }) => {
  //       return (
  //         <Box
  //           width="55%"
  //           m="0 auto"
  //           p="5px"
  //           display="flex"
  //           justifyContent="center"
  //           backgroundColor={
  //             status === "ACTIVE"
  //               ? colors.greenAccent[600]
  //               : colors.redAccent[700]
  //           }
  //           borderRadius="4px"
  //         >
  //           {status === "ACTIVE" && <AlarmOnOutlinedIcon />}
  //           {status === "INACTIVE" && <TimerOffOutlinedIcon />}
  //           <Typography colors={colors.grey[100]} sx={{ ml: "5px" }}>
  //             {status}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  // ];

  // return (
  //   <Box m="20px">
  //     <Box display="flex" justifyContent="space-between" alignItems="center">
  //       <Header title="ACADEMIC YEAR" subtitle="Current Active Survey" />
  //       <Box p="0">
  //         <Button
  //           sx={{
  //             backgroundColor: colors.blueAccent[700],
  //             color: colors.grey[100],
  //             fontSize: "14px",
  //             fontWeight: "bold",
  //             padding: "10px 20px",
  //           }}
  //         >
  //           <CreateOutlinedIcon sx={{ mr: "10px" }} />
  //           New Academic Year
  //         </Button>
  //       </Box>
  //     </Box>
  //     <Box
  //       // mt="25px"
  //       height="70vh"
  //       sx={{
  //         "& .MuiDataGrid-root": { border: "none" },
  //         "& .MuiDataGrid-cell": { borderBottom: "none" },
  //         "& .yearCell": { color: colors.yellowAccent[300] },
  //         "& .MuiDataGrid-columnHeaders": {
  //           backgroundColor: colors.blueAccent[700],
  //           borderBottom: "none",
  //         },
  //         "& .MuiDataGrid-virtualScroller": {
  //           backgroundColor: colors.darkBlue[400],
  //         },
  //         "& .MuiDataGrid-footerContainer": {
  //           borderTop: "none",
  //           backgroundColor: colors.blueAccent[700],
  //         },
  //       }}
  //     >
  //       <DataGrid
  //         rows={dummyYearData}
  //         columns={columns}
  //         //dialogbox click
  //         onRowClick={handleRowClick}

  //         // initialState={{
  //         //     ...{dummyYearData}.initialState,
  //         //     pagination: { paginationModel: { pageSize: 7 } },
  //         //   }}
  //         //   pageSizeOptions={[7, 10, 25]}
  //       />

  //       {/* dialogbox */}
  //       <Dialog open={openDialog}>
  //         <DialogTitle>Modify Data</DialogTitle>
  //         <DialogContent>
  //           {selectedRowData && (
  //             <Box>
  //               <Box>
  //                 <Typography>Academic Year: </Typography>
  //                 <input type="text" value={selectedRowData.academicYear} />
  //               </Box>
  //               <Box>
  //                 <Typography>Semester: </Typography>
  //                 <input type="text" value={selectedRowData.semester} />
  //               </Box>
  //             </Box>
  //           )}
  //         </DialogContent>
  //         <DialogActions>
  //           <Button
  //             onClick={handleCloseDialog}
  //             sx={{
  //               backgroundColor: colors.blueAccent[700],
  //               color: colors.grey[100],
  //               fontSize: "14px",
  //               fontWeight: "bold",
  //               padding: "10px 20px",
  //             }}
  //           >
  //             Cancel
  //           </Button>
  //           <Button
  //             onClick={() => console.log("Data Updated!")}
  //             sx={{
  //               backgroundColor: colors.blueAccent[700],
  //               color: colors.grey[100],
  //               fontSize: "14px",
  //               fontWeight: "bold",
  //               padding: "10px 20px",
  //             }}
  //           >
  //             Save
  //           </Button>
  //         </DialogActions>
  //       </Dialog>
  //     </Box>
  //   </Box>
  // );
};

export default AcademicYear;
