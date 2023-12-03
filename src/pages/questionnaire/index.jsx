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
                return [
                    value === "Active" ? 
                        <Tooltip title={`Status: Active`}>
                            <IconButton>
                                <CheckIcon 
                                    sx={{ 
                                        fontSize: iconStyle.fontSize, 
                                        color: colors.greenAccent[300] 
                                    }}/>
                                <Typography sx={{ color: colors.greenAccent[300] }}>
                                    Active
                                </Typography>
                            </IconButton>
                        </Tooltip>
                        : <Tooltip title={`Click to Activate Questionnaire`}>
                            <IconButton>
                                <WarningAmberIcon 
                                    sx={{ 
                                        fontSize: iconStyle.fontSize, 
                                        color: colors.redAccent[500] 
                                    }}/>
                                <Typography sx={{ color: colors.redAccent[500] }}>
                                    Inactive
                                </Typography>
                            </IconButton>
                        </Tooltip>
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