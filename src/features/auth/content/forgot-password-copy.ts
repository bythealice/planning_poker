export const forgotPasswordCopy = {
  title: "Recuperar senha",
  subtitle: "Digite seu e-mail para receber o link de redefinicao de senha.",
  fields: {
    email: {
      label: "E-MAIL",
      placeholder: "seu@email.com",
      helper: "Se o e-mail existir, enviaremos instrucoes para recuperar sua conta.",
    },
  },
  buttons: {
    send: "Enviar link de recuperacao",
    loading: "Enviando...",
    backToLogin: "Voltar para login",
  },
  messages: {
    sent: "Pedido de recuperacao mockado com sucesso. Verifique seu e-mail.",
  },
  validation: {
    email: "Digite um e-mail valido.",
  },
} as const;

export type ForgotPasswordCopy = typeof forgotPasswordCopy;

