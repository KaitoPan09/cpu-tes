import React, { useState } from "react";
import { Box } from "@mui/material";
import CustomDataGrid from "../../components/CustomDatagrid";
import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import FormDialog from "../../components/FormDialog";

export const Subjects = () => {
  const { collegeId, deptId } = useParams();
  const { postData, loading } = useFetch();
  const [rows, setRows] = useData(
    collegeId
      ? `/api/colleges/${collegeId}/subjects`
      : `/api/departments/${deptId}/subjects`
  );
  const columns = [
    {
      field: "subject_code",
      headerName: "Subject Code",
      flex: 1,
      minWidth: 100,
    },
    { field: "subject", headerName: "Subject", flex: 4, minWidth: 180 },
  ];
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleAdd = () => {
    setOpenAddDialog(true);
  };
  const submit = async (formData) => {
    const response = await postData(
      collegeId
        ? `/api/colleges/${collegeId}/subjects/add`
        : `/api/departments/${deptId}/subjects/add`,
      formData
    );
    return response;
  };
  return (
    <Box>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        handleAdd={handleAdd}
        //handleRowDoubleClick={handleRowDoubleClick}
        btnText={"ADD NEW SUBJECT"}
      />
      <FormDialog
        setRows={setRows}
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        submit={submit}
        dialogTitle={"Add Subject"}
        dialogContentText={"Add a new subject under this department"}
        fields={[
          {
            type: "textField",
            label: "Subject Name",
            name: "subject",
          },
          {
            type: "textField",
            label: "Subject Code",
            name: "subject_code",
          },
        ]}
        // infotext="User accounts will be created for the faculty members after adding them to the system"
        loading={loading}
      />
    </Box>
  );
};
