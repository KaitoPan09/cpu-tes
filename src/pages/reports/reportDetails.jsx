import React from 'react'; 
import { Box, Button } from "@mui/material";
import { 
    DataGrid, 
    GridToolbarContainer, 
    GridToolbarColumnsButton, 
    GridToolbarFilterButton, 
    GridToolbarDensitySelector,
    GridActionsCellItem,
    } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { dummyreportDeets } from "../../data/dummyData";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

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

const Details = () => {
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
            flex: 1,
        },
        { 
            field: "student", 
            headerName: "Student (60%)", 
            flex: .5,
        },
        { 
            field: "supervisor", 
            headerName: "Supervisor (30%)", 
            flex: .5,
        },
        { 
            field: "peer", 
            headerName: "Peer (5%)", 
            flex: .5,
        },
        { 
            field: "self", 
            headerName: "Self (5%)", 
            flex: .5,
        },
        { 
            field: "sentiment", 
            headerName: "Sentiment Score", 
            flex: .5,
        },
        { 
            field: "rating", 
            headerName: "Final Rating", 
            flex: .5,
            cellClassName: (params) => {
                const rating = parseFloat(params.value);
                if (!isNaN(rating) && rating < 4.20) {
                    return "red";
                } else {
                    return "green";
                }
            }
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
                                icon={<FactCheckOutlinedIcon />}
                                label="Graphs"
                            />
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
                    title="CURRENTLY VIEWING" 
                    subtitle="Viewing Details for Survey Placeholder" 
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
                    rows={dummyreportDeets}
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

export default Details;
