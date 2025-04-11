import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  Checkbox,
  Paper,
} from '@mui/material';

function FilesSection() {
  return (
    <> 
    <Box textAlign="center" mb={3}>
    <Typography
      variant="h6"
      sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#2e2e2e' }}
    >
      Last files <span style={{ fontSize: '1.2rem' }}>🪐</span>
    </Typography>
  </Box>

  <Grid container spacing={4}>
    {/* Accepted Files */}
    <Grid item xs={12} md={6}>
      <Paper
        sx={{
          padding: 3,
          backgroundColor: '#f6f6ff',
          minHeight: 200,
        }}
        elevation={1}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#6861bd', mb: 2 }}
        >
          Accepted files
        </Typography>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              File name
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Uploaded at
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Accepted at
            </Typography>
          </Grid>
        </Grid>
        {/* When API is ready, map accepted files here */}
      </Paper>
    </Grid>

    {/* Pending Files */}
    <Grid item xs={12} md={6}>
      <Paper
        sx={{
          padding: 3,
          backgroundColor: '#f6f6ff',
          minHeight: 200,
        }}
        elevation={1}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#22a9d3', mb: 2 }}
        >
          Pending files
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              File name
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Uploaded at
            </Typography>
          </Grid>
        </Grid>
        {/* When API is ready, map pending files here */}
      </Paper>
    </Grid>
  </Grid>
  </>
  )
}

export default FilesSection