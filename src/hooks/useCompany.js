import { useEffect, useState } from "react";

import {
  getCompanyById,
  updateCompany,
} from "../services/companies/companyService";

export function useCompany(uid) {
  const [company, setCompany] = useState(null);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [companyError, setCompanyError] = useState("");

  const loadCompany = async () => {
    try {
      setCompanyError("");
      setLoadingCompany(true);

      const data = await getCompanyById(uid);

      setCompany(data);
    } catch (error) {
      console.error(error);
      setCompanyError("Não foi possível carregar os dados da empresa.");
    } finally {
      setLoadingCompany(false);
    }
  };

  const saveCompany = async (data) => {
    await updateCompany(uid, data);
    await loadCompany();
  };

  useEffect(() => {
    if (!uid) {
      setLoadingCompany(false);
      return;
    }

    loadCompany();
  }, [uid]);

  return {
    company,
    loadingCompany,
    companyError,
    saveCompany,
    refreshCompany: loadCompany,
  };
}