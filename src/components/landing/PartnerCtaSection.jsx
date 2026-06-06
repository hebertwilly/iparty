import {
  UserCirclePlus,
  Images,
  Handshake,
  Star,
} from "@phosphor-icons/react";

import partnerImage from "../../assets/images/company-section.jpg";

const steps = [
  {
    icon: UserCirclePlus,
    title: "Cadastre-se",
    description:
      "Primeiro passo na I party para empresas, é criar sua conta, para poder divulgar seu produto ou serviço",
  },
  {
    icon: Images,
    title: "Adicione",
    description:
      "Após ter acesso a plataforma você poderá adicionar seu serviço ou produto e imagens dos mesmos e de seus eventos",
  },
  {
    icon: Handshake,
    title: "Feche negócio",
    description:
      "Através da I party você poderá divulgar seu trabalho e fechar orçamentos e negócios com seus clientes que entrarão em contato pelo whatsapp",
  },
  {
    icon: Star,
    title: "Avaliação",
    description:
      "Seja avaliado pelos clientes e passe segurança para novas vendas e trabalhos",
  },
];

export default function PartnerSection() {
  return (
    <section className="bg-black py-20">
      {/* Banner */}
      <div
        className="relative w-full min-h-[520px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${partnerImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 iparty-container pt-20 md:pt-24">
          <div className="mt-12 max-w-[620px]">
            <h2 className="section-title mb-6">
              <span className="text-[30px] gold-gradient-text">
                I PARTY PARA EMPRESAS
              </span>
            </h2>

            <h3 className="gold-gradient-text text-white text-[26px] md:text-[28px] font-black leading-tight">
              Cadastre sua empresa e comece a vender através da I party.
            </h3>

            <p className="gold-gradient-text mt-6 text-white text-[15px] md:text-[18px] leading-relaxed max-w-[650px]">
              Transforme o modo de vender
              da sua empresa, conecte-se a novos e velhos clientes e descubra
              como é prático e lucrativo vender com I Party.
            </p>
          </div>
          <a
            href="/cadastro/empresa"
            className="
            mt-[20px]  
            inline-flex
              items-center
              justify-center
              border-2
              gold-border
              gold-text
              rounded-full
              px-8
              py-3
              text-sm
              font-bold
              hover:bg-[#C39F20]
              hover:text-white
              transition
            "
          >
            Criar conta empresa
          </a>

        </div>
      </div>

      {/* Cards */}
      <div className="iparty-container mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="
                  card-dark
                  rounded-xl
                  w-full
                  max-w-[260px]
                  min-h-[240px]
                  px-6
                  py-8
                  text-center
                "
              >
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Icon
                    size={28}
                    className="gold-text"
                  />

                  <h3 className="gold-text text-[18px] font-bold">
                    {step.title}
                  </h3>
                </div>

                <p className="text-white text-[15px] leading-relaxed">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}