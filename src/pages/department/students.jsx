import { Box } from "@mui/material";
import React from "react";
import CustomDataGrid from "../../components/CustomDatagrid";
import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export const Students = () => {
  const { collegeId } = useParams();
  const { postData, loading } = useFetch();
  const [rows, setRows] = useData(`/api/colleges/${collegeId}/students`);
  const columns = [
    { field: "school_id", headerName: "School ID", width: 120 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
    { field: "year_level", headerName: "Year Level", width: 80 },
    { field: "course_code", headerName: "Course", width: 180 },
  ];
  return (
    <Box>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        // handleAdd={handleAdd}
        // handleRowDoubleClick={handleRowDoubleClick}
        // btnText={"ADD NEW FACULTY"}
      />
      {/* <FormDialog
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
      /> */}
    </Box>
  );
};
