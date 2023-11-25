import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const FacultyEvalStatusReport = ({ rows }) => (
  <Grid container spacing={2}>
    <Grid item>
      <Typography variant="h4">Faculty Evaluation Status Report</Typography>
    </Grid>
    <Grid item>
      <Box sx={{ minWidth: 1000 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Faculty</TableCell>
              <TableCell>School ID</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Supervisor</TableCell>
              <TableCell>Peer</TableCell>
              <TableCell>Self</TableCell>
              <TableCell>Student</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.school_id}>
                  <TableCell>{row.faculty}</TableCell>
                  <TableCell>{row.school_id}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.supervisor}</TableCell>
                  <TableCell>{row.peer}</TableCell>
                  <TableCell>{row.self}</TableCell>
                  <TableCell>{row.student}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Grid>
  </Grid>
);
