import { 
    Box, 
    useTheme, 
    Button, 
    DialogContent,
    DialogContentText, 
    Tooltip,
    IconButton,
} from "@mui/material";
import { 
    DataGrid,
    GridToolbarContainer, 
    GridToolbarColumnsButton, 
    GridToolbarFilterButton, 
    GridRowModes,
    GridActionsCellItem,
    GridRowEditStopReasons,
    } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { 
    dummyQuestionnaireCategory,
    dummyQuestionnaireQN,
    dummyQuestionnaireQL,
} from "../../data/dummyData";
import Header from "../../components/Header";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/Add';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import React, { useState } from "react";
import CustomDatagrid from "../../components/CustomDatagrid";

const Questionnaire = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //hidden comments datagrid
    const [showFeedback, setShowFeedback] = useState(false);

    //dialogbox
    // const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    //edit rows
    const [rows, setRows] = React.useState(dummyQuestionnaireQN);
    const [rowModesModel, setRowModesModel] = React.useState({});

    //delete rows
    const [deleteId, setDeleteId] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    
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

    const handleRowClick = (params) => {
        setSelectedCategory(params.row.category);
    }

    const filteredDummyQuestionnaireQN = dummyQuestionnaireQN.filter(
        (item) => item.category === selectedCategory
    );

    const handleFeedbackClick = () => {
        setShowFeedback((prevShowFeedback) => !prevShowFeedback);
    }

    //questionType combobox
    const questionType = ['Yes/No', 'Text'];

    const QuestionToolbar = () => {
        return (
            <GridToolbarContainer>
                <Button 
                    startIcon={<AddIcon />}
                    sx={{
                        padding: "4px 0px",
                        fontSize: "0.6964285714285714rem"
                    }}
                    >
                    ADD QUESTION
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <Button
                    startIcon={showFeedback ? <PollOutlinedIcon/> 
                    : <TextsmsOutlinedIcon/>}
                    sx={{
                        padding: "4px 0px",
                        fontSize: "0.6964285714285714rem"
                    }}
                    onClick={handleFeedbackClick}
                    >
                    {showFeedback ? "SURVEY" : "FEEDBACK"}
                </Button>
            </GridToolbarContainer>
        )
    }

    const CategoryToolbar = () => {
        return (
            <GridToolbarContainer>
                <Button 
                    startIcon={<AddIcon />}
                    sx={{
                        padding: "4px 0px",
                        fontSize: "0.6964285714285714rem"
                    }}
                    >
                    ADD QUESTION
                </Button>
                <GridToolbarFilterButton />
            </GridToolbarContainer>
        )
    }

    const handleAdd = () => {
        
    }
    const handleMod = () => {
        // setOpenAddDialog(true);
    };
    

    const columnsCategory = [
        { 
            field: "category", 
            headerName: "Category", 
            flex: 1, 
        },
        { 
            field: "weight", 
            headerName: "Weight(%)", 
            flex: .3,
            align: "center"
        },
    ]

    const columnsQuantitative = [
        { 
            field: "questionQN", 
            headerName: "Question", 
            flex: 1, 
            editable: true
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Edit/Delete",
            width: 100,
            renderCell: ({ row }) => {
                const iconStyle = { fontSize: '1.25rem' };
                return [
                    <Tooltip title="Edit">
                        <IconButton>
                            <BorderColorOutlinedIcon sx={{ fontSize: iconStyle.fontSize }}/>
                        </IconButton>
                    </Tooltip>,
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteOutlineOutlinedIcon sx={{ fontSize: iconStyle.fontSize }}/>
                        </IconButton>
                    </Tooltip>,
                ]
            },
        },

        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'Edit/Delete',
        //     width: 100,
        //     cellClassName: 'actions',
        //     getActions: ({ id }) => {
        //         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
        //         if (isInEditMode) {
        //             return [
        //             <GridActionsCellItem
        //                 icon={<SaveOutlinedIcon />}
        //                 label="Save"
        //                 sx={{
        //                 color: colors.yellowAccent[300],
        //                 }}
        //                 onClick={handleSaveClick(id)}
        //             />,
        //             <GridActionsCellItem
        //                 icon={<CancelOutlinedIcon />}
        //                 label="Cancel"
        //                 onClick={handleCancelClick(id)}
        //             />,
        //             ];
        //         }
    
        //         return [
        //             <GridActionsCellItem
        //             icon={<BorderColorOutlinedIcon />}
        //             label="Edit"
        //             onClick={handleEditClick(id)}
        //             />,
        //             <GridActionsCellItem
        //             icon={<DeleteOutlineOutlinedIcon />}
        //             label="Delete"
        //             onClick={handleDeleteClick(id)}
        //             />,
        //         ];
        //         },
        // },
    ]

    const columnFeedback = [
        {
            field: "question",
            headerName: "Question",
            flex: 1,
            editable: true,
        },
        {
            field: "type",
            headerName: "Type",
            flex: .3,
            renderCell: (params) => {
                const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
        
                if (isInEditMode) {
                    return (
                        <Select
                            value={params.value}
                            onChange={(event) => {
                            const newValue = event.target.value;
                            const row = params.row;
                            const updatedRows = rows.map((r) =>
                                r.id === row.id ? { ...r, role: newValue } : r
                            );
                        setRows(updatedRows);
                        }}
                    >
                        {questionType.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                        ))}
                    </Select>
                    );
                } else {
                  return params.value; // Display the regular text value when not in edit mode
                }
                },
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
                    title="QUESTIONNAIRE" 
                    subtitle="Review and Modify Survey Questionnaire" />
            </Box>
            <Box  display="flex" flexDirection="row">
                <Box flex=".75" width="30%">
                    <CustomDatagrid 
                        rows={dummyQuestionnaireCategory} 
                        columns={columnsCategory} 
                        handleAdd={handleAdd}
                        btnText={"MODIFY CATEGORIES"}
                        onRowClick={handleRowClick}
                        />
                </Box>
                {/* <Box
                    height="70vh"
                    flex=".5"
                    sx={{
                        "& .MuiDataGrid-root": { border: "none" },
                        "& .MuiDataGrid-cell": { borderBottom: "none" },
                        "& .yearCell": { color: colors.yellowAccent[300] },
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
                    <DataGrid //table for categories
                        rows={dummyQuestionnaireCategory}
                        columns={columnsCategory}
                        onRowClick={handleRowClick}
                        // edit row
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}

                        components={{ Toolbar: CategoryToolbar }}
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
                            }
                        }}
                        />            
                </Box> */}
                <Box flex="1" width="30%" ml={1}>
                    {showFeedback ? (
                        <CustomDatagrid 
                            rows={dummyQuestionnaireQL} 
                            columns={columnFeedback} 
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            />
                    ) : (
                        <CustomDatagrid 
                            rows={filteredDummyQuestionnaireQN} 
                            columns={columnsQuantitative} 
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            handleAdd={handleAdd}
                            btnText={"ADD NEW QUESTION"}
                            onRowClick={handleRowClick}
                            />
                    )}
                    {/* <CustomDatagrid 
                        rows={dummyQuestionnaireQL} 
                        columns={columnFeedback} 
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        /> */}
                </Box>
            {/* table for questions and/or feedback */}
                {/* <Box
                    height="70vh"
                    flex="1"
                    ml={2}
                    sx={{
                        "& .MuiDataGrid-root": { border: "none" },
                        "& .MuiDataGrid-cell": { borderBottom: "none" },
                        "& .yearCell": { color: colors.yellowAccent[300] },
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
                        { showFeedback ? (
                            <DataGrid
                                rows={dummyQuestionnaireQL}
                                columns={columnFeedback}
                                ml="20px"
                                // edit row
                                editMode="row"
                                rowModesModel={rowModesModel}
                                onRowModesModelChange={handleRowModesModelChange}
                                onRowEditStop={handleRowEditStop}
                                processRowUpdate={processRowUpdate}
                        
                                components={{ Toolbar: QuestionToolbar }}
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
                                    }
                                }}
                                />
                        ) : (
                            <DataGrid
                                rows={filteredDummyQuestionnaireQN}
                                columns={columnsQuantitative}
                                ml="20px"
                                // edit row
                                editMode="row"
                                rowModesModel={rowModesModel}
                                onRowModesModelChange={handleRowModesModelChange}
                                onRowEditStop={handleRowEditStop}
                                processRowUpdate={processRowUpdate}

                                components={{ Toolbar: QuestionToolbar }}
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
                                    }
                                }}
                                />
                        )}
                        
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
                </Box> */}
            </Box>
        </Box>
    )
}

export default Questionnaire;