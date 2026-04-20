export const signupCopy = {
  title: "Criar conta",
  subtitle: "Cadastre-se para entrar com e-mail verificado e salvar seu historico.",
  fields: {
    name: {
      label: "NOME",
      placeholder: "Como devemos te chamar?",
    },
    email: {
      label: "E-MAIL",
      placeholder: "seu@email.com",
    },
    password: {
      label: "SENHA",
      placeholder: "Digite uma senha",
    },
    confirmPassword: {
      label: "CONFIRMAR SENHA",
      placeholder: "Repita sua senha",
    },
  },
  buttons: {
    create: "Criar conta",
    loading: "Criando conta...",
    backToLogin: "Voltar para login",
  },
  messages: {
    created: "Conta mockada criada com sucesso. Agora voce pode entrar com seu e-mail.",
  },
} as const;

export type SignupCopy = typeof signupCopy;

