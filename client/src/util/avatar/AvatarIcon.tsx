import { Avatar } from "@mui/material";
import { type AvatarColorObject, getColourFromName } from "./Colors";
import { useLayoutEffect, useState } from "react";

export interface AvatarIconProps {
  name?: string;
  fontSize?: number | string;
  padding?: number | string;
  display?: "inline" | "block" | "inline-block";
  width?: number | string;
  height?: number | string;
  marginRight?: boolean;
  id?: string;
  variant?: 'rounded' | 'circular' | 'square';
}

export function convertNameToInitials(name: string) {
  if (!name) {
    return "";
  }
  const nameComponents = name.split(" ");
  const givenName = nameComponents[0];
  const familyName = nameComponents[1];
  if (!givenName || !familyName) return "";
  return givenName.charAt(0).toUpperCase() + familyName.charAt(0).toUpperCase();
}

export function getCachedAvatarColor(
  name: string | undefined
): AvatarColorObject | undefined {
  if (!name) return undefined;
  const cachedAvatarColor = localStorage.getItem(name);
  return cachedAvatarColor
    ? (JSON.parse(cachedAvatarColor) as AvatarColorObject)
    : undefined;
}

export const AvatarIcon = ({
  name,
  fontSize,
  padding,
  display,
  width,
  height,
  marginRight = true,
  id,
  variant = "circular",
}: AvatarIconProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [fontColor, setFontColor] = useState<string>("");
  const [initials, setInitials] = useState<string>("");
  useLayoutEffect(() => {
    if (!name) return;
    const cachedAvatarColor = getCachedAvatarColor(name);
    if (cachedAvatarColor) {
      setFontColor(cachedAvatarColor.font);
      setBackgroundColor(cachedAvatarColor.background);
    } else {
      const aco: AvatarColorObject = getColourFromName(name);
      setFontColor(aco.font);
      setBackgroundColor(aco.background);
      localStorage.setItem(name, JSON.stringify(aco));
    }
    setInitials(convertNameToInitials(name));
  }, []);

  if (!name) {
    return <></>;
  }

  return (
    <div className="d-inline-block avatar-icon" id={id ?? ""}>
      <Avatar
        variant={variant}
        sx={{
          padding: padding ?? "6px",
          fontSize: fontSize ?? "12px",
          height: height ?? "30px",
          width: width ?? "30px",
          backgroundColor: backgroundColor,
          color: fontColor,
          display: display ?? "flex",
          fontWeight: 600,
        }}
        className={marginRight ? "me-2" : ""}
      >
        {initials}
      </Avatar>
    </div>
  );
};
