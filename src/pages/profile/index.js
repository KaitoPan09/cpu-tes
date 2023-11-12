import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import {
  AccountCircle,
  Badge,
  Email,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { tokens } from "../../theme";
import { LoadingButton } from "@mui/lab";

export const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth, userInfo } = useAuth();
  const { postData, loading } = useFetch();
  const [password, setPassword] = React.useState({
    currentPassword: "",
    newPassword: "",
  });
  const changePassword = async (e) => {
    e.preventDefault();
    await postData("api/auth/change_password", password);
  };
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Account" subtitle="Account settings" />
      </Box>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="h6" component="h2">
                {userInfo.name}
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <Badge />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="h6">{auth.school_id}</Typography>}
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="h6">{userInfo.email}</Typography>}
          />
        </ListItem>
      </List>
      <Box
        component={"form"}
        id="change-password-form"
        onSubmit={changePassword}
        //sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              autoFocus
              margin="dense"
              label="Current Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password.currentPassword}
              onChange={(e) =>
                setPassword({ ...password, currentPassword: e.target.value })
              }
              sx={{ maxWidth: "360px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              autoFocus
              margin="dense"
              label="New Password"
              variant="outlined"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              sx={{ maxWidth: "360px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} alignContent={"center"}>
            <LoadingButton
              fullWidth
              type="submit"
              form="change-password-form"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                maxWidth: "360px",
              }}
              loading={loading}
              disabled={loading}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
