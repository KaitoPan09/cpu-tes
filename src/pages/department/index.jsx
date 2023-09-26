import React, { useEffect, useState } from "react";
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
import { tokens } from "../../theme";
import { dummyDeptData } from "../../data/dummyData";
import AddIcon from "@mui/icons-material/Add";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { CustomToolbar } from "../../components/CustomToolbar";
import { ConfirmDeleteDialog } from "../../components/ConfirmDeleteDialog";
import CustomDataGrid from "../../components/CustomDatagrid";
import useFetch from "../../hooks/useFetch";
import { useAppContext } from "../../context/AppContext";
import useData from "../../hooks/useData";
import { AddDeptDialog } from "./addDeptDialog";
const Departments = () => {
  const { postData } = useFetch();
  const { showLoader, hideLoader, showSnackbar } = useAppContext();
  const [rows, setRows] = useData("/api/departments/");

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] =
    React.useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleAdd = () => {
    setOpenAddDialog(true);
  };
  const handleUpdate = (row) => {
    setSelectedDepartment(row);
  };
  const handleDelete = (row) => {
    setSelectedDepartment(row);
    setOpenConfirmDeleteDialog(true);
  };
  const handleDeleteCancel = () => {
    setOpenConfirmDeleteDialog(false);
  };
  const handleDeleteConfirm = async () => {
    showLoader();
    const response = await postData(
      `/api/users/${selectedDepartment.id}/delete`
    );
    setRows(response ? response : []);
    hideLoader();
    setOpenConfirmDeleteDialog(false);
    showSnackbar("Department deleted successfully", "success");
  };
  const handleRowDoubleClick = (params) => {
    setSelectedDepartment(params.row);
    setOpenUpdateDialog(true);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 2,
      minWidth: 180,
      editable: true,
    },
    {
      field: "dept_head",
      headerName: "Department Head",
      flex: 2,
      minWidth: 180,
    },
    {
      field: "dept_code",
      headerName: "Department Code",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Edit/Delete",
      width: 80,
      renderCell: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<BorderColorOutlinedIcon />}
            label="Edit"
            onClick={() => handleUpdate(row)}
          />,
          <GridActionsCellItem
            icon={<DeleteOutlineOutlinedIcon />}
            label="Delete"
            onClick={() => {
              handleDelete(row);
            }}
          />,
        ];
      },
      // cellClassName: "actions",
      // getActions: ({ id }) => {
      //   const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      //   if (isInEditMode) {
      //     return [
      //       <GridActionsCellItem
      //         icon={<SaveOutlinedIcon />}
      //         label="Save"
      //         sx={{
      //           color: colors.yellowAccent[300],
      //         }}
      //         onClick={handleSaveClick(id)}
      //       />,
      //       <GridActionsCellItem
      //         icon={<CancelOutlinedIcon />}
      //         label="Cancel"
      //         onClick={handleCancelClick(id)}
      //       />,
      //     ];
      //   }

      //   return [
      //     <GridActionsCellItem
      //       icon={<BorderColorOutlinedIcon />}
      //       label="Edit"
      //       onClick={handleEditClick(id)}
      //     />,
      //     <GridActionsCellItem
      //       icon={<DeleteOutlineOutlinedIcon />}
      //       label="Delete"
      //       onClick={handleDeleteClick(id)}
      //     />,
      //   ];
      // },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DEPARTMENTS"
          subtitle="List of Departments and their Department Heads"
        />
      </Box>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        handleAdd={handleAdd}
        handleRowDoubleClick={handleRowDoubleClick}
        btnText={"ADD NEW DEPARTMENT"}
      />
      <AddDeptDialog open={openAddDialog} setOpen={setOpenAddDialog} />
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        setOpen={setOpenConfirmDeleteDialog}
        handleConfirm={handleDeleteConfirm}
        handleCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default Departments;
