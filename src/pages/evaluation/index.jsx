import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
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
import AddIcon from "@mui/icons-material/Add";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDatagrid";
import useData from "../../hooks/useData";
import FormDialog from "../../components/FormDialog";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import { ManageSearchOutlined } from "@mui/icons-material";

const Evaluation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { auth, userInfo } = useAuth();
  const { postData, request } = useFetch();
  const [rows, setRows] = useData(
    auth?.role === "Admin"
      ? `/api/evaluations/current?role=${auth?.role}`
      : `/api/evaluations/current?role=${auth?.role}&college_id=${userInfo?.college_id}`
  );
  const [departments, setDepartments] = useData(
    auth?.role === "Admin"
      ? `/api/departments`
      : `/api/departments?college_id=${userInfo?.college_id}`
  );
  const [openUpdDialog, setOpenUpdDialog] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "college",
      headerName: "College",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 120,
      type: "date",
      valueFormatter: (params) => {
        const startDate = new Date(params.value);
        return startDate.toLocaleDateString();
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },

//     //edit rows
//     const [rows, setRows] = React.useState(dummyEvaluation);
//     const [rowModesModel, setRowModesModel] = React.useState({});

//     //delete rows
//     const [deleteId, setDeleteId] = useState(null);
//     const [open, setOpen] = React.useState(false);

//     const handleRowEditStop = (params, event) => {
//         if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//           event.defaultMuiPrevented = true;
//         }
//     };

//     const handleEditClick = (id) => () => {
//         setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//     };
    
//     const handleSaveClick = (id) => () => {
//         setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//     };
    
//     const handleDeleteClick = (id) => () => {
//         setDeleteId(id);
//         setOpen(true);
//     };

//     const handleDeleteConfirm = () => {
//         setRows(rows.filter((row) => row.id !== deleteId));
//         setOpen(false);
//     }

//     const handleDeleteCancel =() => {
//         setOpen(false);
//     }
    
//     const handleCancelClick = (id) => () => {
//         setRowModesModel({
//           ...rowModesModel,
//         [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });
    
//     const editedRow = rows.find((row) => row.id === id);
//         if (editedRow.isNew) {
//           setRows(rows.filter((row) => row.id !== id));
//         }
//     };
    
//     const processRowUpdate = (newRow) => {
//         const updatedRow = { ...newRow, isNew: false };
//         setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//         return updatedRow;
//     };
    
//     const handleRowModesModelChange = (newRowModesModel) => {
//         setRowModesModel(newRowModesModel);
//     };
    

//     const columns = [
//         { 
//             field: "id", 
//             headerName: "ID",
//             flex: .1,
//         },
//         {
//             field: "department",
//             headerName: "Department",
//             flex: 1,
//             editable: true,
//         },
//         { 
//             field: "startDate", 
//             headerName: "Start Date", 
//             flex: .5,
//             type: 'date',
//             valueGetter: (params) => {
//                 return new Date(params.row.startDate);
//               },
//               valueFormatter: (params) => {
//                 const startDate = new Date(params.value);
//                 return startDate.toLocaleDateString();
//               },
//             editable: true,
//             cellClassName: "startCell" 
//         },
//         { 
//             field: "endDate", 
//             headerName: "End Date", 
//             flex: .5,
//             type: 'date',
//             valueGetter: (params) => {
//                 return new Date(params.row.startDate);
//               },
//               valueFormatter: (params) => {
//                 const startDate = new Date(params.value);
//                 return startDate.toLocaleDateString();
//               },
//             editable: true,
//         },
//         { 
//             field: "status", 
//             headerName: "Status", 
//             flex: .5,
//         },
//         {
//             field: 'actions',
//             type: 'actions',
//             headerName: 'Manage',
//             flex: .5,
//             cellClassName: 'actions',
//             getActions: ({ id }) => {
//             const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
//                 if (isInEditMode) {
//                     return [
//                         <GridActionsCellItem
//                             icon={<SaveOutlinedIcon />}
//                             label="Save"
//                             sx={{
//                                 color: colors.yellowAccent[300],
//                                 }}
//                             onClick={handleSaveClick(id)}
//                         />,
//                         <GridActionsCellItem
//                             icon={<CancelOutlinedIcon />}
//                             label="Cancel"
//                             onClick={handleCancelClick(id)}
//                         />,
//                     ];
//                 }
    
//                 return [
//                         <Link to="/evaluation/viewEval">
//                             <GridActionsCellItem
//                                 icon={<VisibilityOutlinedIcon />}
//                                 label="View"
//                             />
//                         </Link>,
//                         <GridActionsCellItem
//                             icon={<BorderColorOutlinedIcon />}
//                             label="Edit"
//                             onClick={handleEditClick(id)}
//                             />,
//                         <GridActionsCellItem
//                             icon={<DeleteOutlineOutlinedIcon />}
//                             label="Delete"
//                             onClick={handleDeleteClick(id)}
//                             />,
//                 ];
//                 },
//             },
      
//     ]

