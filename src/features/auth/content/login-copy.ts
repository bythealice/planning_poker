export const loginCopy = {
  brand: {
	logoSrc: "/LogoName.png",
	logoAlt: "Planning Poker",
	logoWidth: 252,
	logoHeight: 52,
  },
  authMode: {
	label: "MODO DE ENTRADA",
	visitor: "Visitante",
	signin: "Entrar",
	visitorHint: "Modo rapido para participar com nome e codigo da sala.",
	signinHint: "Com conta voce ganha acesso seguro e preparo para historico das sessoes.",
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
	  helper: "No modo Entrar, e-mail e senha sao obrigatorios.",
	},
	password: {
	  label: "SENHA",
	  placeholder: "Digite sua senha",
	},
	roomCode: {
	  label: "CODIGO DA SALA",
	  placeholder: "EX.: 8XJ2K",
	},
	observer: {
	  label: "Entrar como observador",
	},
  },
  buttons: {
	createRoom: "Criar nova sala",
	joinRoom: "Entrar com codigo",
	signIn: "Entrar",
	createAccount: "Criar conta",
	forgotPassword: "Esqueci minha senha",
	loading: "Processando...",
  },
  footer: {
	prefix: "Powered by Appwrite",
	separator: "•",
	linkLabel: "Privacy",
  },
  messages: {
	created: (roomCode: string) => `Sala mockada criada com sucesso. Codigo: ${roomCode}`,
	joined: (roomCode: string, role: "observador" | "participante") =>
	  `Entrada mockada realizada na sala ${roomCode} como ${role}.`,
  },
  validation: {
	email: "Digite um e-mail valido.",
	emailRequiredForAccount: "Digite um e-mail para continuar em Entrar.",
	password: "Digite sua senha para entrar.",
	passwordRequiredForAccount: "Digite sua senha para continuar em Entrar.",
	signinSessionInvalid: "Nao foi possivel validar a sessao de login. Tente novamente.",
	signinFailed: "Nao foi possivel entrar agora. Verifique e-mail e senha e tente novamente.",
	name: "Digite seu nome.",
	roomCode: "Use de 4 a 8 caracteres alfanumericos.",
	roomCodeRequired: "Digite o codigo da sala para entrar.",
	accountVerificationRequired:
	  "Antes de criar/entrar em sala, faca login com e-mail e senha.",
  },
} as const;

export type LoginCopy = typeof loginCopy;

