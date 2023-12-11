import React, { useEffect, useState } from "react";
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
import UpdDeptDialog from "./updDeptDialog";
import {
  Details,
  DetailsTwoTone,
  ManageSearch,
  ManageSearchOutlined,
} from "@mui/icons-material";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import FormDialog from "../../components/FormDialog";
import { ImportCSV } from "./importCSV";
import { useAuth } from "../../context/AuthContext";
const Departments = () => {
  const college = useLocation().state;
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const { auth, userInfo } = useAuth();
  const { postData, deleteData } = useFetch();
  const { showLoader, hideLoader, showSnackbar } = useAppContext();
  const [rows, setRows] = useData(`/api/departments?college_id=${collegeId}`);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] =
    React.useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleAdd = () => {
    setOpenAddDialog(true);
  };
  const submit = async (data) => {
    console.log(data);
    let response = await postData("/api/departments/add", {
      department: data.dept,
      dept_code: data.deptCode,
    });
    return response;
  };
  const handleUpdate = (row) => {
    const dept = rows.filter((r) => r.id === row.id)[0];
    setSelectedDepartment(dept);
    setOpenUpdateDialog(true);
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
    const response = await deleteData(
      `/api/departments/${selectedDepartment.id}/delete`
    );
    if (response) {
      setRows(response);
      showSnackbar("Department deleted successfully", "success");
    }
    // const response = await fetch(
    //   `/api/departments/${selectedDepartment.id}/delete`,
    //   {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   }
    // )
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`HTTP Status: ${res.status}`);
    //     }
    //     return res.json();
    //   })
    //   .then((res) => {
    //     setRows(res ? res : []);

    //     showSnackbar("Department deleted successfully", "success");
    //   })
    //   .catch((err) => {
    //     showSnackbar(`Something went wrong. (${err.message})`, "error");
    //   });
    hideLoader();
    setOpenConfirmDeleteDialog(false);
  };
  const handleRowDoubleClick = (params) => {
    setSelectedDepartment(params.row);
    setOpenUpdateDialog(true);
  };
  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 80,
    // },
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
      field: "manage",
      type: "manage",
      headerName: "Manage",
      width: 90,
      renderCell: ({ row }) => {
        const iconStyle = { fontSize: "1.25rem" };
        return [
          <Tooltip title="Manage">
            <IconButton
              onClick={() => {
                navigate(
                  `/departments/${row.id}/manage`,
                  { state: row },
                  { replace: true }
                );
              }}
            >
              <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: ({ row }) => {
        const iconStyle = { fontSize: "1.25rem" };
        return [
          <Tooltip title="Edit">
            <IconButton onClick={() => handleUpdate(row)}>
              <BorderColorOutlinedIcon sx={{ fontSize: iconStyle.fontSize }} />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                handleDelete(row);
              }}
            >
              <DeleteOutlineOutlinedIcon
                sx={{ fontSize: iconStyle.fontSize }}
              />
            </IconButton>
          </Tooltip>,
          //   <Tooltip title="Manage">
          //   <IconButton
          //     onClick={() => {
          //       navigate(
          //         `/departments/${row.id}/manage`,
          //         { state: row },
          //         { replace: true }
          //       );
          //     }}
          //   >
          //     <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }}/>
          //   </IconButton>
          // </Tooltip>,
        ];
      },
    },
  ];
  const [open, setOpen] = useState(false);
  // if (college === null || college === undefined) {
  //   return (college === null || college === undefined) && <Navigate to="/colleges" replace />;
  // }
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={auth.role === "Admin" ? college.college : userInfo.college}
          subtitle="List of Departments and their Department Heads"
        />
      </Box>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        handleAdd={handleAdd}
        handleRowDoubleClick={handleRowDoubleClick}
        btnText={"ADD NEW DEPARTMENT"}
        setOpen={setOpen}
        handleBack={handleBack}
      />
      <FormDialog
        setRows={setRows}
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        submit={submit}
        dialogTitle={"Add Department"}
        dialogContentText={"Add a new department"}
        fields={[
          {
            type: "textField",
            label: "Department Name",
            name: "dept",
          },
          {
            type: "textField",
            label: "Department Code",
            name: "deptCode",
          },
        ]}
        infotext="Department heads can be assigned after creating a new department
              and adding faculties into the newly created department."
      />
      {/* <AddDeptDialog
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        setDepartments={setRows}
      /> */}
      <UpdDeptDialog
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        setDepartments={setRows}
        selectedDepartment={selectedDepartment}
      />
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        setOpen={setOpenConfirmDeleteDialog}
        handleConfirm={handleDeleteConfirm}
        handleCancel={handleDeleteCancel}
      />
      <ImportCSV open={open} setOpen={setOpen} departments={rows} />
    </Box>
  );
};

export default Departments;
