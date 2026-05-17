import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Admin Route */}

      <Route
        path="/admin-dashboard"
        element={
          user?.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* User Dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;