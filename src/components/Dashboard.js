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
import FilesSection from './FilesSection';

function Dashboard() {
  const [quote, setQuote] = useState(
    '“When we strive to become better than we are, everything around us becomes better too.”'
  );
  const [quoteInput, setQuoteInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, done: false }]);
      setTaskInput('');
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const updateQuote = () => {
    if (quoteInput.trim()) {
      setQuote(`“${quoteInput}”`);
      setQuoteInput('');
    }
  };

  return (
    <Box sx={{ padding: 5 }}>
      {/* First Section: Quote + To-Do */}
      <Box elevation={2} sx={{ padding: 4 }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Quote Section */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              Today's quote
            </Typography>
            <Box display="flex" alignItems="flex-start" mt={2} mb={2}>
              <Box
                sx={{
                  width: '4px',
                  bgcolor: '#6861bd',
                  marginRight: 2,
                }}
              />
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {quote}
              </Typography>
            </Box>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Update the quote..."
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: '#22a9d3', textTransform: 'none' }}
              onClick={updateQuote}
            >
              Update Quote
            </Button>
          </Grid>

          {/* Divider */}
          <Grid item xs={12} md={1}>
            <Divider orientation="vertical" flexItem />
          </Grid>

          {/* To-Do List Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              To-Do list
            </Typography>
          
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Add a task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              sx={{ mt: 2, mb: 1 }}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: '#3873d4', textTransform: 'none' }}
              onClick={addTask}
            >
              Add Task
            </Button>
            <Grid container spacing={2} mt={1}>
              {tasks.map((task, index) => (
                <Grid item xs={6} key={index}>
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={task.done}
                      onChange={() => toggleTask(index)}
                      sx={{
                        color: '#3873d4',
                        '&.Mui-checked': {
                          color: '#3873d4',
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: task.done ? 'line-through' : 'none',
                      }}
                    >
                      {task.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Horizontal Divider between sections */}
      <Divider sx={{ my: 5 }} />

      {/* Last Files Section */}
      <FilesSection> </FilesSection>
    </Box>
  
  );
}

export default Dashboard;
