import type { BrandIconName } from "@/components/brand/BrandIcon";

export const normalizeIconName = (iconName: string): BrandIconName => {
  if (
    iconName === "tooth" ||
    iconName === "child" ||
    iconName === "sparkles" ||
    iconName === "smile" ||
    iconName === "activity"
  ) {
    return iconName;
  }
  return "tooth";
};

export const getIconColor = (iconName: string) => {
  const colorMap: { [key: string]: string } = {
    tooth: "bg-primary",
    child: "bg-secondary",
    sparkles: "bg-accent",
    smile: "bg-primary",
    activity: "bg-secondary",
  };

  return colorMap[iconName] || "bg-primary";
};
