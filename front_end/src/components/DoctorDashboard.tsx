import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

interface PatientAppointment {
  id: number;
  patient_name: string;
  date: string;
  time: string;
}

const DoctorDashboard: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetching the doctor details and today's appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorId = 1; // Replace this with the actual ID or fetched from context/auth
        const doctorRes = await axios.get(`http://localhost:5000/api/doctors/${doctorId}`);
        setDoctor(doctorRes.data);
        
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const appointmentsRes = await axios.get(`http://localhost:5000/api/appointments/today?doctorId=${doctorId}&date=${today}`);
        setAppointments(appointmentsRes.data);
      } catch (error) {
        console.error("Error fetching doctor details or appointments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {doctor ? (
        <>
          <Typography variant="h4">Welcome, Dr. {doctor.name}</Typography>
          <Typography variant="h6">Specialty: {doctor.specialty}</Typography>
          <Typography variant="h5" sx={{ marginTop: 2 }}>Today's Appointments:</Typography>
          <List>
            {appointments.length > 0 ? (
              appointments.map(appointment => (
                <ListItem key={appointment.id}>
                  <ListItemText primary={appointment.patient_name} secondary={`${appointment.date} at ${appointment.time}`} />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No appointments for today." />
              </ListItem>
            )}
          </List>
        </>
      ) : (
        <Typography variant="h6">Doctor not found.</Typography>
      )}
    </Box>
  );
};

export default DoctorDashboard;
