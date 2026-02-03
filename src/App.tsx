import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { isAuthenticated } from "./api/api";
import Login from "./pages/Login";

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH;

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`${ADMIN_PATH}/login`} element={<Login />} />
          <Route
            path={`${ADMIN_PATH}/projects`}
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
