export const loginCopy = {
  brand: {
	logoSrc: "/LogoName.png",
	logoAlt: "Planning Poker",
	logoWidth: 252,
	logoHeight: 52,
  },
  fields: {
	name: {
	  label: "SEU NOME",
	  placeholder: "Como devemos te chamar?",
	},
	email: {
	  label: "E-MAIL (OPCIONAL)",
	  placeholder: "seu@email.com",
	  helper:
		"Adicione seu e-mail para salvar o historico desta sessao e acessa-lo futuramente.",
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
	name: "Digite seu nome.",
	roomCode: "Use de 4 a 8 caracteres alfanumericos.",
	roomCodeRequired: "Digite o codigo da sala para entrar.",
  },
} as const;

export type LoginCopy = typeof loginCopy;

