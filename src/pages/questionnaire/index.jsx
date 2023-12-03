import { 
    Box, 
    useTheme, 
    Tooltip,
    IconButton,
    Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import { dummyQuestionnaireIndex } from "../../data/dummyData";
import Header from "../../components/Header";
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { ManageSearchOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import CustomDatagrid from "../../components/CustomDatagrid";
import FormDialog from "../../components/FormDialog";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const handleAdd = () => {
        setOpenAddDialog(true);
    };
    const [rows, setRows] = React.useState(dummyQuestionnaireIndex);

    const handleStatusClick = (id) => {
        const rowIndex = rows.findIndex(row => row.id === id);
        const updatedRows = [...rows];
        updatedRows[rowIndex].status = 
        updatedRows[rowIndex].status === 'Active' ? 'Inactive' : 'Active';

        setRows(updatedRows);
    };
    
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
            renderCell: ({ value, row }) => {
                const iconStyle = { fontSize: '1.25rem' };
                return (
                    <Tooltip title={`Click to ${value === 'Active' ? 'Deactivate' 
                    : 'Activate'} Questionnaire`}>
                        <IconButton onClick={() => handleStatusClick(row.id)}>
                            {value === "Active" ? (
                                <>
                                    <CheckIcon 
                                        sx={{ 
                                            fontSize: iconStyle.fontSize, 
                                            color: colors.greenAccent[300] }} />
                                    <Typography 
                                        sx={{ 
                                            color: colors.greenAccent[300] }}>
                                                Active
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <WarningAmberIcon 
                                        sx={{ 
                                            fontSize: iconStyle.fontSize, 
                                            color: colors.redAccent[500] }} />
                                    <Typography 
                                        sx={{ color: colors.redAccent[500] }}>
                                            Inactive
                                    </Typography>
                                </>
                            )}
                        </IconButton>
                    </Tooltip>
                );
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
                        <IconButton
                            onClick={() => {
                                navigate(
                                    `/questionnaire/manage`,
                                );
                            }}>
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