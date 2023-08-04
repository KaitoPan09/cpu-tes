import React, { useState } from 'react'; 
import { 
    Box, 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, 
} from "@mui/material";
import { 
    DataGrid, 
    GridToolbarContainer, 
    GridToolbarColumnsButton, 
    GridToolbarFilterButton, 
    GridToolbarDensitySelector,
    GridRowModes,
    GridActionsCellItem,
    GridRowEditStopReasons,
    } from "@mui/x-data-grid";
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import { tokens } from "../../theme";
import { dummyEvaluation } from "../../data/dummyData";
import AddIcon from '@mui/icons-material/Add';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";

const CustomToolbar = () => {

    return (
        <GridToolbarContainer>
            <Button 
                color="primary" 
                startIcon={<AddIcon />}
                sx={{
                    padding: "4px 5px",
                    fontSize: "0.6964285714285714rem"
                }}
                >
                NEW EVALUATION
            </Button>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}

const Evaluation = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //edit rows
    const [rows, setRows] = React.useState(dummyEvaluation);
    const [rowModesModel, setRowModesModel] = React.useState({});

    //delete rows
    const [deleteId, setDeleteId] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
    };

    //userLevel combobox
    // const userLevel = ['Admin', 'DeptHead', 'Teacher', 'Student'];
    
    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    
    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    
    const handleDeleteClick = (id) => () => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleDeleteConfirm = () => {
        setRows(rows.filter((row) => row.id !== deleteId));
        setOpen(false);
    }

    const handleDeleteCancel =() => {
        setOpen(false);
    }
    
    const handleCancelClick = (id) => () => {
        setRowModesModel({
          ...rowModesModel,
         [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    
    const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
          setRows(rows.filter((row) => row.id !== id));
        }
    };
    
    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
    
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    

    const columns = [
        { 
            field: "id", 
            headerName: "ID",
            flex: .1
        },
        {
            field: "department",
            headerName: "Department",
            flex: 1,
            editable: true,
        },
        { 
            field: "startDate", 
            headerName: "Start Date", 
            flex: .5,
            editable: true,
        },
        { 
            field: "endDate", 
            headerName: "End Date", 
            flex: .5,
            editable: true,
        },
        { 
            field: "status", 
            headerName: "Status", 
            flex: .5,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Edit/Delete',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
                if (isInEditMode) {
                    return [
                    <GridActionsCellItem
                        icon={<SaveOutlinedIcon />}
                        label="Save"
                        sx={{
                        color: colors.yellowAccent[300],
                        }}
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelOutlinedIcon />}
                        label="Cancel"
                        onClick={handleCancelClick(id)}
                    />,
                    ];
                }
      
                return [
                    <GridActionsCellItem
                    icon={<BorderColorOutlinedIcon />}
                    label="Edit"
                    onClick={handleEditClick(id)}
                    />,
                    <GridActionsCellItem
                    icon={<DeleteOutlineOutlinedIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    />,
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
                    title="EVALUATION" 
                    subtitle="Start or Manage an Ongoing Evaluation" 
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
                    // rows={dummyEvaluation}
                    rows={rows}
                    columns={columns}
                    
                    // edit row
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}

                    slots={{ toolbar: CustomToolbar }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
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
                    {/* delete confirmation dialog box render */}
                    <Dialog open={open} onClose={handleDeleteCancel}>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Are you sure you want to delete this?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                onClick={handleDeleteCancel} 
                                sx={{
                                    color: colors.yellowAccent[300],
                                    }}
                                >
                            Cancel
                            </Button>
                            <Button 
                                onClick={handleDeleteConfirm} 
                                sx={{
                                    color: colors.redAccent[400],
                                    }}
                                autoFocus>
                            Delete
                            </Button>
                        </DialogActions>
                        </Dialog>
            </Box>
        </Box>
    )
}

export default Evaluation;

