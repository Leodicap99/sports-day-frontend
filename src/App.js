import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Events from "./components/Events";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { useContext, useState } from "react";
import { AuthContext } from "./Auth/AuthContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from '@mui/icons-material/LightMode';
export function Layout() {
  const { setLogin,darkMode,toggleMode } = useContext(AuthContext);
  const location = useLocation();
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        className={`flex justify-between items-center pt-4 mx-4 mb-6 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <h1 className="flex-1 text-center text-3xl font-bold">
          Sports Day Event
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMode}
            data-testid="dark-mode-button"
            className="flex items-center bg-gray-200 p-2 rounded-md hover:bg-blue-500 dark:hover:bg-yellow-300 hover:cursor-pointer"
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
          {location.pathname === "/events" && (
            <button
              onClick={setLogin}
              className="bg-red-500 text-white p-2 sm:p-4 border rounded-md text-xs border-red-900 hover:bg-red-900"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
