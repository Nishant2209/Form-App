import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Data {
  id: number;
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
const Data: React.FC = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);

  if (
    !userData.name.length ||
    !userData.phone.length ||
    !userData.email.length
  ) {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const handleClose = () => {
      setOpen(false);
      navigate("/");
    };
    return (
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Missing Information !!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have missing one/more information. Please fill all the details
              properly.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  } else {
    const [data, setData] = useState<Data[]>([]);
    const columns: GridColDef[] = [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "name",
        headerName: "Name",
        type: "name",
        width: 300,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "phone",
        headerName: "Phone",
        type: "number",
        width: 300,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "email",
        type: "email",
        headerName: "Email",
        width: 300,
        align: "center",
        headerAlign: "center",
      },
    ];

    const fetchData = async () => {
      try {
        let url = "https://jsonplaceholder.typicode.com/users";
        const response = await fetch(url);
        const parsedData = await response.json();
        setData(parsedData);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F3EFE0",
            width: "100%",
            height: "100vh",
          }}
        >
          <Typography variant="h2" my={3} style={{ color: "#222222" }}>
            Data of the Users
          </Typography>
          <Box sx={{ height: "50vh", width: "70%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              showCellRightBorder
              showColumnRightBorder
            />
          </Box>
        </div>
      </ThemeProvider>
    );
  }
};
export default Data;
