// frontend/src/Dashboard.tsx
import React from 'react';
import AdminDashboard from './AdminDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';

interface DashboardProps {
  userRole: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      {userRole === 'admin' && <AdminDashboard />}
      {userRole === 'doctor' && <DoctorDashboard />}
      {userRole === 'patient' && <PatientDashboard />}
    </div>
  );
};

export default Dashboard;
