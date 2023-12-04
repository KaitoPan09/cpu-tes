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
import { useNavigate } from "react-router-dom";
import FormDialog from "../../components/FormDialog";

export const Categories = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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

    const handleBack = () => {
        navigate(-1);
    };

    const [openAddCatDialog, setOpenAddCatDialog] = useState(false);
    const handleAddCategory = () => {
        setOpenAddCatDialog(true);
    }

    const [openAddQuestDialog, setOpenAddQuestDialog] = useState(false);
    const handleAddQuestion = () => {
        setOpenAddQuestDialog(true);
    }

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
    ]

    return(
            <Box  display="flex" flexDirection="row">
                <Box flex=".75">
                    <CustomDatagrid 
                        rows={dummyQuestionnaireCategory} 
                        columns={columnsCategory} 
                        handleAdd={handleAddCategory}
                        btnText={"ADD CATEGORIES"}
                        onRowClick={handleRowClick}
                        handleBack={handleBack}
                        />
                    <FormDialog
                        setRows={setRows}
                        open={openAddCatDialog}
                        setOpen={setOpenAddCatDialog}
                        // submit={submit}
                        dialogTitle={"Add Category"}
                        dialogContentText={"Add a new category"}
                        fields={[
                            {
                                type: "textField",
                                label: "Category Name",
                                name: "category",
                            },
                            {
                                type: "textField",
                                label: "Category Weight",
                                name: "weight",
                            },
                        ]}
                        infotext="You may add a new category for the survey."
                    />
                </Box>
                <Box flex="1" ml={1}>
                    <CustomDatagrid 
                        rows={filteredDummyQuestionnaireQN} 
                        columns={columnsQuantitative} 
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        handleAdd={handleAddQuestion}
                        btnText={"ADD NEW QUESTION"}
                        onRowClick={handleRowClick}
                        />
                    <FormDialog
                        setRows={setRows}
                        open={openAddQuestDialog}
                        setOpen={setOpenAddQuestDialog}
                        // submit={submit}
                        dialogTitle={"Add Question"}
                        dialogContentText={"Add a new question"}
                        fields={[
                            {
                                type: "textField",
                                label: "Question",
                                name: "questionQN",
                            },
                        ]}
                        infotext="You may add a new question for the survey."
                    />
                </Box>
            </Box>
    )
}

export default Categories;