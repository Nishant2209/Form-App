import React, { useState } from "react";
import { Button, TextField, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface User {
  name: string;
  phone: string;
  email: string;
}
const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
    fontWeightLight: 700,
    fontWeightRegular: 700,
  },
});

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/data-page");
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#434242",
          height: "100vh",
          width: "100%",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { mt: 4, width: "60ch" },
            border: 2,
            padding: 5,
            width: `50%`,
            borderRadius: `10px`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F3EFE0",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h3">Enter your details</Typography>
          <div>
            <TextField
              required
              id="outlined-search"
              label="Name"
              type="search"
              name="name"
              helperText="Please enter your name"
              onChange={handleChange}
              value={user.name}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-number"
              label="Phone Number"
              name="phone"
              type="number"
              helperText="Please enter your Phone Number"
              onChange={handleChange}
              value={user.phone}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-search"
              label="Email"
              type="email"
              name="email"
              helperText="Please enter your E-Mail"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button
              variant="contained"
              type="submit"
              sx={{
                marginTop: "20px",
                width: "20ch",
                backgroundColor: "#222222",
                color: "#F3EFE0",
                ":hover": {
                  backgroundColor: "transparent",
                  color: "#222222",
                },
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default UserForm;
