export const getAddressByCep = async (cep) => {
  const cleanedCep = cep.replace(/\D/g, "");

  if (cleanedCep.length !== 8) {
    throw new Error("CEP inválido.");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar CEP.");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  return {
    zipCode: cleanedCep,
    street: data.logradouro || "",
    neighborhood: data.bairro || "",
    city: data.localidade || "",
    state: data.uf || "",
    country: "Brasil",
  };
};