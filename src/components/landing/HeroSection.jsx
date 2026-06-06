import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero-party.jpg";

export default function HeroSection() {
  return (
    <section className="relative w-full">
      <img
        src={heroImage}
        alt="Festa"
        className="w-full h-[420px] sm:h-[520px] md:h-[610px] object-cover"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex items-start pt-[200px]">
        <div className="w-[80%] max-w-[1290px] mx-auto">
          <div className="max-w-[520px]">
            <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-black leading-[1.15] text-white uppercase">
              TUDO PARA SUA{" "}
              <span className="bg-gradient-to-r from-[#FFFFFF] via-[#D7C079] to-[#C39F20] bg-clip-text text-transparent">
                FESTA OU
              </span>{" "}
              EVENTO !
            </h1>

            <p className="mt-3 text-[14px] sm:text-[16px] text-white leading-snug max-w-[470px]">
              A i party é um marketplace voltado para festas e eventos.
              Aqui você vai encontrar os melhores fornecedores de
              produtos e serviços para sua festa.
            </p>

            <button
              type="button"
              onClick={() =>
                document.getElementById("como-funciona")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="mt-1 text-[14px] font-bold text-[#C39F20] hover:underline"
            >
              Saiba mais...
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
