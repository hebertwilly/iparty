import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 mt-20">
      <div className="iparty-container w-full py-12 flex flex-col items-start justify-start">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Logo */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <img
              src={logo}
              alt="I Party"
              className="h-12 object-contain"
            />

            <p className="text-gray-400 text-sm text-center lg:text-left max-w-[300px]">
              Marketplace especializado em conectar clientes e
              empresas do segmento de festas e eventos.
            </p>
          </div>

          {/* Navegação */}
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              to="/login"
              className="text-white hover:text-[#C39F20] transition"
            >
              Entrar
            </Link>

            <Link
              to="/cadastro/cliente"
              className="text-white hover:text-[#C39F20] transition"
            >
              Criar Conta
            </Link>

            <Link
              to="/login-empresa"
              className="text-white hover:text-[#C39F20] transition"
            >
              Para Empresas
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="gold-text font-medium">
              I Party
            </span>
            . Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}