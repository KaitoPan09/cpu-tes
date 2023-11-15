import React from "react";
import useData from "../../hooks/useData";
import { useState } from "react";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import CustomDataGrid from "../../components/CustomDatagrid";
import {
  BorderColorOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import { Form, useParams } from "react-router-dom";
import FormDialog from "../../components/FormDialog";
import useFetch from "../../hooks/useFetch";

export const Faculty = () => {
  const { collegeId, deptId } = useParams();
  const { postData, loading } = useFetch();
  const [rows, setRows] = useData(
    collegeId
      ? `/api/colleges/${collegeId}/faculties`
      : `/api/departments/${deptId}/faculties`
  );
  const columns = [
    {
      field: "school_id",
      headerName: "School ID",
      width: 120,
    },
    { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
    {
      field: "actions",
      type: "actions",
      headerName: "Manage",
      width: 100,
      renderCell: ({ row }) => {
        const iconStyle = { fontSize: '1.25rem' };
        return [
          <Tooltip title="Edit">
            <IconButton onClick={() => console.log(row)}>
              <BorderColorOutlined sx={{ fontSize: iconStyle.fontSize }}/>
            </IconButton>
          </Tooltip>,
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                console.log(row);
              }}
            >
              <DeleteOutlineOutlined sx={{ fontSize: iconStyle.fontSize }}/>
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];
  const [selectedRow, setSelectedRow] = useState({});
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const handleAdd = () => {
    setOpenAddDialog(true);
  };
  const handleUpdate = (row) => {
    setSelectedRow(row);
    setOpenUpdateDialog(true);
  };
  const handleDelete = (row) => {
    setSelectedRow(row);
    setOpenConfirmDeleteDialog(true);
  };
  const handleRowDoubleClick = (params) => {
    setSelectedRow(params.row);
    setOpenUpdateDialog(true);
  };
  const submit = async (formData) => {
    const url = collegeId
      ? `/api/faculty/add?college_id=${collegeId}`
      : `/api/faculty/add?dept_id=${deptId}`;
    const response = await postData(url, formData);
    return response;
  };

  return (
    <Box>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        handleAdd={handleAdd}
        handleRowDoubleClick={handleRowDoubleClick}
        btnText={"ADD NEW FACULTY"}
      />
      <FormDialog
        setRows={setRows}
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        submit={submit}
        dialogTitle={"Add Faculty"}
        dialogContentText={"Add a new faculty member"}
        fields={[
          {
            type: "textField",
            label: "School ID",
            name: "school_id",
          },
          {
            type: "textField",
            label: "Name",
            name: "name",
          },
          {
            type: "textField",
            label: "Email",
            name: "email",
          },
        ]}
        infotext="User accounts will be created for the faculty members after adding them to the system"
        loading={loading}
      />
    </Box>
  );
};
