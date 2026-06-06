import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Navbar() {
  return (
    <header className="fixed top-2 left-0 w-full z-50 px-4">
      <nav className="
    w-[100%]
    max-w-[1290px]
    mx-auto
    min-h-[66px]
    rounded-2xl
    overflow-hidden
    flex
    items-center
    justify-between
    px-6
    md:px-10
    backdrop-blur-md
    bg-[linear-gradient(90deg,rgba(40,40,40,0.78)_0%,rgba(40,40,40,0.78)_76%,rgba(195,159,32,0.82)_100%)]
  ">
        <div className="flex items-center gap-7">
          <Link to="/">
            <img src={logo} alt="Iparty" className="h-8 md:h-10 object-contain" />
          </Link>

          <Link
            to="/login"
            className="border-2 border-[#C39F20] text-[#C39F20] rounded-full px-6 py-2 text-sm md:text-base font-bold hover:bg-[#C39F20] hover:text-black transition"
          >
            Entrar
          </Link>

          <Link
            to="/cadastro/cliente"
            className="text-white text-sm md:text-base font-bold hover:text-[#C39F20] transition"
          >
            Criar Conta
          </Link>
        </div>

        <div className="flex flex-row gap-[20px]">
          <Link
          to="/login"
          className="text-white text-sm md:text-base font-bold hover:text-black transition"
          >
            Login Empresa
          </Link>
          <Link
          to="/cadastro/empresa"
          className="text-white text-sm md:text-base font-bold hover:text-black transition"
          >
            Criar conta empresa
          </Link>
        </div>

      </nav>
    </header>
  );
}