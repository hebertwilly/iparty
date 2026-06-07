import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import Input from "../../components/common/Input";

import { register } from "../../services/auth/authService";
import { createCompanyUser } from "../../services/users/userService";
import { createCompany } from "../../services/companies/companyService";
import { getAddressByCep } from "../../services/cep/cepService";

export default function RegisterCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    cnpj: "",
    category: "",
    email: "",
    phone: "",
    zipCode: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepBlur = async () => {
    if (!formData.zipCode) return;

    try {
      setError("");
      setLoadingCep(true);

      const address = await getAddressByCep(formData.zipCode);

      setFormData((prev) => ({
        ...prev,
        zipCode: address.zipCode,
        street: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
      }));
    } catch (err) {
      console.error(err);
      setError("Não foi possível buscar o CEP informado.");
    } finally {
      setLoadingCep(false);
    }
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
        category: formData.category,
        address: {
          zipCode: formData.zipCode,
          street: formData.street,
          number: formData.number,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          country: "Brasil",
        },
        description: "",
      });

      navigate("/empresa/dashboard");
    } catch (err) {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        setError(
          "Este e-mail já está cadastrado. Tente fazer login ou utilize outro e-mail."
        );
        return;
      }

      if (err.code === "auth/weak-password") {
        setError("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      if (err.code === "auth/invalid-email") {
        setError("Informe um e-mail válido.");
        return;
      }

      setError(
        "Não foi possível criar a conta da empresa. Verifique os dados informados."
      );
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
            Já possui uma conta empresarial? então acesse:
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
        <form onSubmit={handleSubmit} className="w-full max-w-[620px]">
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

          <div className="mt-5">
            <label className="block text-[#6F6F6F] text-sm mb-2">
              Categoria de serviço
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full h-[46px] bg-black border border-[#C39F20] rounded-xl px-5 text-[#C39F20] outline-none focus:ring-1 focus:ring-[#C39F20]"
            >
              <option value="">Selecione uma categoria</option>
              <option value="buffet">Buffet</option>
              <option value="decoracao">Decoração</option>
              <option value="dj">DJ</option>
              <option value="musica">Música</option>
              <option value="espaco-eventos">Espaço para eventos</option>
              <option value="cerimonial">Cerimonial</option>
              <option value="seguranca">Segurança</option>
              <option value="bartender">Bartender</option>
              <option value="food">Food</option>
              <option value="outros">Outros</option>
            </select>
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
              label="CEP"
              name="zipCode"
              placeholder={loadingCep ? "Buscando..." : "CEP"}
              value={formData.zipCode}
              onChange={handleChange}
              onBlur={handleCepBlur}
              required
            />

            <Input
              label="Rua"
              name="street"
              placeholder="Rua"
              value={formData.street}
              onChange={handleChange}
              required
            />

            <Input
              label="Número"
              name="number"
              placeholder="Número"
              value={formData.number}
              onChange={handleChange}
              required
            />

            <Input
              label="Bairro"
              name="neighborhood"
              placeholder="Bairro"
              value={formData.neighborhood}
              onChange={handleChange}
              required
            />

            <Input
              label="Cidade"
              name="city"
              placeholder="Cidade"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <Input
              label="Estado"
              name="state"
              placeholder="UF"
              value={formData.state}
              onChange={handleChange}
              maxLength={2}
              required
            />
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