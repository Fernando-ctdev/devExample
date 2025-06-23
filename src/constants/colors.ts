// src/constants/colors.ts

export interface GradientColor {
  color: string;
  hoverColor: string;
}

export const GRADIENT_COLORS: GradientColor[] = [
  {
    color: "bg-gradient-to-r from-blue-400 to-blue-600",
    hoverColor: "hover:from-blue-500 hover:to-blue-700",
  },
  {
    color: "bg-gradient-to-r from-purple-400 to-purple-600",
    hoverColor: "hover:from-purple-500 hover:to-purple-700",
  },
  {
    color: "bg-gradient-to-r from-red-400 to-red-600",
    hoverColor: "hover:from-red-500 hover:to-red-700",
  },
  {
    color: "bg-gradient-to-r from-green-400 to-green-600",
    hoverColor: "hover:from-green-500 hover:to-green-700",
  },
  {
    color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    hoverColor: "hover:from-yellow-500 hover:to-yellow-700",
  },
  {
    color: "bg-gradient-to-r from-pink-400 to-pink-600",
    hoverColor: "hover:from-pink-500 hover:to-pink-700",
  },
  {
    color: "bg-gradient-to-r from-indigo-400 to-indigo-600",
    hoverColor: "hover:from-indigo-500 hover:to-indigo-700",
  },
  {
    color: "bg-gradient-to-r from-cyan-400 to-cyan-600",
    hoverColor: "hover:from-cyan-500 hover:to-cyan-700",
  },
  {
    color: "bg-gradient-to-r from-orange-400 to-orange-600",
    hoverColor: "hover:from-orange-500 hover:to-orange-700",
  },
  {
    color: "bg-gradient-to-r from-teal-400 to-teal-600",
    hoverColor: "hover:from-teal-500 hover:to-teal-700",
  },
];

export const getRandomColor = (): GradientColor => {
  return GRADIENT_COLORS[Math.floor(Math.random() * GRADIENT_COLORS.length)];
};
