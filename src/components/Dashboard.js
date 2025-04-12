import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import Quote from './Quote';
import ToDoList from './ToDoList';
import FilesSection from './FilesSection';

function Dashboard() {
  return (
    <Box sx={{ padding: 5 }}>
      {/* First Section: Quote + To-Do */}
      <Box elevation={2} sx={{ padding: 4 }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Quote Section */}
          <Grid item xs={12} md={5}>
            <Quote />
          </Grid>

          {/* Divider */}
          <Grid item xs={12} md={1}>
            <Divider orientation="vertical" flexItem />
          </Grid>

          {/* To-Do List Section */}
          <Grid item xs={12} md={6}>
            <ToDoList />
          </Grid>
        </Grid>
      </Box>

      {/* Horizontal Divider between sections */}
      <Divider sx={{ my: 5 }} />
      {(sessionStorage.getItem("role") !== "THERAPIST") && (
  <FilesSection></FilesSection>
)}
    </Box>
      );
}

export default Dashboard;
