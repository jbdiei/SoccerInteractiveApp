// src/App.tsx
import  {useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router";

import { DarkModeProvider } from './context/DarkModeContext';
import Navbar from './components/Navbar';

import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs';
import ProgramDetails from './pages/ProgramDetails';
import History from './pages/History';
import LoginPage from './pages/LoginPage';
import { ValidRoutes }        from "../../backend/src/shared/ValidRoutes";
import { ProtectedRoute } from './ProtectedRoute';

function AppRoutes() {

  const navigate = useNavigate();

// ─── 1) Auth state + redirect callback ───
  const [authToken, setAuthToken] = useState<string>("");
  function handleAuthSuccess(token: string) {
    setAuthToken(token);
    // Redirect immediately upon login or registration
    navigate("/", { replace: true });
  }
  return (
    <DarkModeProvider>
      
        <Navbar />

        <Routes>
  <Route
    path={ValidRoutes.HOME}
    element={
      <ProtectedRoute authToken={authToken}>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path={ValidRoutes.PROGRAMS}
    element={
      <ProtectedRoute authToken={authToken} >
        <Programs authToken={authToken}/>
      </ProtectedRoute>
    }
  />
  <Route
    path={ValidRoutes.PROGRAMDETAIL}
    element={
      <ProtectedRoute authToken={authToken}>
        <ProgramDetails authToken={authToken}/>
      </ProtectedRoute>
    }
  />
  <Route
    path={ValidRoutes.HISTORY}
    element={
      <ProtectedRoute authToken={authToken}>
        <History authToken={authToken}/>
      </ProtectedRoute>
    }
  />
  <Route
    path={ValidRoutes.LOGIN}
    element={
      <LoginPage isRegistering={false} onAuthSuccess={handleAuthSuccess} />
    }
  />
  <Route
    path="/register"
    element={
      <LoginPage isRegistering={true} onAuthSuccess={handleAuthSuccess} />
    }
  />
</Routes>
      
     </DarkModeProvider>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
