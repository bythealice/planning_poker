const roomCodePattern = /^[A-Z0-9]{4,8}$/;
const roomCodeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function normalizeRoomCode(value: string) {
  return value.trim().toUpperCase();
}

export const roomCode = {
  pattern: roomCodePattern,
  normalize: normalizeRoomCode,
  isValid(value: string) {
    return roomCodePattern.test(normalizeRoomCode(value));
  },
  createDemoCode(length = 5) {
    return Array.from({ length }, () => roomCodeAlphabet[Math.floor(Math.random() * roomCodeAlphabet.length)]).join("");
  },
} as const;

