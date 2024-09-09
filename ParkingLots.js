import { Box, Typography, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ParkingLots() {
  const location = useLocation();
  const data = location.state?.data || []; 

  const [register, setRegister] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [registrations, setRegistrations] = useState({});
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState("");
  const [parkingTime, setParkingTime] = useState(0);
  const [parkingFee, setParkingFee] = useState(0);

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  
  const handleUnregister = ({ registrationNo, time }) => {
  setSelectedRegistration(registrationNo);
  
  const parkedTime = (Date.now() - new Date(time)) / 1000;
  setParkingTime(parkedTime);

  const hours = Math.floor(parkedTime / 3600);
  setParkingFee(5 * 2 ** hours); 
  
  setOpen1(true);
};



  const handleCloseUN = () => {
    setOpen1(false);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (register && selectedSpace && !registrations[selectedSpace]) {
      setRegistrations((prev) => ({
        ...prev,
        [selectedSpace]: { registrationNo: register, time: new Date() }, 
      }));
      setRegister(""); 
      setSelectedSpace(""); 
      setOpen(false); 
    }
  };



  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <>
       <Box className="div">
        <Link to="/">
          <Button
            sx={{ borderRadius: 3 }}
            variant="contained"
            startIcon={<ArrowBack />}
          >
            Go Back
          </Button>
        </Link>

        <Typography component={"h1"} sx={{ ml: 5, fontSize: "3rem" }}>
          Parking Lot
        </Typography>

        <Button variant="contained" color="success" onClick={handleClickOpen}>
          + New Car Registration
        </Button>
      </Box>

 
      {/* Parking spaces display */}
      <Box className="Box2">
        <Grid container spacing={2}  sx={{ padding: '20px', bgcolor: '#f0f0f0' }}>
          {data.map((space) => (
            <Grid key={space}>
              <Paper className="map" elevation={10}
               sx={{
                    padding: "20px",
                    borderRadius: "10px",
                    margin: "20px",
                    background: "linear-gradient(135deg, #add8e6 0%, #00008b 100%)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                  }}
               >
                <h1>
                  <b>Parking {space}</b>
                </h1>
                {registrations[space] ? (
                  <Paper sx={{ 
                             bgcolor: "#add8e6",
                             padding: "15px",
                             borderRadius: "8px",
                             marginTop: "10px",
                              }} elevation={20} 
                  >
                    <p>Registration No: {registrations[space].registrationNo}</p>
                    <Button
                      sx={{ bgcolor: "black" }}
                      onClick={() => handleUnregister(registrations[space])}
                    >
                      UnRegister
                    </Button>
                  </Paper>
                ) : (
                  <p>No registration Car</p>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>


      {/* new car registration */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
       "& .MuiDialog-paper": {
         borderRadius: "15px",
         padding: "20px",
         boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
         bgcolor: "#f9f9f9",
        },
     }}
      >
        <DialogTitle 
        sx={{
         m: 0,
         p: 2,
         bgcolor: "#1976d2",
         color: "#fff",
         fontWeight: "bold",
         fontSize: "1.5rem",
       }}
        
         id="customized-dialog-title">
          Parking Space Form
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
            "&:hover": {
            color: "#ff0000",
              },
          })}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <InputLabel sx={{ mb: 1, fontWeight: "bold", color: "#333" }}>
            Select Parking Space</InputLabel>
            <Select
              fullWidth
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
                sx={{
                mb: 3,
                bgcolor: "#fff",
                borderRadius: "5px",
                "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
                },
               "&:hover .MuiOutlinedInput-notchedOutline": {
               borderColor: "#1976d2",
              },
             }}
            >
              {data.map((space) => (
                <MenuItem
                  key={space}
                  value={space}
                  disabled={!!registrations[space]}
                  sx={{ color: !!registrations[space] ? "#ccc" : "#000" }}
                >
                  Park {space}
                </MenuItem>
              ))}
            </Select>
            <InputLabel sx={{ mb: 1, fontWeight: "bold", color: "#333" }}>
            Enter Car Registration No.</InputLabel>
            <TextField
              type="number"
              name="RegistrationNo"
              value={register}
              onChange={(e) => setRegister(e.target.value)}
              fullWidth
                      sx={{
          mb: 3,
          bgcolor: "#fff",
          borderRadius: "5px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
        }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2}}>
            <Button type="submit"
                     sx={{
          bgcolor: "#1976d2",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          fontWeight: "bold",
          "&:hover": {
            bgcolor: "#115293",
             },
             }}
            >Register</Button>
          </DialogActions>
        </form>
      </BootstrapDialog>


      {/* car unregistration */}
      <BootstrapDialog
  onClose={handleCloseUN}
  aria-labelledby="customized-dialog-title"
  open={open1}
  sx={{
    "& .MuiDialog-paper": {
      borderRadius: "15px",
      padding: "20px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      bgcolor: "#f0f4f8", 
    },
  }}
>
  <DialogTitle
    sx={{
      m: 0,
      p: 2,
      bgcolor: "#d32f2f", 
      color: "#fff",
      fontWeight: "bold",
      fontSize: "1.6rem",
      textAlign: "center",
    }}
    id="customized-dialog-title"
  >
    UnRegister Car
  </DialogTitle>
  <IconButton
    aria-label="close"
    onClick={handleCloseUN}
    sx={{
      position: "absolute",
      right: 8,
      top: 8,
      color: (theme) => theme.palette.grey[500],
      "&:hover": {
        color: "#ff0000", 
      },
    }}
  >
    <CloseIcon />
  </IconButton>
  <form>
    <DialogContent dividers sx={{ bgcolor: "#fff", borderRadius: "10px", p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          p: 2,
          color: "#333",
          fontWeight: "500",
          borderBottom: "1px solid #ddd",
        }}
      >
        Registration No: {selectedRegistration}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          p: 2,
          color: "#333",
          fontWeight: "500",
          borderBottom: "1px solid #ddd",
        }}
      >
        Your Parking Time: {formatTime(parkingTime)}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          p: 2,
          color: "#333",
          fontWeight: "500",
        }}
      >
        Your Parking Fee: ${parkingFee.toFixed(2)}
      </Typography>
    </DialogContent>
    <DialogActions sx={{ p: 2 }}>
      <Button
        sx={{
          bgcolor: "#1976d2",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          fontWeight: "bold",
          "&:hover": {
            bgcolor: "#115293",
          },
        }}
      >
        Payment
      </Button>
    </DialogActions>
  </form>
</BootstrapDialog>

    </>
  );
}
