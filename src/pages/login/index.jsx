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
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const userLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    let response = await login({
      school_id: data.get("schoolID"),
      password: data.get("password"),
    });
    setLoading(false);
    if (response?.isValid) {
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
        {/* <Grid
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
          
        </Grid> */}
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
        >
          <Box
            sx={{
              my: 16,
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
                    // color: "#685990",
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
                required
                fullWidth
                autoFocus
                margin="normal"
                id="schoolID"
                label="School ID"
                name="schoolID"
              />
              <TextField
                //required
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
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
