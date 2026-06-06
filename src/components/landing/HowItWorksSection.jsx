import {
  UserCirclePlus,
  MagnifyingGlass,
  Handshake,
  Star,
} from "@phosphor-icons/react";

const steps = [
  {
    icon: UserCirclePlus,
    title: "Cadastre-se",
    description:
      "Primeiro passo na I party é criar sua conta, para ter acesso aos serviços e empresas",
  },
  {
    icon: MagnifyingGlass,
    title: "Pesquise",
    description:
      "Após ter acesso a plataforma você poderá pesquisar por diversos serviços relacionados a festas e eventos",
  },
  {
    icon: Handshake,
    title: "Feche negócio",
    description:
      "Através da I party você poderá selecionar os serviços que precisa e enviar o pedido para a empresa e fechar negócio",
  },
  {
    icon: Star,
    title: "Avaliação",
    description:
      "Avalie e comente sobre a experiência que teve com a empresa que contratou. isso ajuda a ranquear as melhores empresas.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-black py-16 md:py-20">
      <div className="w-[90%] max-w-[1290px] mx-auto">
        <div className="flex items-center justify-between gap-6 mb-14">
          <h2 className="gold-gradient-text text-[18px] md:text-[24px] font-black uppercase">
            COMO FUNCIONA A I PARTY?
          </h2>

          <a
            href="/cadastro/cliente"
            className="hidden sm:inline-flex border-2 border-[#C39F20] text-[#C39F20] rounded-full px-8 py-2 text-sm font-bold hover:bg-[#C39F20] hover:text-black transition"
          >
            Criar conta
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 justify-items-center">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="w-full max-w-[220px] min-h-[230px] bg-[#0F0F0F] rounded-xl px-6 py-7 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Icon
                    size={28}
                    weight="regular"
                    className="text-[#C39F20]"
                  />

                  <h3 className="text-[#C39F20] text-[15px] font-black">
                    {step.title}
                  </h3>
                </div>

                <p className="text-white text-[14px] leading-snug">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="sm:hidden flex justify-center mt-10">
          <a
            href="/cadastro/cliente"
            className="border-2 border-[#C39F20] text-[#C39F20] rounded-full px-8 py-2 text-sm font-bold hover:bg-[#C39F20] hover:text-black transition"
          >
            Criar conta
          </a>
        </div>
      </div>
    </section>
  );
}