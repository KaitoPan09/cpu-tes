import { 
    Box, 
    useTheme, 
    Button, 
    DialogContent,
    DialogContentText, 
    Tooltip,
    IconButton,
    Typography,
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
    dummyQuestionnaireIndex,
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
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { ManageSearchOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import CustomDatagrid from "../../components/CustomDatagrid";
import FormDialog from "../../components/FormDialog";

const Questionnaire = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const handleAdd = () => {
        setOpenAddDialog(true);
    };
    const [rows, setRows] = React.useState(dummyQuestionnaireIndex);

    //hidden comments datagrid
    const [showFeedback, setShowFeedback] = useState(false);

    //dialogbox
    // const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    //edit rows
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

    const columns = [
        { 
            field: "created", 
            headerName: "Date Created", 
            flex: 1, 
        },
        { 
            field: "id", 
            headerName: "ID", 
            flex: 1, 
        },
        { 
            field: "type", 
            headerName: "Type", 
            flex: 1, 
        },
        { 
            field: "updated", 
            headerName: "Date Updated", 
            flex: 1, 
        },
        { 
            field: "revision", 
            headerName: "Revision", 
            flex: 1, 
        },
        { 
            field: "code", 
            headerName: "Code", 
            flex: 1, 
        },
        {
            field: "status",
            type: "actions",
            headerName: "Status",
            flex: 1,
            renderCell: ({ value }) => {
                const iconStyle = { fontSize: '1.25rem' };
                const icon = value === "Active"
                    ? <CheckIcon 
                        sx={{ 
                            fontSize: iconStyle.fontSize, 
                            color: colors.greenAccent[500] 
                        }}/>
                    : <WarningAmberIcon 
                        sx={{ 
                            fontSize: iconStyle.fontSize, 
                            color: colors.redAccent[500] 
                        }}/>
                const color = value === "Active" ? colors.greenAccent[500]
                    : colors.redAccent[500]
                return [
                <Tooltip title={`Status: ${value}`}>
                    <IconButton>
                        {icon}
                        <Typography sx={{ color }}>{value}</Typography>
                    </IconButton>
                </Tooltip>,
                ];
            },
        },
        {
            field: "manage",
            type: "actions",
            headerName: "Manage",
            width: 90,
            renderCell: ({ row }) => {
                const iconStyle = { fontSize: '1.25rem' };
                return [
                    <Tooltip title="Manage">
                        <IconButton>
                            <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }}/>
                        </IconButton>
                    </Tooltip>,
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
                <CustomDatagrid 
                    rows={dummyQuestionnaireIndex} 
                    columns={columns} 
                    handleAdd={handleAdd}
                    btnText={"ADD NEW QUESTIONNAIRE"}
                    onRowClick={handleRowClick}
                    />
                <FormDialog
                    setRows={setRows}
                    open={openAddDialog}
                    setOpen={setOpenAddDialog}
                    // submit={submit}
                    dialogTitle={"Add Questionnaire"}
                    dialogContentText={"Add a new questionnaire"}
                    fields={[
                    ]}
                    infotext="Upload a csv file of your the new questionnaire"
                />
        </Box>
    )
}

export default Questionnaire;