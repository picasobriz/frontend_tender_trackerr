import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TenderList from "./pages/TenderList";
import TenderDetail from "./pages/TenderDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tenders" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tenders" element={<TenderList />} />
        <Route path="/tenders/:id" element={<TenderDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
