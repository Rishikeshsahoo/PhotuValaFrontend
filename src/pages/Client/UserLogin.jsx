import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../data/Logo.png"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      
        PhotuVala
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);
  const [loggedin, setLoggedIn] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_LOCALHOST}/users/protected`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        navigate("/UserApp");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");

    axios
      .post(`${process.env.REACT_APP_LOCALHOST}/users/login`, {
        username: username,
        password: password,
      })
      .then((user) => {
        console.log(user.data);
        localStorage.setItem("token", user.data.token);
        navigate("/UserApp");
      })
      .catch((err) => {
        setIsOpen(true);
        setErrorMessage((prev) => err.response.data.message);
        console.log(errorMessage);
      });
  };
  if (loggedin === 1)
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            paddingTop={"10vh"}
            component={Paper}
            elevation={6}
            square
          >
            <Collapse style={{ position: "absolute" }} in={isOpen}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="error"
                sx={{ mb: 2 }}
              >
                {errorMessage}
              </Alert>
            </Collapse>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: 180,
                  margin: 3,
                }}
                alt="Your logo."
                src={Logo}
              />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  size="small"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"

                  
                />

                <Button
                  type="submit"
                  
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#0d9aae" }}
                >
                  Sign In
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(assets/userbaby.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </ThemeProvider>
    );
}
