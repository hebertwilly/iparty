import { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useCompany } from "../../hooks/useCompany";

export default function CompanyProfile() {
  const { authUser } = useAuth();

  const {
    company,
    loadingCompany,
  } = useCompany(authUser?.uid);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!company) return;

    setFormData(company);
  }, [company]);

  if (loadingCompany) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Carregando empresa...
      </main>
    );
  }

  if (!formData) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Empresa não encontrada.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black mb-2">
          Minha Empresa
        </h1>

        <p className="text-gray-400 mb-10">
          Gerencie as informações do seu perfil.
        </p>

        {/* próximos blocos aqui */}
      </div>
    </main>
  );
}