import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import Login from "../pages/public/Login";
import RegisterClient from "../pages/public/RegisterClient";
import RegisterCompany from "../pages/public/RegisterCompany";
import ClientDashboard from "../pages/client/ClientDashboard";
import CompanyDashboard from "../pages/company/CompanyDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro/cliente" element={<RegisterClient />} />
        <Route path="/cadastro/empresa" element={<RegisterCompany />} />
        <Route path="/cliente/dashboard" element={<ClientDashboard />} />
        <Route path="/empresa/dashboard" element={<CompanyDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}