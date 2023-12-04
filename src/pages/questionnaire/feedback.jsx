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
import { dummyQuestionnaireQL } from "../../data/dummyData";
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

export const Feedback = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //hidden comments datagrid
    const [showFeedback, setShowFeedback] = useState(false);

    //dialogbox
    // const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    //edit rows
    const [rows, setRows] = React.useState(null);
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

    const handleFeedbackClick = () => {
        setShowFeedback((prevShowFeedback) => !prevShowFeedback);
    }

    const handleBack = () => {
        navigate(-1);
    };

    //questionType combobox
    const questionType = ['Yes/No', 'Text'];

    const handleAdd = () => {
        
    }

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
                    return params.value;
                }
                },
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
            <Box>
                <CustomDatagrid 
                    rows={dummyQuestionnaireQL} 
                    columns={columnFeedback} 
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    handleAdd={handleAdd}
                    btnText={"ADD NEW QUESTION"}
                    handleBack={handleBack}
                    />
            </Box>
    )
}

export default Feedback;