// Dashboard.js
import React from 'react';
import OrderTable from './OrderTable';
import EditProfile from './EditProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <OrderTable />
        </div>
        <div className="col-md-6">
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
