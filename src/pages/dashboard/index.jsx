import {
  Box,
  useTheme,
  Typography,
  Button,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import BarGraph from "../../components/BarGraph";
import { dummyUpdates } from "../../data/dummyData";
import { Link } from "react-router-dom";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State variables and handlers
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [selectedFilterScore, setSelectedFilterScore] = useState(0);
  const [filteredUpdates, setFilteredUpdates] = useState(dummyUpdates);

  // Handler to filter updates based on score
  const handleFilter = (threshold) => {
    const filtered = dummyUpdates.filter(
      (updates) => updates.score < threshold
    );
    setFilteredUpdates(filtered);
  };

  // Function to handle opening and closing the filter menu
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  // Function to apply filter
  const handleApplyFilter = () => {
    handleFilterMenuClose();
    handleFilter(selectedFilterScore);
  };

  // Reset filters
  const handleResetFilter = () => {
    setSelectedFilterScore(0);
    setFilteredUpdates(dummyUpdates);
  };
  const { auth, userInfo } = useAuth();
  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome" />
      {/* GRIDS & CHARTS */}
      {auth.role === "Admin" && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.darkBlue[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              displayContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Evaluation Summary
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.yellowAccent[500]}
                >
                  2022-2023
                </Typography>
              </Box>
            </Box>
            <Box height="250px" mt="-20px">
              <BarGraph isDashboard={true} />
            </Box>
          </Box>
          {/* updates */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.darkBlue[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.darkBlue[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Completed Surveys
              </Typography>
              {/* <TextField 
                  label="Search Teacher"
                  variant="outlined"
                  /> */}
              <Button
                color="primary"
                startIcon={<FilterListOutlinedIcon />}
                sx={{
                  padding: "4px 5px",
                  color: colors.grey[100],
                }}
                onClick={handleFilterMenuOpen}
              >
                FILTER SCORES
              </Button>
              <Menu
                anchorEl={filterMenuAnchor}
                open={Boolean(filterMenuAnchor)}
                onClose={handleFilterMenuClose}
              >
                <MenuItem>
                  <TextField
                    label="Score"
                    type="number"
                    value={selectedFilterScore}
                    onChange={(event) =>
                      setSelectedFilterScore(parseFloat(event.target.value))
                    }
                    variant="outlined"
                  />
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                    }}
                    onClick={handleApplyFilter}
                  >
                    Apply
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      color: colors.grey[100],
                      ml: "15px",
                    }}
                    onClick={handleResetFilter}
                  >
                    Reset
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
            {filteredUpdates.map((updates, i) => (
              <Box
                key={`${updates.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.darkBlue[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.yellowAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {updates.name}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {updates.type}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{updates.stubCode}</Box>
                <Link to="/reports/reportDetails">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor:
                        updates.score < 4.2
                          ? colors.redAccent[500]
                          : colors.greenAccent[500],
                      p: "5px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {updates.score}
                  </Button>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
