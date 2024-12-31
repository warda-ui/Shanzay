import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './AdminDashboard.css';

import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Modal,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import { useForm } from 'react-hook-form';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleAddUserModalOpen = () => setAddUserModalOpen(true);
  const handleAddUserModalClose = () => setAddUserModalOpen(false);

  const onSubmit = (data) => {
    // Handle form submission, like making an API call to add the user
    console.log("User data submitted: ", data);
    // Close the modal after submission
    setAddUserModalOpen(false);
  };

  return (
    <Box>
      {/* AppBar */}
      <AppBar position="static" sx={{ bgcolor: "#3f51b5" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/settings")}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          <ListItem button onClick={() => navigate("/home")}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate("/reports")}>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button onClick={handleAddUserModalOpen}>
            <AddCircleIcon sx={{ mr: 2 }} />
            <ListItemText primary="Add User" />
          </ListItem>
          <ListItem button onClick={() => navigate("/user-management")}>
            <PeopleIcon sx={{ mr: 2 }} />
            <ListItemText primary="User Management" />
          </ListItem>
          <ListItem button onClick={() => navigate("/complaint-management")}>
            <ListItemText primary="Complaint Management" />
          </ListItem>
          <ListItem button onClick={() => navigate("/login")}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Body */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Welcome to Admin Dashboard
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ height: 120 }}
              onClick={() => navigate("/user-management")}
            >
              <Typography variant="h6">User Management</Typography>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ height: 120 }}
              onClick={() => navigate("/complaint-management")}
            >
              <Typography variant="h6">Complaint Management</Typography>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ height: 120 }}
              onClick={handleAddUserModalOpen}
            >
              <Typography variant="h6">Add User</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Add User Modal */}
      <Modal open={addUserModalOpen} onClose={handleAddUserModalClose}>
        <Box
          sx={{
            p: 4,
            width: 400,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            mx: "auto",
            mt: 10,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Add New User
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />

            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                {...register("role", { required: "Role is required" })}
                error={!!errors.role}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Add User
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddUserModalClose}
              >
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
