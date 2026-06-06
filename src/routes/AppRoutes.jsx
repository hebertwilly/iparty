import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import Login from "../pages/public/Login";
import RegisterClient from "../pages/public/RegisterClient";
import RegisterPartner from "../pages/public/RegisterPartner";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro/cliente" element={<RegisterClient />} />
        <Route path="/cadastro/empresa" element={<RegisterPartner />} />
      </Routes>
    </BrowserRouter>
  );
}