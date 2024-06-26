import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useAppContext } from "../../context/AppContext";
import useData from "../../hooks/useData";
import { Box, IconButton, Link, Tooltip } from "@mui/material";
import {
  BorderColorOutlined,
  CropRotateOutlined,
  ManageSearchOutlined,
} from "@mui/icons-material";
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import Header from "../../components/Header";
import CustomDataGrid from "../../components/CustomDatagrid";
import FormDialog from "../../components/FormDialog";
import { ConfirmDeleteDialog } from "../../components/ConfirmDeleteDialog";
import { ImportCSV } from "../department/importCSV";

export const Colleges = () => {
  const navigate = useNavigate();
  const { postData, deleteData } = useFetch();
  const { showLoader, hideLoader, showSnackbar } = useAppContext();
  const [rows, setRows] = useData("/api/colleges/");
  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 80,
    // },
    {
      field: "college",
      headerName: "College",
      flex: 2,
      minWidth: 180,
    },
    {
      field: "dean",
      headerName: "Dean",
      flex: 2,
      minWidth: 180,
    },
    {
      field: "college_code",
      headerName: "College Code",
      width: 100,
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
                  `/colleges/${row.id}/manage`,
                  { state: row },
                  { replace: true }
                );
              }}
            >
              <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }}/>
            </IconButton>
          </Tooltip>,
        ];
      },
    },
    {
      field: "goto",
      type: "actions",
      headerName: "To Departments",
      width: 150,
      renderCell: ({ row }) => {
        const iconStyle = { fontSize: '1.25rem' };
        return [
          <Tooltip title="Go to Department">
            <IconButton
              onClick={() => {
                navigate(
                  `/colleges/${row.id}/departments`,
                  { state: row },
                );
              }}
            >
              <AssistantDirectionIcon sx={{ fontSize: iconStyle.fontSize }}/>
            </IconButton>
          </Tooltip>,
        ];
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: ({ row }) => {
        const iconStyle = { fontSize: '1.25rem' };
        return [
          <Tooltip title="Edit">
            <IconButton onClick={() => handleUpdate(row)}>
              <BorderColorOutlined sx={{ fontSize: iconStyle.fontSize }}/>
            </IconButton>
          </Tooltip>,
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                handleDelete(row);
              }}
            >
              <DeleteOutlineOutlined sx={{ fontSize: iconStyle.fontSize }}/>
            </IconButton>
          </Tooltip>,
          // <Tooltip title="Manage">
          //   <IconButton
          //     onClick={() => {
          //       navigate(
          //         `/colleges/${row.id}/manage`,
          //         { state: row },
          //         { replace: true }
          //       );
          //     }}
          //   >
          //     <ManageSearchOutlined />
          //   </IconButton>
          // </Tooltip>,
        ];
      },
    },
    // {
    //   headerName: "",
    //   width: 140,
    //   renderCell: ({ row }) => {
    //     return [
    //       <Link
    //         component="button"
    //         variant="body2"
    //         color={"secondary"}
    //         onClick={() => {
    //           navigate(`/colleges/${row.id}/departments`, { state: row });
    //         }}
    //       >
    //         Go to Departments
    //       </Link>,
    //     ];
    //   },
    // },
  ];
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] =
    React.useState(false);
  const handleAdd = () => {
    setOpenAddDialog(true);
  };
  const [selectedCollege, setSelectedCollege] = useState(null);
  const handleRowDoubleClick = (params) => {
    setSelectedCollege(params.row);
    setOpenUpdateDialog(true);
  };
  const [importOpen, setImportOpen] = useState(false);
  const submit = async (data) => {
    const response = await postData("/api/colleges/add", {
      college: data.college,
      college_code: data.collegeCode,
    });
    return response;
  };
  const handleUpdate = (row) => {
    setSelectedCollege(row);
    setOpenUpdateDialog(true);
  };
  const handleDelete = (row) => {
    setSelectedCollege(row);
    setOpenConfirmDeleteDialog(true);
  };
  const handleDeleteCancel = () => {
    setOpenConfirmDeleteDialog(false);
  };
  const submitUpdate = async (data) => {
    console.log({
      college: data.college,
      college_code: data.college_code,
      dean_id: data.dean.id,
    });
    console.log(data)
    const response = await postData(
      `/api/colleges/${selectedCollege.id}/update`,
      {
        college: data.college,
        college_code: data.college_code,
        dean_id: data.dean.id,
      }
    );
    return response;
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="COLLEGES" subtitle="List of Colleges and their Deans" />
      </Box>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        handleAdd={handleAdd}
        // handleRowDoubleClick={handleRowDoubleClick}
        btnText={"ADD NEW COLLEGE"}
        setOpen={setImportOpen}
      />
      <FormDialog
        setRows={setRows}
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        submit={submit}
        dialogTitle={"Add College"}
        dialogContentText={"Add a new college"}
        fields={[
          {
            type: "textField",
            label: "College Name",
            name: "college",
          },
          {
            type: "textField",
            label: "College Code",
            name: "collegeCode",
          },
        ]}
        infotext="Deans can be assigned after faculties are added to the system."
      />
      <FormDialog
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        setRows={setRows}
        selectedCollege={selectedCollege}
        submit={submitUpdate}
        dialogTitle={"Update College"}
        dialogContentText={"Update college details"}
        fields={[
          {
            type: "textField",
            label: "College Name",
            name: "college",
            defaultValue: selectedCollege?.college,
          },
          {
            type: "textField",
            label: "College Code",
            name: "college_code",
            defaultValue: selectedCollege?.college_code,
          },
          {
            type: "comboBox",
            label: "Select College Dean",
            name: "dean",
            options: selectedCollege?.faculties,
            getOptionLabel: (option) => option.school_id + " - " + option.name,
          },
        ]}
      />
      {/* <UpdDeptDialog
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        setDepartments={setRows}
        selectedDepartment={selectedDepartment}
      /> */}
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        setOpen={setOpenConfirmDeleteDialog}
        // handleConfirm={handleDeleteConfirm}
        handleCancel={handleDeleteCancel}
      />
      <ImportCSV open={importOpen} setOpen={setImportOpen} />
    </Box>
  );
};
