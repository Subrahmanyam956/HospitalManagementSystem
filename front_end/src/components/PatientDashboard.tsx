import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

interface MedicalHistory {
  description: string;
  treated_by: string;
}

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  medicalHistory: MedicalHistory[];
}

const PatientDashboard: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetching the patient details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientId = 1; // Replace with actual logged-in patient's ID
        const res = await axios.get(`http://localhost:5000/api/patients/${patientId}`);
        setPatient(res.data);
      } catch (error) {
        console.error("Error fetching patient details: ", error);
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
      {patient ? (
        <>
          <Typography variant="h4">Welcome, {patient.name}</Typography>
          <Typography variant="h6">Email: {patient.email}</Typography>
          <Typography variant="h6">Phone: {patient.phone}</Typography>
          <Typography variant="h5" sx={{ marginTop: 2 }}>Medical History:</Typography>
          <ul>
            {patient.medicalHistory.length > 0 ? (
              patient.medicalHistory.map((item, index) => (
                <li key={index}>
                  {item.description} - Treated by: {item.treated_by}
                </li>
              )) 
            ) : (
              <Typography>No medical history available.</Typography>
            )}
          </ul>
        </>
      ) : (
        <Typography variant="h6">Patient not found.</Typography>
      )}
    </Box>
  );
};

export default PatientDashboard;
