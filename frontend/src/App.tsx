import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import OwnersPage from "./pages/owners/OwnersPage";
import PetsPage from "./pages/pets/PetsPage";
import VeterinariansPage from "./pages/veterinarians/VeterinariansPage";
import AppointmentsPage from "./pages/appointments/AppointmentsPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/owners"
        element={
          <ProtectedRoute>
            <OwnersPage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/pets"
        element={
          <ProtectedRoute>
            <PetsPage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/veterinarians"
        element={
          <ProtectedRoute>
            <VeterinariansPage />
          </ProtectedRoute>
        }
      />
      <Route
  path="/appointments"
  element={
    <ProtectedRoute>
      <AppointmentsPage />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;