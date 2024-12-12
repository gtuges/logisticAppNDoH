import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BatchProvider } from './contexts/BatchContext';
import { SidebarProvider } from './contexts/SidebarContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import BatchesPage from './pages/BatchesPage';
import DispatchesPage from './pages/DispatchesPage';
import FacilitiesPage from './pages/FacilitiesPage';
import FacilityTypesPage from './pages/settings/FacilityTypesPage';
import UsersPage from './pages/settings/users/UsersPage';
import PermissionsPage from './pages/settings/permissions/PermissionsPage';

const App = () => {
  return (
    <SidebarProvider>
      <BatchProvider>
        <Router>
          <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 w-full lg:w-auto min-h-screen overflow-x-hidden ml-16 lg:ml-16">
              <div className="pt-4">
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/batches" element={<BatchesPage />} />
                  <Route path="/dispatches" element={<DispatchesPage />} />
                  <Route path="/settings/facilities" element={<FacilitiesPage />} />
                  <Route path="/settings/facility-types" element={<FacilityTypesPage />} />
                  <Route path="/settings/users" element={<UsersPage />} />
                  <Route path="/settings/permissions" element={<PermissionsPage />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </main>
          </div>
        </Router>
      </BatchProvider>
    </SidebarProvider>
  );
};

export default App;