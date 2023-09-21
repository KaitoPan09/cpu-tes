import React from 'react'; 
import { Box, } from "@mui/material";
import { 
    DataGrid, 
    GridToolbarContainer, 
    GridToolbarColumnsButton, 
    GridToolbarFilterButton, 
    GridToolbarDensitySelector,
    GridActionsCellItem,
    } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { dummyEvalResult } from "../../data/dummyData";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

const CustomToolbar = () => {

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}

const Reports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const columns = [
        { 
            field: "id", 
            headerName: "ID",
            flex: .1,
        },
        {
            field: "department",
            headerName: "Department",
            flex: 1,
            editable: true,
        },
        { 
            field: "status", 
            headerName: "Status", 
            flex: .5,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: ' ',
            flex: .5,
            cellClassName: 'actions',
            getActions: () => {
                return [
                        <Link to="/reports/reportDetails">
                            <GridActionsCellItem
                                icon={<VisibilityOutlinedIcon />}
                                label="View"
                            />Details
                        </Link>
                ];
                },
            },
    
    ]

    return(
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                >
                <Header 
                    title="REPORTS" 
                    subtitle="Evaluation Result Summary" 
                    />
            </Box>
            <Box
                height="70vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.darkBlue[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700]
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
                >
                <DataGrid
                    rows={dummyEvalResult}
                    columns={columns}

                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{
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
                                }
                            }
                        },
                    }}
                    />
            </Box>
        </Box>
    )
}

export default Reports;

