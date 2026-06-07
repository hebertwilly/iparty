import { useAuth } from "../../contexts/AuthContext";

export default function ClientDashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-black gold-gradient-text mb-6">
        Dashboard Cliente
      </h1>

      <div className="card-dark border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Usuário autenticado</h2>

        <pre className="bg-black border border-white/10 rounded-xl p-4 overflow-auto text-sm text-gray-300">
          {JSON.stringify(user, null, 2)}
        </pre>

        <button
          type="button"
          onClick={logout}
          className="mt-6 bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Sair
        </button>
      </div>
    </main>
  );
}