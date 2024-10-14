import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Events from './components/Events';
import ProtectedRoute from './Auth/ProtectedRoute';
import { useContext } from 'react';
import { AuthContext } from './Auth/AuthContext';

function Layout() {
  const {setLogin} = useContext(AuthContext);
  const location = useLocation();
  return (
    <div className="bg-gray-100">
      <div className="flex justify-end pt-4 mr-4">
        {location.pathname === "/events" && (
          <button
            onClick={setLogin}
            className="bg-red-500  text-white p-2 sm:p-4 border rounded-md text-xs  border-red-900 hover:bg-red-900"
          >
            Logout
          </button>
        )}
      </div>
      <h1 className="text-center text-3xl font-bold mb-6 text-gray-800  ">
        Sports Day Event
      </h1>
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
function App(){
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App;
