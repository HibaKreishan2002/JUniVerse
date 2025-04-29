import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  Menu,
  MenuItem,
} from '@mui/material';
import JuUniVerseAxios from '../API/JuUniVerseAxios';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [refershPage, setRefershPage] = useState(0);

  const [contextMenu, setContextMenu] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const addTask = () => {
    if (taskInput.trim()) {
      JuUniVerseAxios.post(`/dashboard/tasks?taskTitle=${taskInput}`).then(() => {
        setTaskInput('');
        setTasks([...tasks, { title: taskInput, isChecked: false }]);
        setRefershPage(refershPage + 1);
      });
    }
  };

  const deleteTask = (id) => {
    JuUniVerseAxios.delete(`/dashboard/tasks/${id}`).then(() => {
      setRefershPage(refershPage + 1);
      handleCloseContextMenu();
    });
  };

  const CheckTask = (id) => {
    JuUniVerseAxios.put(`/dashboard/tasks/${id}/check`).then(() => {
      setRefershPage(refershPage + 1);
    });
  };

  const UnCheckTask = (id) => {
    JuUniVerseAxios.put(`/dashboard/tasks/${id}/uncheck`).then(() => {
      setRefershPage(refershPage + 1);
    });
  };
  useEffect(() => {
    JuUniVerseAxios.get('/dashboard/tasks')
      .then((res) => {
        setTasks(res?.data?.data);
      })
      .catch(() => {
        setTasks([]);
      });
  }, [refershPage]);

  const toggleTask = (index) => {
    const updated = [...tasks];
   
    
    if(updated[index].isChecked){
UnCheckTask(updated[index].id)
    }else{

      CheckTask(updated[index].id);
    }
    updated[index].isChecked = !updated[index].isChecked;
    setTasks(updated);
  };

  const handleContextMenu = (event, task) => {
    event.preventDefault();
    if (task.isChecked) {
      setSelectedTaskId(task.id);
      setContextMenu(
        contextMenu === null
          ? { mouseX: event.clientX + 2, mouseY: event.clientY - 6 }
          : null
      );
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
    setSelectedTaskId(null);
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
        To-Do list
      </Typography>

      <Grid container spacing={2} mt={1}>
        {tasks.map((task, index) => (
          <Grid item xs={6} key={index}>
            <Box
              display="flex"
              alignItems="center"
              onContextMenu={(e) => handleContextMenu(e, task)}
            >
              <Checkbox
                checked={task.isChecked}
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
                  textDecoration: task.isChecked ? 'line-through' : 'none',
                  userSelect: 'none',
                }}
              >
                {task.title}
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

      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => deleteTask(selectedTaskId)}>Delete this task</MenuItem>
        {/* <MenuItem onCloseick={handleCloseContextMenu}>Cancel</MenuItem> */}
      </Menu>
    </>
  );
}

export default ToDoList;
