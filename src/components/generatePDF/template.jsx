import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  Paper,
  SvgIcon,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { tokens } from "../../theme";

// const colors = tokens(theme.palette.mode);
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export const FacultyEvalStatusReport = React.forwardRef(({ rows }, ref) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getPageMargins = () => {
    return `@page { margin: ${10} ${10} ${10} ${10} !important; }`;
  };
  const printStyles = {
    "@page": {
      margin: "10 10 10 10 !important",
    },
    "@media print": {
      html: {
        height: "100vh",
      },
      body: {
        height: "100vh",
        margin: "0 !important",
        padding: "0 !important",
        overflow: "hidden",
      },
    },
  };
  return (
    <div ref={ref} style={printStyles}>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Grid item mx={10}>
          <Typography variant="h4" sx={{ color: colors.darkBlue[500]}}>Faculty Evaluation Status Report</Typography>
        </Grid>
        <Grid item mx={10}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Faculty</StyledTableCell>
                  <StyledTableCell>School ID</StyledTableCell>
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Supervisor</StyledTableCell>
                  <StyledTableCell>Peer</StyledTableCell>
                  <StyledTableCell>Self</StyledTableCell>
                  <StyledTableCell>Student</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <StyledTableRow key={row.school_id}>
                      <StyledTableCell>{row.faculty}</StyledTableCell>
                      <StyledTableCell>{row.school_id}</StyledTableCell>
                      <StyledTableCell>{row.department}</StyledTableCell>
                      <StyledTableCell>{row.supervisor}</StyledTableCell>
                      <StyledTableCell>{row.peer}</StyledTableCell>
                      <StyledTableCell>{row.self}</StyledTableCell>
                      <StyledTableCell>{row.student}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
});
