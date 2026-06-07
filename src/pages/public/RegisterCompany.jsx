import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import Input from "../../components/common/Input";

import { register } from "../../services/auth/authService";
import { createCompanyUser } from "../../services/users/userService";
import { createCompany } from "../../services/companies/companyService";

export default function RegisterCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    cnpj: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await register(
        formData.email,
        formData.password
      );

      const uid = userCredential.user.uid;

      await createCompanyUser({
        uid,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
      });

      await createCompany({
        uid,
        companyName: formData.companyName,
        cnpj: formData.cnpj,
        phone: formData.phone,
        whatsapp: formData.phone,
        email: formData.email,
        category: "",
        description: "",
      });

      navigate("/empresa/dashboard");
    } catch (err) {
      console.error(err);
      setError("Não foi possível criar a conta da empresa. Verifique os dados informados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <header className="iparty-container h-[66px] rounded-2xl bg-[linear-gradient(90deg,#282828_0%,#282828_76%,#C39F20_100%)] flex items-center justify-between px-8">
        <div className="flex items-center gap-10">
          <Link to="/">
            <img src={logo} alt="I Party" className="h-10 object-contain" />
          </Link>

          <Link
            to="/cadastro/cliente"
            className="gold-text font-bold text-sm md:text-base"
          >
            Quero criar conta cliente
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <span className="font-bold text-white">
            Já é um parceiro Iparty? então acesse:
          </span>

          <Link
            to="/login"
            className="border-2 gold-border gold-text rounded-full px-8 py-2 font-bold hover:bg-[#C39F20] hover:text-black transition"
          >
            Entrar
          </Link>
        </div>

        <Link
          to="/login"
          className="md:hidden border-2 gold-border gold-text rounded-full px-6 py-2 font-bold"
        >
          Entrar
        </Link>
      </header>

      <section className="min-h-[calc(100vh-90px)] flex items-center justify-center py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
          <h1 className="text-center text-white text-[32px] font-black mb-8">
            Cadastre-se
          </h1>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Nome da empresa"
              name="companyName"
              placeholder="Nome"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <Input
              label="CNPJ"
              name="cnpj"
              placeholder="CNPJ"
              value={formData.cnpj}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            className="mt-5"
            label="Insira seu endereço de email (obrigatório)"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="mt-5">
            <label className="block text-[#6F6F6F] text-sm mb-2">
              Insira seu número de telefone (obrigatório)
            </label>

            <div className="flex h-[46px] border border-[#C39F20] rounded-xl overflow-hidden">
              <span className="w-[54px] bg-[#C39F20] text-black font-bold flex items-center justify-center">
                +55
              </span>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Número de telefone"
                required
                className="flex-1 bg-black px-5 text-[#C39F20] placeholder:text-[#C39F20] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            <Input
              label="Insira uma senha (obrigatório)"
              name="password"
              type="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              label="Repita a senha (obrigatório)"
              name="confirmPassword"
              type="password"
              placeholder="Digite novamente"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[60px] mt-7 rounded-2xl bg-[#C39F20] text-black text-xl font-black hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </section>
    </main>
  );
}