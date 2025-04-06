import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box, Typography, MenuItem, Select, Button, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import "./CustomCalendar.css";
import ResponsiveDev from "./ResponsiveDev";
import JuUniVerseAxios from "../API/JuUniVerseAxios";
import Swal from "sweetalert2";
const localizer = momentLocalizer(moment);

const usedColors = new Set(); // Store used colors




const CustomCalendar = ({ reservations }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [refersh, setRefersh] = useState(0);
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [newEvent, setNewEvent] = useState({
    id:0,
    title: "",
    description: "",
    location: "",
    time: "",
  });
  
const AddEvent =()=>{
  try{
JuUniVerseAxios.post(`/events`,{...newEvent,time:moment(newEvent.time).toISOString(),date:""}).then(res=>{
  setNewEvent({
    id:0,
    title: "",
    description: "",
    location: "",
    time: "",
  })
  setOpenModal(false)
  setRefersh(refersh+1)

})  }
  catch (error) {
    console.error(error);
  }


}
  useEffect(() => {
    const getAllEvents = () => {
      try {
        JuUniVerseAxios.get("/events").then(res => {

          console.log(res);
          const transformedEvents = transformReservationsToEvents(res?.data?.data || []);
          console.log(transformedEvents);

          setEvents(transformedEvents)
          setData(res?.data?.data || []);
        });
      } catch (error) {
        console.error(error);
      }
    };

    getAllEvents();
    console.log(data)

  }, [refersh]);
  // Function to transform API response to Calendar Events
  const transformReservationsToEvents = (reservations) => {
    console.log(reservations);

    return reservations.map((res) => {
      const start = new Date(res.time);
      const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour

      return {
        id:res.id,

        title: res.title,
        start,
        end,
        description: res.description,
        location: res.location,
      };
    });

  };
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set the selected event to display in the modal
  
    console.log(event);
    
  };
 const handleDelete=()=>{
  Swal.fire({
    title: `Do you want to Delete "${selectedEvent.title}" ?`,
    showCancelButton: true,
    showDenyButton: true,
    showConfirmButton: false,
    denyButtonText: `Delete`
  }).then((result) => {
    if (result.isDenied) {
// Optionally show a success message after deletion
JuUniVerseAxios.delete(`/events/${selectedEvent.id}`).then(res=>{

Swal.fire({
  title: 'Event Deleted Successfully!',
  icon: 'success',
  confirmButtonText: 'Ok'
});
setRefersh(refersh+1)

})
    }
  });
 }
 const CustomEvent = ({ event }) => {
  return (
    <Box
      className="custom-event"
      sx={{
        backgroundColor: 'rgb(201, 198, 238)',
        borderRadius: 2,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 2,
        padding: 1,
        maxHeight: 120,
        overflowY: 'auto',
        width: '100%',
        fontSize: '0.75rem',
        position: 'relative',
      }}
    >
      {/* Delete Button */}
      <span
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering parent calendar click
          handleDelete();
        }}
        style={{
          color: 'red',
          position: 'absolute',
          top: 4,
          right: 8,
          fontWeight:'bolder',
          fontSize:'35px',
          cursor: 'pointer',
          fontSize: '1rem',
          lineHeight: 1,
        }}
      >
        X
      </span>

      {/* Event Info */}
      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'black' }}>
        {event.title}
      </Typography>
      <Typography variant="caption" sx={{ color: 'black' }}>
        {event.description || 'No description'}
      </Typography>
      <Typography variant="caption" sx={{ color: 'black' }}>
      Location: {event.location || 'No location'}
      </Typography>
    </Box>
  );
};

  return (
    <ResponsiveDev sx={{ padding: 3 }}>
      <Box sx={{ border: "1px solid #ddd", padding: 2, marginBottom: 0 }}>
        <Select
          value={view}
          onChange={(e) => setView(e.target.value)}
          size="small"
          sx={{
            marginBottom: 2,
            minWidth: 120,
            float: "right",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#ddd" },
              "&.Mui-focused fieldset": { borderColor: "#ddd" },
            },
          }}
        >
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="week">Week</MenuItem>
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="agenda">Agenda</MenuItem>
        </Select>
        <Button sx={{ float: 'right', marginRight: 4 }} variant="contained" color="primary"   onClick={() => setOpenModal(true)}
        >Add Event</Button>
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
  <DialogTitle>Add New Event</DialogTitle>
  <DialogContent>
    <TextField
      label="Title"
      fullWidth
      value={newEvent.title}
      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
      sx={{ mb: 2 }}
    />
    <TextField
      label="Description"
      fullWidth
      value={newEvent.description}
      onChange={(e) =>
        setNewEvent({ ...newEvent, description: e.target.value })
      }
      sx={{ mb: 2 }}
    />
    <TextField
      label="Location"
      fullWidth
      value={newEvent.location}
      onChange={(e) =>
        setNewEvent({ ...newEvent, location: e.target.value })
      }
      sx={{ mb: 2 }}
    />
    <TextField
      label="Time"
      type="datetime-local"
      fullWidth
      InputLabelProps={{ shrink: true }}
      value={newEvent.time}
      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenModal(false)}>Cancel</Button>
    <Button
      variant="contained"
      onClick={AddEvent}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {moment(currentDate).format("MMMM YYYY")}
        </Typography>
      </Box>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={{ month: true, week: true, day: true, agenda: true }}
        view={view}
        onView={(newView) => setView(newView)}
        onNavigate={(date) => setCurrentDate(date)}
        components={{ event: CustomEvent }}
        style={{ height: 500 }}
        defaultDate={currentDate}
        toolbar={false}
        className="hide-toolbar"
        onSelectEvent={handleEventClick} // Attach the event click handler

      />
    </ResponsiveDev>
  );
};

export default CustomCalendar;
