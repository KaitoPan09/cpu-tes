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
  ToggleButton,
  ToggleButtonGroup,
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
  const [colleges, setColleges] = useData(`/api/colleges`);
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
    {
      field: "details",
      headerName: "Details",
      width: 60,
      type: "action",
      renderCell: ({ row }) => {
        const iconStyle = { fontSize: "1.25rem" };
        return [
          <Tooltip title="Details">
            <IconButton
              onClick={() => {
                navigate(`/evaluations/${row.id}/view`, { state: row });
              }}
            >
              <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
            </IconButton>
          </Tooltip>,
          // <Button
          //   // component="button"
          //   // variant="body1"
          //   color={"secondary"}
          //   onClick={() => {
          //     navigate(`/evaluations/${row.id}/view`, { state: row });
          //   }}
          // >
          //   Details
          // </Button>,
        ];
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      type: "actions",
      renderCell: ({ row }) => {
        const iconStyle = { fontSize: "1.25rem" };
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
              <BorderColorOutlinedIcon sx={{ fontSize: iconStyle.fontSize }} />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                console.log(row);
              }}
            >
              <DeleteOutlineOutlinedIcon
                sx={{ fontSize: iconStyle.fontSize }}
              />
            </IconButton>
          </Tooltip>,
          // <Button
          //   // component="button"
          //   // variant="body1"
          //   color={"secondary"}
          //   onClick={() => {
          //     navigate(`/evaluations/${row.id}/view`, { state: row });
          //   }}
          // >
          //   Details
          // </Button>,
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
    const response = await postData(`/api/evaluations/new_evaluation`, {
      college_id: formData.college.id,
      start_date: formData.start_date,
    });
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
            label: "Select a College",
            name: "college",
            options: colleges,
            getOptionLabel: (option) => option.college,
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
