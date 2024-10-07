import { useLayoutEffect, useState } from "react";
import { convertNameToInitials, getCachedAvatarColor } from "./AvatarIcon";
import type { AvatarColorObject } from "./Colors";
import { getColourFromName } from "./Colors";
import { Avatar, AvatarGroup } from "@mui/material";

export interface AvatarGroupProps {
  fontSize?: number | string;
  padding?: number | string;
  width?: number | string;
  height?: number | string;
  nameGroup: string[];
  maxNumber?: number;
  spacing?: "small" | "medium" | number;
}

interface AvatarIcon {
  backgroundColor: string;
  fontColor: string;
  name: string;
}
export const CustomAvatarGroup = ({
  nameGroup,
  fontSize,
  padding,
  width,
  height,
  maxNumber,
  spacing = "small",
}: AvatarGroupProps) => {
  const [avatarColors, setAvatarColors] = useState<AvatarIcon[]>([]);

  useLayoutEffect(() => {
    const avatarIcons = nameGroup.map((name) => {
      const cachedAvatarColor = getCachedAvatarColor(name);
      if (cachedAvatarColor) {
        return {
          backgroundColor: cachedAvatarColor.background,
          fontColor: cachedAvatarColor.font,
          name: convertNameToInitials(name),
        };
      } else {
        const aco: AvatarColorObject = getColourFromName(name);
        localStorage.setItem(name, JSON.stringify(aco));
        return {
          backgroundColor: aco.background,
          fontColor: aco.font,
          name: convertNameToInitials(name),
        };
      }
    });
    setAvatarColors(avatarIcons);
  }, [nameGroup]);

  return (
    <div className="d-flex">
      <AvatarGroup
        max={maxNumber}
        spacing={spacing}
        sx={{
          "& .MuiAvatar-root": {
            padding: padding ?? "6px",
            fontSize: fontSize ?? "12px",
            height: height ?? "30px",
            width: width ?? "30px",
            fontWeight: 600,
          },
          ...(!!maxNumber &&
            maxNumber < nameGroup.length && {
              "& .MuiAvatar-root:nth-of-type(1)": {
                zIndex: maxNumber,
                backgroundColor: "#E6EFFC",
                color: "#5D6E82",
              },
            }),
        }}
      >
        {avatarColors.map((avatarIcon, index) => (
          <Avatar
            key={index}
            sx={{
              backgroundColor: avatarIcon.backgroundColor,
              color: avatarIcon.fontColor,
              zIndex: index,
            }}
          >
            {avatarIcon.name}
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
};
