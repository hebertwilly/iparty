import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function CompanyDashboard() {
  const { userData, logout } = useAuth();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-black mb-6">
        Dashboard Empresa
      </h1>

      <div className="space-y-4">
        <p>
          Bem-vindo,
          {" "}
          {userData?.displayName}
        </p>

        <Link
          to="/empresa/perfil"
          className="inline-flex px-6 py-3 rounded-xl bg-[#C39F20] text-black font-bold"
        >
          Editar Perfil
        </Link>

        <button
          onClick={logout}
          className="block bg-red-500 px-6 py-3 rounded-xl font-bold"
        >
          Sair
        </button>
      </div>
    </main>
  );
}