export type AvatarColorOptions =
  | "lightGreen"
  | "green"
  | "purple"
  | "blue"
  | "lightBlue"
  | "orange"
  | "yellow"
  | "pink"
  | "lightPink";

export interface AvatarColorObject {
  font: string;
  background: string;
}

export const avatarColors: { [key in AvatarColorOptions]: AvatarColorObject } =
  {
    lightGreen: {
      font: "#004942",
      background: "#E5EDEC",
    },
    green: {
      font: "#00864E",
      background: "#E0FAEF",
    },
    purple: {
      font: "#8056D9",
      background: "#F3EAFF",
    },
    lightBlue: {
      font: "#2A7BE4",
      background: "#E5F7FF",
    },
    orange: {
      font: "#F68F57",
      background: "#FEF0E8",
    },
    yellow: {
      font: "#D07E4B",
      background: "#FFEECF",
    },
    lightPink: {
      font: "#D36582",
      background: "#FFE3DC",
    },
    blue: {
      font: "#507DBC",
      background: "#DDEDFF",
    },
    pink: {
      font: "#AC364D",
      background: "#FFE5EA",
    },
  };

function getHashInRangeFromName(name: string): number {
  let hash = 0;
  let i, chr;
  if (name.length === 0) {
    return hash;
  }
  for (i = 0; i < name.length; i++) {
    chr = name.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Math.abs(hash) % Object.keys(avatarColors).length;
}

export function getColourFromName(name: string): AvatarColorObject {
  const idx = getHashInRangeFromName(name);
  const colorKey = Object.keys(avatarColors)[idx] as AvatarColorOptions;
  return avatarColors[colorKey];
}
