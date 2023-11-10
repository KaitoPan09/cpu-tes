import { Box } from "@mui/material";
import React, { useState } from "react";
import CustomDataGrid from "../../components/CustomDatagrid";
import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import FormDialog from "../../components/FormDialog";
export const Courses = () => {
  const { collegeId } = useParams();
  const { postData, loading } = useFetch();
  const [rows, setRows] = useData(`/api/colleges/${collegeId}/courses`);
  const columns = [
    { field: "course", headerName: "Course", flex: 2, minWidth: 180 },
    { field: "course_code", headerName: "Course Code", flex: 1, minWidth: 180 },
  ];
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleAdd = () => {
    setOpenAddDialog(true);
  };
  const submit = async (formData) => {
    const response = await postData(
      `/api/colleges/${collegeId}/courses/add`,
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
        btnText={"ADD NEW COURSE"}
      />{" "}
      <FormDialog
        setRows={setRows}
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        submit={submit}
        dialogTitle={"Add Course"}
        dialogContentText={"Add a new course to the department"}
        fields={[
          {
            type: "textField",
            label: "Course Name",
            name: "course",
          },
          {
            type: "textField",
            label: "Course Code",
            name: "course_code",
          },
        ]}
        // infotext="User accounts will be created for the faculty members after adding them to the system"
        loading={loading}
      />
    </Box>
  );
};
