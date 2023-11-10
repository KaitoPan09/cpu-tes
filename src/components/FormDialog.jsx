import React from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppContext } from "../context/AppContext";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
const FormDialog = ({
  setRows,
  open,
  setOpen,
  submit,
  dialogTitle,
  dialogContentText,
  fields,
  infotext,
  loading,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showSnackbar } = useAppContext();
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClose = () => {
    setOpen(false);
    setFormData({});
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await submit(formData);
    if (setRows) {
      setRows(response ? response : []);
      showSnackbar("Record added successfully", "success");
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
        <Box component="form" id="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {fields.map((field, index) => {
              const {
                type,
                label,
                name,
                options,
                getOptionLabel,
                defaultValue,
              } = field;
              return (
                <Grid item xs={12} key={index}>
                  {type === "textField" && (
                    <TextField
                      label={label}
                      name={name}
                      onChange={handleChange}
                      required
                      fullWidth
                      defaultValue={defaultValue}
                    />
                  )}
                  {type === "comboBox" && (
                    <Autocomplete
                      fullWidth
                      // sx={{ maxWidth: "300px" }}
                      // disablePortal={true}
                      defaultValue={defaultValue}
                      required
                      name={name}
                      options={options}
                      getOptionLabel={getOptionLabel}
                      // value={selectedOption}
                      onChange={(event, value) => {
                        // setSelectedOption(value);
                        setFormData({ ...formData, [name]: value });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={label}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  )}
                  {type === "date" && (
                    <FormControl fullWidth required>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DesktopDatePicker
                            required
                            label={label}
                            inputFormat="MM/DD/YYYY"
                            defaultValue={dayjs(defaultValue)}
                            onChange={(newValue) =>
                              setFormData({
                                ...formData,
                                [name]: dayjs(newValue).format("YYYY-MM-DD"),
                              })
                            }
                            // sx={{ width: "300px" }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </FormControl>
                  )}
                  {type === "select" && (
                    <FormControl fullWidth required>
                      <InputLabel>{label}</InputLabel>
                      <Select
                        label={label}
                        defaultValue={defaultValue}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [name]: e.target.value,
                          });
                        }}
                      >
                        {options.map((option, index) => {
                          return (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
              );
            })}
            {infotext && (
              <Grid item xs={12} mt={2}>
                <Alert severity="info">{infotext}</Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            color: colors.grey[100],
          }}
          disabled={loading}
        >
          Cancel
        </Button>
        <LoadingButton
          type="submit"
          form="form"
          sx={{
            color: colors.grey[100],
          }}
          loading={loading}
          disabled={loading}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
