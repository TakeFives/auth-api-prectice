import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContextProvider';
import ProtectedRoute from './components/global/ProtectedRoute';

import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Recipes from './components/pages/Recipes';

import Header from './components/global/Header';

import './App.css';

function App() {
 
  return (
    <AuthContextProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <Recipes />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;