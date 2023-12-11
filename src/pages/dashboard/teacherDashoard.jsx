import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  paperClasses,
  useTheme,
} from "@mui/material";
import React from "react";
import CustomDataGrid from "../../components/CustomDatagrid";
import { useAuth } from "../../context/AuthContext";
import useData from "../../hooks/useData";
import ProgressCircle from "../../components/ProgressCircle";
import { tokens } from "../../theme";

export const TeacherDashoard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth, userInfo } = useAuth();
  const [rows, setRows] = useData(
    `/api/evaluations/faculty/class_eval_progress?user_id=${userInfo.user_id}`
  );
  const columns = [
    { field: "id" },
    { field: "stub_code", headerName: "Stub", width: 120 },
    {
      field: "subject_code",
      headerName: "Subject Code",
      width: 120,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 180,
    },
    { field: "n_students", headerName: "No. of Students", width: 120 },
    {
      field: "completed",
      headerName: "Completed",
      width: 100,
      cellClassName: "green",
    },
    {
      field: "pending",
      headerName: "Pending",
      width: 100,
      cellClassName: "red",
    },
  ];
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={4}>
        <Card sx={{ height: "100%", backgroundColor: "primary.sub" }}>
          <CardContent>
            <Typography variant="h5" fontWeight={700}>
              Class Evaluation Progress
            </Typography>
            <Stack
              container
              alignItems="center"
              direction="column"
              justifyContent="center"
              alignContent={"center"}
              spacing={1}
              mt={3}
            >
              <ProgressCircle progress={0.24} size={125} />
              <Typography variant="body2" color={colors.yellowAccent[500]}>
                Surveys Completed: {952}
              </Typography>
              <Typography variant="body2" color={colors.redAccent[500]}>
                Pending Surveys: {123213}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid> */}
      <Grid item xs={8}>
        <Card
          sx={{
            height: "800",
            backgroundColor: "primary.sub",
          }}
        >
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight={700}>
                Evaluation Progress Per Class
              </Typography>
              {rows.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "700" }}>Stub</TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>Subject</TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>
                        No. of Students
                      </TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>
                        Completed
                      </TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>Pending</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      return (
                        <TableRow hover key={row.id}>
                          <TableCell>{row.stub_code}</TableCell>
                          <TableCell>
                            {row.subject_code} : {row.subject}
                          </TableCell>
                          <TableCell>{row.n_students}</TableCell>
                          <TableCell sx={{ color: "green" }}>
                            {row.completed}
                          </TableCell>
                          <TableCell sx={{ color: "red" }}>
                            {row.pending}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="h6" fontWeight={700}>
                  No classes found.
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
