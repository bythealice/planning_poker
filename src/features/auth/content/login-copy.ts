export const loginCopy = {
  brand: {
    logoSrc: "/LogoName.png",
    logoAlt: "Logo do Planning Poker",
    logoWidth: 252,
    logoHeight: 52,
  },
  authMode: {
    label: "COMO VOCÊ QUER ENTRAR",
    visitor: "Visitante",
    signin: "Entrar",
    visitorHint: "Modo rápido para participar com nome e código da sala.",
    signinHint: "Com conta você ganha acesso seguro e histórico das sessões.",
  },
  fields: {
    name: {
      label: "SEU NOME",
      placeholder: "Como devemos te chamar?",
      helper: "Seu nome fica salvo localmente neste navegador.",
    },
    email: {
      label: "E-MAIL",
      placeholder: "seu@email.com",
      helper: "No modo entrar, e-mail e senha são obrigatórios.",
    },
    password: {
      label: "SENHA",
      placeholder: "Digite sua senha",
    },
    roomCode: {
      label: "CÓDIGO DA SALA",
      placeholder: "EX.: 8XJ2K",
      helper: "Use o código para copiar e compartilhar com o time.",
    },
    observer: {
      label: "Entrar como observador",
    },
  },
  buttons: {
    createRoom: "Criar sala",
    joinRoom: "Entrar com código",
    signIn: "Entrar",
    createAccount: "Criar conta",
    forgotPassword: "Esqueci minha senha",
    loading: "Processando...",
  },
  footer: {
    prefix: "Desenvolvido por Alice Ramalho",
    separator: "•",
    linkLabel: "© 2026 Planning Poker. Todos os direitos reservados",
  },
  messages: {
    created: (roomCode: string) => `Sala criada com sucesso. Código: ${roomCode}`,
    joined: (roomCode: string, role: "observador" | "participante") =>
      `Entrada realizada na sala ${roomCode} como ${role}.`,
  },
  validation: {
    email: "Digite um e-mail válido.",
    emailRequiredForAccount: "Digite um e-mail para continuar em Entrar.",
    password: "Digite sua senha para entrar.",
    passwordRequiredForAccount: "Digite sua senha para continuar em Entrar.",
    signinSessionInvalid: "Não foi possível validar a sessão de login. Tente novamente.",
    signinFailed: "Não foi possível entrar agora. Verifique e-mail e senha e tente novamente.",
    name: "Digite seu nome.",
    roomCode: "Use de 4 a 8 caracteres alfanuméricos.",
    roomCodeRequired: "Digite o código da sala para entrar.",
    accountVerificationRequired: "Antes de continuar, faça login com e-mail e senha.",
  },
} as const;

export type LoginCopy = typeof loginCopy;
