export const roomSettingsCopy = {
  brand: {
    logoSrc: "/LogoName.png",
    logoAlt: "Logo do Planning Poker",
    logoWidth: 252,
    logoHeight: 52,
  },
  navigation: {
    voting: "Votação",
    history: "Histórico",
    insights: "Análises",
    settings: "Configurações",
  },
  header: {
    badge: "Sala aberta!",
    title: "Configurações da sala",
    description:
      "A sala já está pronta. Ajuste os parâmetros da sessão antes de copiar o convite e compartilhar com o time.",
  },
  sidebar: {
    participantsLabel: "Participantes",
    activeParticipants: "12 ativos",
    inviteTeam: "Convidar equipe",
  },
  fields: {
    roomName: {
      label: "Nome da sala",
      placeholder: "Sprint 42 Planning",
      helper: "Este nome aparece para toda a equipe durante a sessão.",
    },
    roomCode: {
      label: "Código da sala",
      placeholder: "SPRINT-42",
      helper: "Somente leitura. Use o botão ao lado para copiar o convite.",
    },
    estimationSystem: {
      label: "Sistema de estimativa",
      fibonacci: {
        title: "Fibonacci",
        description: "Escala progressiva para estimativas com maior incerteza.",
        values: ["1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?"],
      },
      tshirt: {
        title: "Tshirt",
        description: "Escala simples para alinhamento rápido de complexidade.",
        values: ["PP", "P", "M", "G", "GG"],
      },
      powersOf2: {
        title: "Potências de 2",
        description: "Escala objetiva para evolução de esforço em dobro.",
        values: ["1", "2", "4", "8", "16", "32", "64"],
      },
    },
    visibility: {
      title: "Exibição durante a votação",
      showTitle: {
        label: "Exibir título da tarefa",
        helper: "Os participantes veem o nome da tarefa enquanto votam.",
      },
      showParticipantCount: {
        label: "Exibir quantidade de participantes",
        helper: "Mostra quantas pessoas estão ativas na sala.",
      },
    },
    revealCards: {
      title: "Quem pode revelar as cartas?",
      hostOnly: "Somente o anfitrião",
      anyone: "Qualquer pessoa",
    },
    roundTimer: {
      title: "Cronômetro da rodada",
      helper: "Revela ou encerra automaticamente a rodada.",
      labels: {
        short: "15s",
        medium: "1m",
        long: "5m",
      },
    },
  },
  buttons: {
    inviteTeam: "Convidar equipe",
    copyRoomCode: "Copiar código",
    logout: "Sair da conta",
    saveAsDefault: "Salvar como padrão",
    applySettings: "Aplicar configurações",
    loading: "Aplicando...",
  },
  messages: {
    roomOpened: "Sala aberta e pronta para compartilhar.",
    roomCodeCopied: "Código da sala copiado para a área de transferência.",
    inviteCopied: "Link de convite copiado para a área de transferência.",
    applied: "Configurações aplicadas com sucesso.",
    savedAsDefault: "Configurações salvas como padrão com sucesso.",
    copyFailed: "Não foi possível copiar agora. Tente novamente.",
    authRequiredForDefault: "Entre com sua conta para salvar estas configurações como padrão.",
  },
} as const;

export type RoomSettingsCopy = typeof roomSettingsCopy;

