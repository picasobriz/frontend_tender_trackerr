import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Bids from "./pages/Bids";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenderDetail from "./pages/TenderDetail";
import Tenders from "./pages/Tenders";

const guard = (page, roles) => (
  <ProtectedRoute roles={roles}>{page}</ProtectedRoute>
);

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={guard(<Dashboard />)} />
          <Route path="/tenders" element={guard(<Tenders />)} />
          <Route path="/tenders/:id" element={guard(<TenderDetail />)} />
          <Route
            path="/bids"
            element={guard(<Bids />, ["admin", "contractor"])}
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </>
  );
}