//     return(
//         <Box m="20px">
//             <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 >
//                 <Header 
//                     title="EVALUATION" 
//                     subtitle="Start or Manage an Ongoing Evaluation" 
//                     />
//             </Box>
//             <Box
//                 height="70vh"
//                 sx={{
//                     "& .MuiDataGrid-root": { border: "none" },
//                     "& .MuiDataGrid-cell": { borderBottom: "none" },
//                     "& .MuiDataGrid-columnHeaders": {
//                         backgroundColor: colors.blueAccent[700],
//                         borderBottom: "none"
//                     },
//                     "& .MuiDataGrid-virtualScroller": {
//                         backgroundColor: colors.darkBlue[400]
//                     },
//                     "& .MuiDataGrid-footerContainer": {
//                         borderTop: "none",
//                         backgroundColor: colors.blueAccent[700]
//                     },
//                     "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//                         color: `${colors.grey[100]} !important`,
//                     },
//                 }}
//                 >
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
                    
//                     editMode="row"
//                     rowModesModel={rowModesModel}
//                     onRowModesModelChange={handleRowModesModelChange}
//                     onRowEditStop={handleRowEditStop}
//                     processRowUpdate={processRowUpdate}

//                     slots={{ toolbar: CustomToolbar }}
//                     slotProps={{
//                         toolbar: { setRows, setRowModesModel },
//                         panel: {
//                             sx: {
//                                 "& .MuiFormLabel-root": {
//                                     color: `${colors.yellowAccent[300]}`,
//                                 },
//                                 "& .MuiInput-underline:after": {
//                                     borderBottom: `${colors.yellowAccent[300]}`,
//                                 },
//                                 "& .MuiButtonBase-root": {
//                                     color: `${colors.yellowAccent[300]}`,
//                                 },
//                                 "& .Mui-checked+ .MuiSwitch-track": {
//                                     backgroundColor: `${colors.yellowAccent[300]}`,
//                                 }
//                             }
//                         },
//                     }}
//                     />
//                     <Dialog open={open} onClose={handleDeleteCancel}>
//                         <DialogTitle>Confirm Deletion</DialogTitle>
//                         <DialogContent>
//                             <DialogContentText>
//                             Are you sure you want to delete this?
//                             </DialogContentText>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button 
//                                 onClick={handleDeleteCancel} 
//                                 sx={{
//                                     color: colors.yellowAccent[300],
//                                     }}
//                                 >
//                             Cancel
//                             </Button>
//                             <Button 
//                                 onClick={handleDeleteConfirm} 
//                                 sx={{
//                                     color: colors.redAccent[400],
//                                     }}
//                                 autoFocus>
//                             Delete
//                             </Button>
//                         </DialogActions>
//                         </Dialog>
//             </Box>
//         </Box>
//     )
// }//
    {
      // headerName: "",
      width: 140,
      type: "actions",
      renderCell: ({ row }) => {
        return [
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                if (row.status === "Ongoing") {
                  alert("Cannot update an ongoing evaluation");
                } else {
                  setSelectedEvaluation(row);
                  setOpenUpdDialog(true);
                }
              }}
            >
              <BorderColorOutlinedIcon />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                console.log(row);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>,
          <Button
            // component="button"
            // variant="body1"
            color={"secondary"}
            onClick={() => {
              navigate(`/evaluations/${row.id}/view`, { state: row });
            }}
          >
            Details
          </Button>,
        ];
      },
    },
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Manage",
    //   width: 100,
    //   renderCell: ({ row }) => {
    //     return [];
    //   },
    // },
  ];
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleAdd = () => {
    setOpenAddDialog(true);
  };
  const submit = async (formData) => {
    const response = await postData(
      auth.role === "Admin"
        ? `/api/evaluations/new_evaluation?role=${auth.role}`
        : `/api/evaluations/new_evaluation?role=${auth.role}&college_id=${userInfo?.college_id}`,
      {
        dept_id: formData.department.id,
        start_date: formData.start_date,
      }
    );
    return response;
    // console.log({
    //   dept_id: formData.department.id,
    //   start_date: formData.start_date,
    // });
  };
  const updateEvaluation = async (formData) => {
    const response = await postData(
      `/api/evaluations/update_evaluation?evaluation_id=${selectedEvaluation.id}`,
      {
        start_date: formData.start_date,
      }
    );
    return response;
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="EVALUATION"
          subtitle="Start or Manage an Ongoing Evaluation"
        />
      </Box>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        handleAdd={handleAdd}
        // handleRowDoubleClick={handleRowDoubleClick}
        btnText={"START NEW EVALUATION"}
      />
      <FormDialog
        setRows={setRows}
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        submit={submit}
        dialogTitle={"New Evaluation"}
        dialogContentText={"Start a new evaluation"}
        fields={[
          {
            type: "comboBox",
            label: "Select a Department",
            name: "department",
            options: departments,
            getOptionLabel: (option) => option.department,
          },
          {
            type: "date",
            label: "Start Date",
            name: "start_date",
          },
        ]}
      />
      <FormDialog
        open={openUpdDialog}
        setOpen={setOpenUpdDialog}
        submit={updateEvaluation}
        dialogTitle={"Update Evaluation"}
        dialogContentText={"Update the starting date of the evaluation"}
        fields={[
          {
            type: "date",
            label: "Start Date",
            name: "start_date",
          },
        ]}
      />
    </Box>
  );
};

export default Evaluation;
