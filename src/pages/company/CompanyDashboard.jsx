import { Link } from "react-router-dom";
import {
  Buildings,
  ClipboardText,
  PencilSimple,
  Star,
  Storefront,
  UserCircle,
} from "@phosphor-icons/react";

import { useAuth } from "../../contexts/AuthContext";
import { useCompany } from "../../hooks/useCompany";

export default function CompanyDashboard() {
  const { authUser, userData, logout } = useAuth();

  const { company, loadingCompany } = useCompany(authUser?.uid);

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <header className="h-[56px] border-b border-[#C39F20]/20 bg-[#101010] px-6 flex items-center justify-between">
        <Link to="/empresa/dashboard" className="gold-text text-lg">
          I PARTY
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-[#C39F20]"
        >
          <UserCircle size={22} />
          Sair
        </button>
      </header>

      <section className="max-w-6xl mx-auto px-7 py-8">
        <div className="mb-8">
          <p className="text-gray-400 text-sm">Painel da empresa</p>

          <h1 className="text-3xl font-black mt-1">
            Olá, {userData?.displayName || "empresa"}
          </h1>

          <p className="text-gray-400 mt-2">
            Gerencie seu perfil, serviços e informações exibidas para os clientes.
          </p>
        </div>

        {loadingCompany ? (
          <div className="card-dark border border-white/10 rounded-2xl p-6">
            Carregando informações da empresa...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <DashboardCard
                icon={<Buildings size={28} />}
                title="Perfil da empresa"
                value={company?.companyName || "Não informado"}
                description="Atualize dados, endereço, descrição e redes sociais."
              />

              <DashboardCard
                icon={<Star size={28} />}
                title="Avaliação média"
                value={company?.ratingAverage || 0}
                description={`${company?.totalReviews || 0} avaliações recebidas`}
              />

              <DashboardCard
                icon={<Storefront size={28} />}
                title="Categorias"
                value={company?.categories?.length || 0}
                description="Categorias vinculadas ao seu perfil."
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <section className="card-dark border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">
                  Ações rápidas
                </h2>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/empresa/perfil"
                    className="flex items-center justify-between rounded-xl border border-[#C39F20]/30 px-5 py-4 hover:bg-[#C39F20] hover:text-black transition"
                  >
                    <span className="flex items-center gap-3">
                      <PencilSimple size={22} />
                      Editar perfil da empresa
                    </span>

                    <span>→</span>
                  </Link>

                  <Link
                    to="/empresa/produtos"
                    className="flex items-center justify-between rounded-xl border border-[#C39F20]/30 px-5 py-4 hover:bg-[#C39F20] hover:text-black transition"
                  >
                    <span className="flex items-center gap-3">
                      <ClipboardText size={22} />
                      Gerenciar serviços/produtos
                    </span>

                    <span>→</span>
                  </Link>
                </div>
              </section>

              <section className="card-dark border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">
                  Status do perfil
                </h2>

                <ProfileStatus company={company} />
              </section>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function DashboardCard({ icon, title, value, description }) {
  return (
    <div className="card-dark border border-white/10 rounded-2xl p-6">
      <div className="text-[#C39F20] mb-4">{icon}</div>

      <p className="text-gray-400 text-sm">{title}</p>

      <h3 className="text-2xl font-black mt-1">
        {value}
      </h3>

      <p className="text-gray-500 text-sm mt-3">
        {description}
      </p>
    </div>
  );
}

function ProfileStatus({ company }) {
  const checks = [
    {
      label: "Dados básicos preenchidos",
      completed: !!company?.companyName && !!company?.categories?.length,
    },
    {
      label: "Endereço cadastrado",
      completed:
        !!company?.address?.city &&
        !!company?.address?.state &&
        !!company?.address?.street,
    },
    {
      label: "Descrição cadastrada",
      completed: !!company?.description,
    },
    {
      label: "Contato cadastrado",
      completed: !!company?.phone && !!company?.whatsapp,
    },
    {
      label: "Redes sociais cadastradas",
      completed: !!company?.instagram || !!company?.website,
    },
  ];

  const completedItems = checks.filter((item) => item.completed).length;

  return (
    <div>
      <p className="text-gray-400 mb-4">
        {completedItems} de {checks.length} etapas concluídas.
      </p>

      <div className="space-y-3">
        {checks.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-gray-300">{item.label}</span>

            <span
              className={
                item.completed
                  ? "text-green-400"
                  : "text-yellow-400"
              }
            >
              {item.completed ? "Concluído" : "Pendente"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}