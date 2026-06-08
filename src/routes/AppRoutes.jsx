import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import Login from "../pages/public/Login";
import RegisterClient from "../pages/public/RegisterClient";
import RegisterCompany from "../pages/public/RegisterCompany";
import ClientDashboard from "../pages/client/ClientDashboard";
import CompanyDashboard from "../pages/company/CompanyDashboard";
import AuthGuard from "./guards/AuthGuard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro/cliente" element={<RegisterClient />} />
        <Route path="/cadastro/empresa" element={<RegisterCompany />} />

        {/* Rotas privadas do cliente */}
        <Route
          path="/cliente/dashboard"
          element={
            <AuthGuard allowedRoles={["client"]}>
              <ClientDashboard />
            </AuthGuard>
          }
        />

        {/* Rotas privadas da empresa */}
        <Route
          path="/empresa/dashboard"
          element={
            <AuthGuard allowedRoles={["company"]}>
              <CompanyDashboard />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}