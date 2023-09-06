import {
  Grid,
  Paper,
  TextField,
  Avatar,
  Typography,
  FormHelperText,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoadingButton } from "@mui/lab";
//import useAppContext from "../Hooks/useAppContext";
import logo from "../../assets/images/cpu-logo.png";
import cpuBg from "../../assets/images/uc-image2.JPG";
const loginTheme = createTheme({
  palette: {
    background: {
      default: "#303030",
      paper: "#424242",
    },
  },
});
const Login = () => {
  const { setAuth, login } = useAuth();
  //const { setAcadYear } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    school_id: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const userLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response = await login(values);
    setLoading(false);
    if (response?.isValid) {
      //setAcadYear(response.acad_year);
      setValues({
        ...values,
        school_id: "",
        password: "",
        showPass: false,
      });
      navigate(from, { replace: true });
    } else {
      setError(true);
      setErrorMsg(response.error);
    }
  };
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <ThemeProvider theme={loginTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundImage: `url(${cpuBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid
          item
          container
          //alignContent={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          xs={false}
          sm={false}
          md={8}
          sx={{
            color: "white",
            display: { xs: "none", sm: "none", md: "flex" },
          }}
        >
          YOUR TEXT HERE
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          component={Paper}
          //elevation={6}
          square
          sx={{
            backgroundColor: "#fff",
          }}
          // sx={{
          //   backgroundColor: "rgba(255, 255, 255, 0.2)", // 20% transparent white as the background color
          //   boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional: Adding a subtle shadow effect
          //   backdropFilter: "blur(16px)",
          // }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Box
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="CPU logo"
                src={logo}
                sx={{
                  width: 64,
                  height: 64,
                  mr: 1,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  //alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    fontWeight: { xs: "700", lg: "700" },
                    fontSize: { xs: "1rem", lg: "1.25rem" },
                    color: "#685990",
                    justifyContent: "center",
                  }}
                >
                  <Typography pr={".2rem"} variant="body">
                    {"CENTRAL"}
                  </Typography>
                  <Typography pr={".2rem"} variant="body">
                    {"PHILIPPINE"}
                  </Typography>
                  <Typography variant="body">{"UNIVERSITY"}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    fontWeight: { xs: "500", lg: "700" },
                    fontSize: { xs: "0.8rem", lg: "1rem" },
                    letterSpacing: "0.1rem",
                    color: "#685990",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography variant="body">{"TEACHER'S"}</Typography>
                  <Typography variant="body">{"EVALUATION"}</Typography>
                  <Typography variant="body">{"SYSTEM"}</Typography>
                </Box>
              </Box>
            </Box>
            <Typography mt={2} component="h1" variant="h5">
              SIGN IN
            </Typography>
            <Box component="form" onSubmit={userLogin} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                autoFocus
                margin="normal"
                required
                label="School ID"
                variant="outlined"
                color="secondary"
                onChange={(e) =>
                  setValues({ ...values, school_id: e.target.value })
                }
              />
              <TextField
                fullWidth
                autoFocus
                margin="normal"
                required
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <IconButton
                //         onClick={handlePassVisibilty}
                //         aria-label="toggle password"
                //         edge="end"
                //       >
                //         {values.showPass ? (
                //           <VisibilityOffIcon />
                //         ) : (
                //           <VisibilityIcon />
                //         )}
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
              />
              <FormHelperText error={error}>{errorMsg}</FormHelperText>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Sign In
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
