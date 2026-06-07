export function handleFirebaseError(error) {
  const errorMessages = {
    "auth/email-already-in-use":
      "Este e-mail já está cadastrado. Tente fazer login ou utilize outro e-mail.",

    "auth/invalid-email":
      "Informe um e-mail válido.",

    "auth/weak-password":
      "A senha deve ter pelo menos 6 caracteres.",

    "auth/user-not-found":
      "Usuário não encontrado.",

    "auth/wrong-password":
      "Senha incorreta.",

    "auth/invalid-credential":
      "E-mail ou senha inválidos.",

    "permission-denied":
      "Você não possui permissão para realizar esta ação.",

    "unavailable":
      "Serviço temporariamente indisponível. Tente novamente em instantes.",
  };

  return (
    errorMessages[error?.code] ||
    "Ocorreu um erro inesperado. Tente novamente."
  );
}