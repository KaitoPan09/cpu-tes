import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import CustomDataGrid from "../../components/CustomDatagrid";
import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export const Classes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collegeId, deptId } = useParams();
  const { postData, loading } = useFetch();
  const [students, setStudents] = useState([]);
  const [openStudents, setOpenStudents] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const handleStudents = (row) => {
    setOpenStudents(true);
    setSelectedClass(row);
    setStudents(row.students);
  };
  const [rows, setRows] = useData(
    collegeId
      ? `/api/colleges/${collegeId}/classes`
      : `/api/departments/${deptId}/classes`
  );
  const columns = [
    { field: "stub_code", headerName: "Stub Code", width: 100 },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 180,
    },
    { field: "class_time", headerName: "Class Time", width: 180 },
    {
      field: "instructor",
      headerName: "Instructor",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "n_students",
      headerName: "No. Of Students",
      width: 100,
      renderCell: ({ row }) => (
        <Button
          variant="text"
          color="inherit"
          onClick={() => handleStudents(row)}
        >
          {row.n_students}
        </Button>
      ),
    },
  ];
  const studentsColumns = [
    { field: "school_id", headerName: "School ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
    },
    { field: "course", headerName: "Course", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  ];

  return (
    <Box>
      <CustomDataGrid rows={rows} columns={columns} />
      <Dialog
        open={openStudents}
        onClose={() => setOpenStudents(false)}
        fullWidth
        maxWidth={"md"}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6" color="text.secondary">
                Subject:
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" sx={{ color: colors.yellowAccent[300] }}>
                {selectedClass?.subject}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6" color="text.secondary">
                Stub:
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" sx={{ color: colors.yellowAccent[300] }}>
                {selectedClass?.stub_code}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6" color="text.secondary">
                Class Time:
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" sx={{ color: colors.yellowAccent[300] }}>
                {selectedClass?.class_time}
              </Typography>
            </Grid>
          </Grid>
          <CustomDataGrid
            rows={students}
            columns={studentsColumns}
            getRowId={(row) => row.school_id}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setOpenStudents(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
