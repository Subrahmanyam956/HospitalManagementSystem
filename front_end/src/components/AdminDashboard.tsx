import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';
import axios from 'axios';

// Define the types for the data structures
interface Employee {
  id: number;
  name: string;
  position: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

interface Appointment {
  id: number;
  patient_name: string;
  doctor: string;
  date: string;
  time: string;
}

interface PrivateRoom {
  id: number;
  room_number: string;
  status: string;
}

// Tab panel component
const TabPanel: React.FC<{ children: React.ReactNode; index: number; value: number }> = ({ children, index, value }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};



const AdminDashboard: React.FC = () => {
  const [value, setValue] = useState(0);

  // Specify the type of the state arrays
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [privateRooms, setPrivateRooms] = useState<PrivateRoom[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesRes, doctorsRes, appointmentsRes, privateRoomsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/employees'),
          axios.get('http://localhost:5000/api/doctors'),
          axios.get('http://localhost:5000/api/appointments'),
          axios.get('http://localhost:5000/api/private_rooms'),
        ]);

        setEmployees(employeesRes.data);
        setDoctors(doctorsRes.data);
        setAppointments(appointmentsRes.data);
        setPrivateRooms(privateRoomsRes.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="List of Employees" />
          <Tab label="Doctors" />
          <Tab label="All Appointments" />
          <Tab label="All Private Rooms" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <h2>List of Employees</h2>
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>{employee.name} - {employee.position}</li>
          ))}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Doctors</h2>
        <ul>
          {doctors.map(doctor => (
            <li key={doctor.id}>{doctor.name} - {doctor.specialty}</li>
          ))}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>All Appointments</h2>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              {appointment.patient_name} with {appointment.doctor} on {appointment.date} at {appointment.time}
            </li>
          ))}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h2>All Private Rooms</h2>
        <ul>
          {privateRooms.map(room => (
            <li key={room.id}>Room {room.room_number} - Status: {room.status}</li>
          ))}
        </ul>
      </TabPanel>
    </Box>
  );
};

export default AdminDashboard;
