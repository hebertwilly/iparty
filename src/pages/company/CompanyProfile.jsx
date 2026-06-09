import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ZodError } from "zod";
import {
  Bell,
  Camera,
  House,
  FloppyDisk,
  UserCircle,
} from "@phosphor-icons/react";

import { useAuth } from "../../contexts/AuthContext";
import { useCompany } from "../../hooks/useCompany";
import { updateCompanySchema } from "../../schemas/companySchema";
import { handleFirebaseError } from "../../utils/errors/handleFirebaseError";
import { getAddressByCep } from "../../services/cep/cepService";
import { COMPANY_CATEGORIES } from "../../utils/constants/companyCategories";

export default function CompanyProfile() {
  const { authUser, logout } = useAuth();

  const {
    company,
    loadingCompany,
    companyError,
    saveCompany,
  } = useCompany(authUser?.uid);

  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      categoryDropdownRef.current &&
      !categoryDropdownRef.current.contains(event.target)
    ) {
      setShowCategoryDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  useEffect(() => {
    if (!company) return;

    setFormData({
      companyName: company.companyName || "",
      phone: company.phone || "",
      whatsapp: company.whatsapp || "",
      categories: company.categories || [],
      description: company.description || "",
      instagram: company.instagram || "",
      website: company.website || "",
      address: {
        zipCode: company.address?.zipCode || "",
        street: company.address?.street || "",
        number: company.address?.number || "",
        neighborhood: company.address?.neighborhood || "",
        city: company.address?.city || "",
        state: company.address?.state || "",
      },
    });
  }, [company]);

  const selectedCategoriesLabels = useMemo(() => {
    if (!formData?.categories) return [];

    return formData.categories.map((categoryValue) => {
      const category = COMPANY_CATEGORIES.find(
        (item) => item.value === categoryValue
      );

      return category?.label || categoryValue;
    });
  }, [formData?.categories]);

  const availableCategories = useMemo(() => {
  if (!formData?.categories) return [];

  return COMPANY_CATEGORIES
    .filter(
      (category) => !formData.categories.includes(category.value)
    )
    .sort((a, b) => a.label.localeCompare(b.label));
}, [formData?.categories]);

  const isDirty = useMemo(() => {
    if (!company || !formData) return false;

    const originalData = {
      companyName: company.companyName || "",
      phone: company.phone || "",
      whatsapp: company.whatsapp || "",
      categories: company.categories || [],
      description: company.description || "",
      instagram: company.instagram || "",
      website: company.website || "",
      address: {
        zipCode: company.address?.zipCode || "",
        street: company.address?.street || "",
        number: company.address?.number || "",
        neighborhood: company.address?.neighborhood || "",
        city: company.address?.city || "",
        state: company.address?.state || "",
      },
    };

    return JSON.stringify(originalData) !== JSON.stringify(formData);
  }, [company, formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleCategoryChange = (categoryValue) => {
    setFormData((prev) => {
      const alreadySelected = prev.categories.includes(categoryValue);

      return {
        ...prev,
        categories: alreadySelected
          ? prev.categories.filter((category) => category !== categoryValue)
          : [...prev.categories, categoryValue],
      };
    });
  };

  const handleAddCategory = (categoryValue) => {
    setFormData((prev) => ({
      ...prev,
      categories: [...prev.categories, categoryValue],
    }));

    setShowCategoryDropdown(false);
  };

  const handleRemoveCategory = (categoryValue) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter(
        (category) => category !== categoryValue
      ),
    }));
  };

  const handleCepBlur = async () => {
    if (!formData?.address?.zipCode) return;

    try {
      setError("");
      setLoadingCep(true);

      const address = await getAddressByCep(formData.address.zipCode);

      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          zipCode: address.zipCode,
          street: address.street,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
        },
      }));
    } catch (err) {
      console.error(err);
      setError("Não foi possível buscar o CEP informado.");
    } finally {
      setLoadingCep(false);
    }
  };

  const handleCancel = () => {
    if (!company) return;

    setError("");
    setSuccessMessage("");

    setFormData({
      companyName: company.companyName || "",
      phone: company.phone || "",
      whatsapp: company.whatsapp || "",
      categories: company.categories || [],
      description: company.description || "",
      instagram: company.instagram || "",
      website: company.website || "",
      address: {
        zipCode: company.address?.zipCode || "",
        street: company.address?.street || "",
        number: company.address?.number || "",
        neighborhood: company.address?.neighborhood || "",
        city: company.address?.city || "",
        state: company.address?.state || "",
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const validatedData = updateCompanySchema.parse(formData);

      await saveCompany(validatedData);

      setSuccessMessage("Perfil atualizado com sucesso.");
    } catch (err) {
      console.error(err);

      if (err instanceof ZodError) {
        setError(err.issues[0]?.message || "Verifique os dados informados.");
        return;
      }

      setError(handleFirebaseError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loadingCompany) {
    return (
      <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        Carregando empresa...
      </main>
    );
  }

  if (companyError) {
    return (
      <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        {companyError}
      </main>
    );
  }

  if (!formData) {
    return (
      <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        Empresa não encontrada.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <header className="h-[56px] border-b border-[#C39F20]/20 bg-[#101010] px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-[#C39F20] text-xl"
            aria-label="Abrir menu"
          >
            ☰
          </button>

          <Link to="/empresa/dashboard" className="gold-text text-lg">
            I PARTY
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-9 h-9 rounded-full border border-[#C39F20]/40 flex items-center justify-center text-[#C39F20]">
            <Bell size={18} />
          </button>

          <button
            onClick={logout}
            className="w-9 h-9 rounded-full border border-[#C39F20]/40 flex items-center justify-center text-[#C39F20]"
            title="Sair"
          >
            <UserCircle size={19} />
          </button>
        </div>
      </header>

      <section className="border-b border-[#C39F20]/20 bg-[#18160d] px-7 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-[80px] h-[80px] rounded-2xl border-2 border-[#C39F20]/70 flex items-center justify-center text-[#C39F20]">
              <House size={36} />

              <button
                type="button"
                className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-[#D4AF37] text-black flex items-center justify-center"
              >
                <Camera size={15} weight="bold" />
              </button>
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {formData.companyName}
              </h1>

              <p className="gold-text text-sm">
                {selectedCategoriesLabels.length > 0
                  ? selectedCategoriesLabels.join(" · ")
                  : "Sem categorias"}
              </p>

              <p className="text-sm text-gray-300 mt-1">
                <span className="gold-text">★</span>{" "}
                {company.ratingAverage || 0} · Perfil ativo
              </p>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-7 py-7">
        {error && (
          <div className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 rounded-lg border border-green-500/40 bg-green-500/10 text-green-400 px-4 py-3 text-sm">
            {successMessage}
          </div>
        )}

        <SectionTitle title="Identificação" />

        <div className="space-y-4">
          <FormGroup label="Nome da empresa">
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={inputClass}
            />
          </FormGroup>

          <FormGroup label="Categorias">
            <div ref={categoryDropdownRef} className="relative bg-[#242424] border border-[#C39F20]/30 rounded-lg p-3">
              <div className="flex flex-wrap gap-2">
                {formData.categories.length > 0 ? (
                  formData.categories.map((categoryValue) => {
                    const category = COMPANY_CATEGORIES.find(
                      (item) => item.value === categoryValue
                    );

                    return (
                      <button
                        key={categoryValue}
                        type="button"
                        onClick={() => handleRemoveCategory(categoryValue)}
                        className="px-3 py-1 rounded-full border border-[#C39F20]/70 text-[#C39F20] text-xs hover:bg-[#C39F20] hover:text-black transition"
                        title="Remover categoria"
                      >
                        {category?.label || categoryValue} ×
                      </button>
                    );
                  })
                ) : (
                  <span className="text-sm text-gray-500">
                    Nenhuma categoria selecionada
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown((prev) => !prev)}
                  className="px-3 py-1 rounded-full border border-dashed border-[#C39F20]/70 text-[#C39F20] text-xs hover:bg-[#C39F20] hover:text-black transition"
                >
                  + Adicionar
                </button>
              </div>

              {showCategoryDropdown && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-full max-h-[240px] overflow-y-auto rounded-xl border border-[#C39F20]/40 bg-[#181818] shadow-xl">
                  {availableCategories.length > 0 ? (
                    availableCategories.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => handleAddCategory(category.value)}
                        className="w-full text-left px-4 py-3 text-sm text-gray-200 hover:bg-[#C39F20] hover:text-black transition"
                      >
                        {category.label}
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-500">
                      Todas as categorias já foram adicionadas.
                    </p>
                  )}
                </div>
              )}
            </div>
          </FormGroup>

          <FormGroup label="Descrição">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`${inputClass} h-auto resize-none py-3`}
            />
          </FormGroup>
        </div>

        <SectionTitle title="Endereço" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <FormGroup label="CEP" className="md:col-span-2">
            <input
              name="zipCode"
              value={formData.address.zipCode}
              onChange={handleAddressChange}
              onBlur={handleCepBlur}
              placeholder={loadingCep ? "Buscando..." : "CEP"}
              className={inputClass}
            />
          </FormGroup>

          <FormGroup label="Rua" className="md:col-span-8">
            <input
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
              className={inputClass}
            />
          </FormGroup>

          <FormGroup label="Número" className="md:col-span-2">
            <input
              name="number"
              value={formData.address.number}
              onChange={handleAddressChange}
              className={inputClass}
            />
          </FormGroup>

          <FormGroup label="Bairro" className="md:col-span-5">
            <input
              name="neighborhood"
              value={formData.address.neighborhood}
              onChange={handleAddressChange}
              className={inputClass}
            />
          </FormGroup>

          <FormGroup label="Cidade" className="md:col-span-5">
            <input
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              className={inputClass}
            />
          </FormGroup>

          <FormGroup label="Estado" className="md:col-span-2">
            <input
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
              maxLength={2}
              className={inputClass}
            />
          </FormGroup>
        </div>

        <SectionTitle title="Contato & Redes" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Telefone">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </FormGroup>

          <FormGroup label="WhatsApp">
            <input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className={inputClass}
            />
          </FormGroup>

          <FormGroup label="Instagram">
            <input
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@suaempresa"
              className={inputClass}
            />
          </FormGroup>

          <FormGroup label="Website">
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="www.suaempresa.com.br"
              className={inputClass}
            />
          </FormGroup>
        </div>

        <div className="border-t border-[#C39F20]/20 mt-8 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-400">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                isDirty ? "bg-yellow-400" : "bg-green-500"
              }`}
            />
            {isDirty ? "Alterações não salvas" : "Perfil atualizado"}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={!isDirty || saving}
              className="px-6 py-3 rounded-lg border border-[#C39F20]/30 text-gray-300 disabled:opacity-40"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!isDirty || saving}
              className="px-7 py-3 rounded-lg bg-[#D4AF37] text-black font-bold flex items-center gap-2 disabled:opacity-50"
            >
              <FloppyDisk size={18} />
              {saving ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-4 mt-7 mb-4">
      <span className="text-[#C39F20] uppercase tracking-[0.2em] text-xs">
        {title}
      </span>
      <div className="h-px flex-1 bg-[#C39F20]/20" />
    </div>
  );
}

function FormGroup({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs text-gray-500 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full min-h-[36px] bg-[#242424] border border-[#C39F20]/30 rounded-lg px-3 text-sm text-white outline-none focus:border-[#C39F20]";