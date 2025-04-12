import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
} from '@mui/material';

function ToDoList() {
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

  return (
    <>
      <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
        To-Do list
      </Typography>
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
    </>
  );
}

export default ToDoList;
