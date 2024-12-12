import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { BatchProvider } from './contexts/BatchContext';
import { useSidebarContext, SidebarProvider } from './contexts/SidebarContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import BatchesPage from './pages/BatchesPage';
import DispatchesPage from './pages/DispatchesPage';
import FacilitiesPage from './pages/FacilitiesPage';
import FacilityTypesPage from './pages/settings/FacilityTypesPage';

const AppContent = () => {
  const { isOpen, toggle } = useSidebarContext();

  return (
    <BatchProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 w-full lg:w-auto min-h-screen overflow-x-hidden ml-16 lg:ml-16">
            <div className="pt-4">
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/batches" element={<BatchesPage />} />
                <Route path="/dispatches" element={<DispatchesPage />} />
                <Route path="/settings/facilities" element={<FacilitiesPage />} />
                <Route path="/settings/facility-types" element={<FacilityTypesPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </main>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                }
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                }
              }
            }}
          />
        </div>
      </Router>
    </BatchProvider>
  );
};

const App = () => {
  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  );
};

export default App;