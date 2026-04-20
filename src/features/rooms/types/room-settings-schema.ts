import { z } from "zod";

const estimationSystemValues = ["fibonacci", "tshirt", "powersOf2"] as const;
const revealPermissionValues = ["host-only", "anyone"] as const;

export const roomSettingsSchema = z.object({
  roomCode: z.string().trim().min(1, "O código da sala é obrigatório."),
  roomName: z.string().trim().min(2, "Digite um nome para a sala."),
  estimationSystem: z.enum(estimationSystemValues),
  showTitleDuringVoting: z.boolean(),
  showParticipantCount: z.boolean(),
  revealCardsBy: z.enum(revealPermissionValues),
  roundTimerEnabled: z.boolean(),
  roundTimerSeconds: z.number().int().min(15).max(300),
});

export type RoomSettingsFormData = z.infer<typeof roomSettingsSchema>;

export { estimationSystemValues, revealPermissionValues };


