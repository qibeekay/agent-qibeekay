import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TerminalFooter from "./components/home/TerminalFooter";
import Admin from "./pages/Admin";
import { isAuthenticated } from "./api/api";
import Login from "./pages/Login";

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
          <Route path="/admin-path/login" element={<Login />} />
          <Route
            path="/admin-path/projects"
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
