import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  styled,
  tableCellClasses,
} from "@mui/material";
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

export default function ClassesPopover({ classes, status }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <Tooltip title="Click to view classes">
        <Button
          variant="text"
          onClick={handleClick}
          sx={{ textAlign: "right" }}
        >
          {status}
        </Button>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <TableContainer>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Stub Code</StyledTableCell>
                  <StyledTableCell>Subject</StyledTableCell>
                  <StyledTableCell>Completion</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classes.map((row) => {
                  return (
                    <StyledTableRow key={row.stub_code}>
                      <StyledTableCell>{row.stub_code}</StyledTableCell>
                      <StyledTableCell>
                        {row.subject_code + " : " + row.subject}
                      </StyledTableCell>
                      <StyledTableCell>
                        {((row.completed / row.students) * 100).toFixed(2) +
                          "% (" +
                          row.completed +
                          "/" +
                          row.students +
                          ")"}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
      </Popover>
    </div>
  );
}
