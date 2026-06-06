import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import Login from "../pages/public/Login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}