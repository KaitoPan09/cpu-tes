import React from "react";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useAuth } from "../../context/AuthContext";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.pdf.main,
    color: theme.palette.common.black,
    fontWeight: 700,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: theme.palette.common.black,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: theme.palette.common.white,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.pdf.main,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const PDFReport = React.forwardRef(
  ({ rows, columnHeaders, college, department, title, faculty }, ref) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { auth, userInfo, academicYear } = useAuth();
    // const getPageMargins = () => {
    //   return `@page { margin: ${10} ${10} ${10} ${10} !important; }`;
    // };
    // const printStyles = {
    //   "@page": {
    //     margin: "10 10 10 10 !important",
    //   },
    //   "@media print": {
    //     html: {
    //       height: "100vh",
    //     },
    //     body: {
    //       height: "100vh",
    //       margin: "0 !important",
    //       padding: "0 !important",
    //       overflow: "hidden",
    //     },
    //   },
    // };
    // const nRows =
    //   title === "Faculty Evaluation Status Report"
    //     ? 15
    //     : title === "Student Evaluation Status Report"
    //     ? 20
    //     : title === "Evaluation Summary Report"
    //     ? 15
    //     : 10;
    const nRows = 90;
    const tables = [];
    for (let i = 0; i < rows.length; i += nRows) {
      const tableRows = rows.slice(i, i + nRows).map((row) => {
        if (title === "Faculty Evaluation Status Report") {
          return (
            <StyledTableRow key={row.school_id}>
              <StyledTableCell>{row.faculty}</StyledTableCell>
              <StyledTableCell>{row.school_id}</StyledTableCell>
              <StyledTableCell>{row.role}</StyledTableCell>
              <StyledTableCell>{row.department}</StyledTableCell>
              <StyledTableCell>{row.supervisor}</StyledTableCell>
              <StyledTableCell>{row.peer}</StyledTableCell>
              <StyledTableCell>{row.self}</StyledTableCell>
              <StyledTableCell>{row.student}</StyledTableCell>
            </StyledTableRow>
          );
        } else if (title === "Class Evaluation Status Report") {
          return (
            <StyledTableRow key={row.stub_code}>
              <StyledTableCell>{row.subject}</StyledTableCell>
              <StyledTableCell>{row.stub_code}</StyledTableCell>
              <StyledTableCell>{row.completed}</StyledTableCell>
              <StyledTableCell>{row.pending}</StyledTableCell>
              <StyledTableCell>{row.total}</StyledTableCell>
            </StyledTableRow>
          );
        } else if (title === "Student Evaluation Status Report") {
          return (
            <StyledTableRow key={row.school_id}>
              <StyledTableCell>{row.student}</StyledTableCell>
              <StyledTableCell>{row.school_id}</StyledTableCell>
              <StyledTableCell>{row.course}</StyledTableCell>
              <StyledTableCell>{row.year}</StyledTableCell>
              <StyledTableCell>
                {row.completed + "/" + row.total}
              </StyledTableCell>
            </StyledTableRow>
          );
        } else if (title === "Evaluation Summary Report") {
          return (
            <StyledTableRow key={row.school_id}>
              <StyledTableCell>{row.faculty}</StyledTableCell>
              <StyledTableCell>{row.school_id}</StyledTableCell>
              <StyledTableCell>
                {row.student ? row.student.toFixed(2) : "Pending"}
              </StyledTableCell>
              <StyledTableCell>
                {row.student_turnout ? row.student_turnout.toFixed(2) : "N/A"}
              </StyledTableCell>
              <StyledTableCell>
                {row.supervisor ? row.supervisor.toFixed(2) : "Pending"}
              </StyledTableCell>
              <StyledTableCell>
                {row.peer ? row.peer.toFixed(2) : "Pending"}
              </StyledTableCell>
              <StyledTableCell>
                {row.self ? row.self.toFixed(2) : "Pending"}
              </StyledTableCell>
              <StyledTableCell>
                {row.sentiment_score
                  ? row.sentiment_score >= 0.5
                    ? "Positive"
                    : "Negative"
                  : "No Comments"}
              </StyledTableCell>
              <StyledTableCell>{row.final_rating.toFixed(2)}</StyledTableCell>
            </StyledTableRow>
          );
        }
      });

      const table = (
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          alignContent={"center"}
          key={i}
          sx={{ pageBreakAfter: "always" }}
        >
          <Grid
            item
            container
            justifyContent={"center"}
            alignContent={"center"}
            alignItems={"center"}
            direction={"column"}
          >
            <Typography
              variant="h3"
              fontWeight={500}
              sx={{ color: colors.darkBlue[500] }}
            >
              {title}
            </Typography>
            {faculty && (
              <Typography
                variant="h3"
                fontWeight={500}
                sx={{ color: colors.darkBlue[500] }}
              >
                {faculty}
              </Typography>
            )}
          </Grid>
          <Grid item container justifyContent={"center"} xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columnHeaders.map((header) => (
                      <StyledTableCell key={header}>{header}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>{tableRows}</TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* on the last row, display end of report */}
          {i + nRows >= rows.length && (
            <Grid item xs={12}>
              <Divider sx={{ mt: 5, mb: 2 }}>
                <Typography variant="h2" sx={{ color: colors.darkBlue[500] }}>
                  {"End of Report"}
                </Typography>
              </Divider>
            </Grid>
          )}
          {i + nRows >= rows.length && (
            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={6} container direction={"column"}>
                <Grid item>
                  <Typography variant="h3" sx={{ color: colors.darkBlue[500] }}>
                    Report Generated By:
                  </Typography>
                </Grid>
                <Grid item mt={7}>
                  <Typography variant="h2" sx={{ color: colors.darkBlue[500] }}>
                    {userInfo.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h2" sx={{ color: colors.darkBlue[500] }}>
                    {auth.role}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6} container direction={"column"}>
                <Grid item>
                  <Typography variant="h3" sx={{ color: colors.darkBlue[500] }}>
                    Endorsed By:
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      );
      tables.push(table);
    }

    return (
      <div ref={ref}>
        <Stack spacing={1}>
          <Box display="flex">
            <Typography variant="h3" sx={{ color: colors.darkBlue[500] }}>
              {"Academic Year:"}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={500}
              sx={{ color: colors.darkBlue[500] }}
            >
              {academicYear.year + " " + academicYear.semester}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography variant="h3" sx={{ color: colors.darkBlue[500] }}>
              {"College:"}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={500}
              sx={{ color: colors.darkBlue[500] }}
            >
              {college}
            </Typography>
          </Box>
          {department && (
            <Box display="flex">
              <Typography variant="h2" sx={{ color: colors.darkBlue[500] }}>
                {"Department:"}
              </Typography>
              <Typography
                variant="h3"
                fontWeight={500}
                sx={{ color: colors.darkBlue[500] }}
              >
                {department}
              </Typography>
            </Box>
          )}
          <Box display="flex">
            <Typography variant="h3" sx={{ color: colors.darkBlue[500] }}>
              {"Date:"}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={500}
              sx={{ color: colors.darkBlue[500] }}
            >
              {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ mt: 2, mb: 2, color: colors.darkBlue[500] }} />
        {tables}
      </div>
    );
  }
);
