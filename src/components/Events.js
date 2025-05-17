// CustomCalendar.jsx
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box, Typography, MenuItem, Select, Button, Dialog,
  DialogTitle, DialogContent, DialogActions,
  TextField, ButtonGroup
} from "@mui/material";
import "./CustomCalendar.css";
import ResponsiveDev from "./ResponsiveDev";
import JuUniVerseAxios from "../API/JuUniVerseAxios";
import Swal from "sweetalert2";

const localizer = momentLocalizer(moment);

const CustomCalendar = ({ reservations }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [refersh, setRefersh] = useState(0);
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
    location: false,
    time: false,
  });

  const getMinDateTime = () => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  };

  const [newEvent, setNewEvent] = useState({
    id: 0,
    title: "",
    description: "",
    location: "",
    time: "",
  });

  const AddEvent = () => {
    const errors = {
      title: newEvent.title.trim() === "",
      description: newEvent.description.trim() === "",
      location: newEvent.location.trim() === "",
      time: newEvent.time === "" || new Date(newEvent.time) <= new Date(),
    };

    setFormErrors(errors);

    if (Object.values(errors).some((v) => v)) return;

    JuUniVerseAxios.post(`/events`, {
      ...newEvent,
      time: moment(newEvent.time).toISOString(),
      date: "",
    }).then(() => {
      setNewEvent({ id: 0, title: "", description: "", location: "", time: "" });
      setOpenModal(false);
      setRefersh(refersh + 1);
    }).catch(console.error);
  };

  useEffect(() => {
    JuUniVerseAxios.get("/events").then(res => {
      const transformed = transformReservationsToEvents(res?.data?.data || []);
      setEvents(transformed);
      setData(res?.data?.data || []);
    }).catch(console.error);
  }, [refersh]);

  const transformReservationsToEvents = (reservations) => {
    return reservations.map(res => {
      const start = new Date(res.time);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      return {
        id: res.id,
        title: res.title,
        start,
        end,
        description: res.description,
        location: res.location,
      };
    });
  };

  const handleEventClick = (event) => setSelectedEvent(event);
  const handlePrev = () => setCurrentDate(moment(currentDate).subtract(1, 'month').toDate());
  const handleNext = () => setCurrentDate(moment(currentDate).add(1, 'month').toDate());
  const handleToday = () => setCurrentDate(new Date());

  const handleDelete = (event) => {
    Swal.fire({
      title: `Do you want to Delete "${event?.title}" ?`,
      showCancelButton: true,
      showDenyButton: true,
      showConfirmButton: false,
      denyButtonText: `Delete`
    }).then((result) => {
      if (result.isDenied) {
        JuUniVerseAxios.delete(`/events/${event.id}`).then(() => {
          Swal.fire({ title: 'Event Deleted Successfully!', icon: 'success', confirmButtonText: 'Ok' });
          setRefersh(refersh + 1);
        });
      }
    });
  };

  const CustomEvent = ({ event }) => (
    <Box className="custom-event" sx={{ backgroundColor: 'rgb(201, 198, 238)', borderRadius: 2, textAlign: 'left', display: 'flex', flexDirection: 'column', boxShadow: 2, padding: 1, maxHeight: 120, overflowY: 'auto', width: '100%', fontSize: '0.75rem', position: 'relative' }}>
      {sessionStorage.getItem("role") === "ADMIN" && (
        <span onClick={() => handleDelete(event)} style={{ color: 'red', position: 'absolute', top: 4, right: 8, fontWeight: 'bolder', fontSize: '1rem', lineHeight: 1, cursor: 'pointer' }}>X</span>
      )}
      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'black' }}>{event.title}</Typography>
      <Typography variant="caption" sx={{ color: 'black' }}>{event.description || 'No description'}</Typography>
      <Typography variant="caption" sx={{ color: 'black' }}>Location: {event.location || 'No location'}</Typography>
    </Box>
  );

  return (
    <ResponsiveDev sx={{ padding: 3 }}>
      <Box sx={{ border: "1px solid #ddd", padding: 2 }}>
        <Select value={view} onChange={(e) => setView(e.target.value)} size="small" sx={{ mb: 2, minWidth: 120, float: "right" }}>
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="week">Week</MenuItem>
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="agenda">Agenda</MenuItem>
        </Select>
        {sessionStorage.getItem("role") === "ADMIN" && <Button sx={{ float: 'right', mr: 4 }} variant="contained" onClick={() => setOpenModal(true)}>Add Event</Button>}

        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <TextField label="Title" fullWidth value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} sx={{ mb: 2 }} error={formErrors.title} helperText={formErrors.title ? "Title is required" : ""} />
            <TextField label="Description" fullWidth value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} sx={{ mb: 2 }} error={formErrors.description} helperText={formErrors.description ? "Description is required" : ""} />
            <TextField label="Location" fullWidth value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} sx={{ mb: 2 }} error={formErrors.location} helperText={formErrors.location ? "Location is required" : ""} />
            <TextField label="Time" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={newEvent.time} inputProps={{ min: getMinDateTime() }} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} error={formErrors.time} helperText={newEvent.time === "" && formErrors.time ? "Date is required"
 :formErrors.time?"Time must be in the future":""} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenModal(false); setNewEvent({ id: 0, title: "", description: "", location: "", time: "" }); setFormErrors({ title: false, description: false, location: false, time: false }); }}>Cancel</Button>
            <Button variant="contained" onClick={AddEvent}>Save</Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>{moment(currentDate).format("MMMM YYYY")}</Typography>
        <ButtonGroup variant="contained">
          <Button onClick={handleToday}>Current</Button>
          <Button onClick={handlePrev}>Back</Button>
          <Button onClick={handleNext}>Next</Button>
        </ButtonGroup>
      </Box>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={{ month: true, week: true, day: true, agenda: true }}
        view={view}
        onView={(newView) => setView(newView)}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        components={{ event: CustomEvent }}
        style={{ height: 500 }}
        defaultDate={currentDate}
        toolbar={false}
        className="hide-toolbar"
        onSelectEvent={handleEventClick}
      />
      <br /><br />
    </ResponsiveDev>
  );
};

export default CustomCalendar;
