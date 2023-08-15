import React from 'react'; 
import { Box, Button } from "@mui/material";
import { 
    DataGrid, 
    GridToolbarContainer, 
    GridToolbarColumnsButton, 
    GridToolbarFilterButton, 
    GridToolbarDensitySelector,
    } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { dummyViewEval } from "../../data/dummyData";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

const CustomToolbar = () => {

    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <Link to="/evaluation">
                <Button 
                    color="primary" 
                    startIcon={<ArrowBackOutlinedIcon />}
                    sx={{
                        padding: "4px 5px",
                        fontSize: "0.6964285714285714rem"
                    }}
                    >
                    RETURN
                </Button>
            </Link>
        </GridToolbarContainer>
    )
}

const View = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {
            field: "faculty",
            headerName: "Faculty",
            flex: 1,
        },
        { 
            field: "schoolID", 
            headerName: "School ID", 
            flex: .5,
        },
        { 
            field: "supervisor", 
            headerName: "Supervisor", 
            flex: 1,
            cellClassName: (params) => params.value === "Completed" ? "green" : "red",
        },
        { 
            field: "peer", 
            headerName: "Peer", 
            flex: 1,
            cellClassName: (params) => params.value === "Completed" ? "green" : "red",
        },
        { 
            field: "self", 
            headerName: "Self", 
            flex: 1,
            cellClassName: (params) => params.value === "Completed" ? "green" : "red",
        },
        { 
            field: "student", 
            headerName: "Student", 
            flex: 1,
            cellClassName: (params) => params.value === "Completed" ? "green" : "red",
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
                    title="CURRENTLY VIEWING" 
                    subtitle="placeholder placeholder placeholder" 
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
                    "& .green": { color: colors.greenAccent[500]},
                    "& .red": { color: colors.redAccent[500]},
                }}
                >
                <DataGrid
                    rows={dummyViewEval}
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

export default View;

