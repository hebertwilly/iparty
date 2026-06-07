import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import { login } from "../../services/auth/authService";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, loadingAuth } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loadingAuth || !user?.role) return;

    if (user.role === "client") {
      navigate("/cliente/dashboard");
    }

    if (user.role === "company") {
      navigate("/empresa/dashboard");
    }
  }, [user, loadingAuth, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      await login(formData.email, formData.password);
    } catch (err) {
      console.error(err);
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <header className="iparty-container h-[66px] rounded-2xl bg-[linear-gradient(90deg,#282828_0%,#282828_76%,#C39F20_100%)] flex items-center justify-between px-8">
        <Link to="/">
          <img src={logo} alt="I Party" className="h-10 object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <span className="font-bold text-white">
            Ainda não possui conta? cadastre-se:
          </span>

          <Link
            to="/cadastro/cliente"
            className="gold-text font-bold underline"
          >
            Conta cliente
          </Link>

          <Link
            to="/cadastro/empresa"
            className="text-white font-bold underline hover:text-[#C39F20] transition"
          >
            Conta empresa
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link
            to="/cadastro/cliente"
            className="gold-text text-sm font-bold underline"
          >
            Cliente
          </Link>

          <Link
            to="/cadastro/empresa"
            className="text-white text-sm font-bold underline"
          >
            Empresa
          </Link>
        </div>
      </header>

      <section className="min-h-[calc(100vh-90px)] flex items-center justify-center">
        <div className="iparty-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="hidden lg:block">
            <img
              src={logo}
              alt="I Party"
              className="w-[420px] max-w-full object-contain mb-8"
            />

            <h1 className="gold-text text-[28px] font-medium tracking-wide mb-8">
              TUDO PARA SEU EVENTO
            </h1>

            <p className="max-w-[560px] text-[22px] leading-snug text-white">
              A i Party conecta você aos{" "}
              <span className="gold-text">
                melhores fornecedores de serviços e produtos do ramo de eventos
                de um jeito
              </span>{" "}
              rápido, fácil, simples e com segurança.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[510px] mx-auto border-2 gold-border rounded-2xl px-6 sm:px-8 md:px-10 py-14"
          >
            <h2 className="text-center text-white text-[22px] font-black mb-10">
              Entre ou Cadastre-se
            </h2>

            {error && (
              <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Nome de usuário ou email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-[60px] bg-black border-2 border-[#A1A1A1] rounded-2xl px-8 text-white placeholder:text-[#A1A1A1] outline-none focus:border-[#C39F20] mb-6"
            />

            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-[60px] bg-black border-2 border-[#A1A1A1] rounded-2xl px-8 text-white placeholder:text-[#A1A1A1] outline-none focus:border-[#C39F20]"
            />

            <div className="flex justify-end mt-3 mb-8">
              <Link
                to="/recuperar-senha"
                className="gold-text text-[16px] hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || loadingAuth}
              className="w-full max-w-[280px] h-[58px] mx-auto flex items-center justify-center rounded-full border-2 gold-border gold-text text-xl font-black hover:bg-[#C39F20] hover:text-black transition disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}