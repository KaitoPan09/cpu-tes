import React, { useState } from 'react'; 
import { 
    Box, 
    Button,
    Dialog,
    DialogActions,
    DialogTitle,  
    DialogContent,
    ListItemText,
    Typography,
    Tooltip,
    IconButton,
} from "@mui/material";
import { 
    DataGrid, 
    GridToolbarContainer, 
    GridToolbarColumnsButton, 
    GridToolbarFilterButton, 
    GridToolbarDensitySelector,
    GridActionsCellItem,
    } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { dummyreportDeets, dummyBarBreakdown } from "../../data/dummyData";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import BarGraph from "../../components/BarGraph";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import CustomDatagrid from "../../components/CustomDatagrid";

// const CustomToolbar = () => {

//     return (
//         <GridToolbarContainer>
//             <GridToolbarColumnsButton />
//             <GridToolbarFilterButton />
//             <GridToolbarDensitySelector />
//             <Link to="/reports">
//                 <Button 
//                     color="primary" 
//                     startIcon={<ArrowBackOutlinedIcon />}
//                     sx={{
//                         padding: "4px 5px",
//                         fontSize: "0.6964285714285714rem"
//                     }}
//                     >
//                     RETURN
//                 </Button>
//             </Link>
//         </GridToolbarContainer>
//     )
// }

const Details = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
            field: 'bar',
            type: 'actions',
            headerName: 'Graph',
            flex: .5,
            cellClassName: 'bar',
            getActions: () => {
                const iconStyle = { fontSize: '1.25rem' };
                return [
                    <Tooltip title="Bar Graph">
                        <IconButton
                        onClick={handleOpenDialog}
                        >
                            <FactCheckOutlinedIcon sx={{ fontSize: iconStyle.fontSize }}/>
                        </IconButton>
                    </Tooltip>,
                    // <Link to="../../components/BarGraph">
                    // <GridActionsCellItem
                    //         icon={<FactCheckOutlinedIcon />}
                    //         label="Graphs"
                    //         onClick={handleOpenDialog}
                    //     />
                    // </Link>
                        // <GridActionsCellItem
                        //     icon={<FactCheckOutlinedIcon />}
                        //     label="Graphs"
                        //     onClick={handleOpenDialog}
                        // />
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
            <CustomDatagrid rows={dummyreportDeets} columns={columns} />
            {/* <Box
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
                    /> */}
                <Dialog 
                    open={open} 
                    onClose={handleClose} 
                    TransitionProps={{ timeout: 0 }}
                    PaperProps={{
                        style: {
                        maxWidth: "100%",
                        width: "100%",
                        animation: "none", 
                        },
                    }}
                    // sx={{
                    //     "& .MuiDialog-paper": {
                    //         maxWidth: "80%", 
                    //         // maxHeight: "100%", 
                    //     }
                    // }}
                    >
                    <DialogTitle>Evaluation Results for CCS Dept Head</DialogTitle>
                    <DialogContent 
                        sx={{
                            height: "1000px",
                            width: "100%",
                        }}
                    >
                        <Box display="flex" height="100%" width="100%">
                        <Box height="100%" width="35%">
                            {/* <List sx={{width: "100%", maxWidth: 360}}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText>
                                        PROFESSIONAL RESPONSIBILITIES (20%)
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem alignItems="flex-start">
                                    <ListItemText>
                                        PLANNING AND PREPARATION (20%)
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem alignItems="flex-start">
                                    <ListItemText>
                                        DELIVERY OF INSTRUCTION (30%)
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem alignItems="flex-start">
                                    <ListItemText>
                                        ASSESSMENT (20%)
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem alignItems="flex-start">
                                    <ListItemText>
                                        CLASSROOM MANAGEMENT (10%)
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem alignItems="flex-start"> 
                                    <ListItemText>
                                    <Typography sx={{ fontWeight: 'bold'}}>
                                        Evaluation Score
                                    </Typography>
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                            </List> */}
                            <List sx={{ width: "100%", maxWidth: 360 }}>
                            {dummyBarBreakdown.map((item, index) => (
                                <div key={item.category}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            // primary={`${item.category}(20%)`}
                                            // sx={{ textAlign: "left" }} 
                                            primary={
                                                index === 2 ? `${item.category}(30%)`:
                                                index === 4 ? `${item.category}(10%)`:
                                                `${item.category}(20%)`
                                            }
                                            sx={{ textAlign: "left" }} 
                                        />
                                        <ListItemText
                                            primary={item.score} 
                                            sx={{ textAlign: "right" }}
                                        />
                                    </ListItem>
                                <Divider />
                                </div>
                            ))}
                            </List>
                        </Box>
                        <Box height="100%" width="100%">
                            <BarGraph reportDetails={true} />
                        </Box>
                        </Box>
                        {/* <BarGraph reportDetails={true}/> */}
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            variant='outlined'
                            sx={{
                                color: colors.yellowAccent[500]
                            }}
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            {/* </Box> */}
        </Box>
    )
}

export default Details;
