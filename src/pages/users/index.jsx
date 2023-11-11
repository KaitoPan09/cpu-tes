import React, { useState } from "react";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../../components/Header";
import { ConfirmDeleteDialog } from "../../components/ConfirmDeleteDialog";
import { AddUserDialog } from "./addUserDialog";
import useFetch from "../../hooks/useFetch";
import { UpdateUserDialog } from "./updateUserDialog";
import { useAppContext } from "../../context/AppContext";
import CustomDataGrid from "../../components/CustomDatagrid";
import useData from "../../hooks/useData";
import { useAuth } from "../../context/AuthContext";

const userLevel = ["Admin", "Dean", "Department Head", "Teacher", "Student"];

const Users = () => {
  const { postData } = useFetch();
  const { showLoader, hideLoader, showSnackbar } = useAppContext();
  const { auth } = useAuth();
  const [rows, setRows] = useData("/api/users/");
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteCancel = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleAdd = () => {
    setOpenAddDialog(true);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setOpenUpdateDialog(true);
  };

  const handleRowDoubleClick = (params) => {
    setSelectedUser(params.row);
    setOpenUpdateDialog(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenConfirmDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    showLoader();
    const response = await postData(`/api/users/${selectedUser.id}/delete`);
    setRows(response ? response : []);
    hideLoader();
    setOpenConfirmDeleteDialog(false);
    showSnackbar("User deleted successfully", "success");
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 80,
    },
    {
      field: "school_id",
      headerName: "School ID",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "access_level",
      headerName: "Access Level",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return userLevel[params.value - 1];
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      minWidth: 180,
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
              if (row.school_id === auth.school_id) {
                window.alert("You cannot delete yourself");
                return;
              }
              handleDelete(row);
            }}
          />,
        ];
      },
    },
  ];

  return (
    <Box mx="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="USERS" subtitle="List of Users and their Access Level" />
      </Box>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        handleAdd={handleAdd}
        handleRowDoubleClick={handleRowDoubleClick}
        btnText="ADD NEW USER"
      />
      <AddUserDialog
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        setUsers={setRows}
      />
      <UpdateUserDialog
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        setUsers={setRows}
        selectedUser={selectedUser}
      />
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        setOpen={setOpenConfirmDeleteDialog}
        handleConfirm={handleDeleteConfirm}
        handleCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default Users;
