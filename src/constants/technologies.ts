// src/constants/technologies.ts

export interface TechButton {
  title: string;
  tech: string;
  color: string;
  hoverColor: string;
  logo: string;
  alt: string;
  padding: string;
}

export const TECH_BUTTONS: TechButton[] = [
  {
    title: "JavaScript with example",
    tech: "javascript",
    color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    hoverColor: "hover:from-yellow-500 hover:to-yellow-700",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
    alt: "JavaScript Logo",
    padding: "px-5 py-3",
  },
  {
    title: "TypeScript with example",
    tech: "typescript",
    color: "bg-gradient-to-r from-blue-400 to-blue-600",
    hoverColor: "hover:from-blue-500 hover:to-blue-700",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
    alt: "TypeScript Logo",
    padding: "px-5 py-3",
  },
  {
    title: "GoLang with example",
    tech: "golang",
    color: "bg-gradient-to-r from-cyan-500 to-blue-500",
    hoverColor: "hover:from-cyan-600 hover:to-blue-600",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
    alt: "GoLang Logo",
    padding: "px-8 py-3",
  },
  {
    title: "Gin Gonic with example",
    tech: "gin",
    color: "bg-gradient-to-r from-cyan-500 to-blue-500",
    hoverColor: "hover:from-cyan-600 hover:to-blue-600",
    logo: "https://avatars.githubusercontent.com/u/7894478?v=4",
    alt: "gin Logo",
    padding: "px-12 py-3",
  },
  {
    title: "NodeJS with example",
    tech: "nodejs",
    color: "bg-gradient-to-r from-cyan-600 to-green-700",
    hoverColor: "hover:from-cyan-800 hover:to-green-700",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
    alt: "NodeJS Logo",
    padding: "px-8 py-3",
  },
  {
    title: "NestJS with example",
    tech: "nestjs",
    color: "bg-gradient-to-r from-cyan-600 to-red-700",
    hoverColor: "hover:from-cyan-800 hover:to-red-700",
    logo: "https://static-00.iconduck.com/assets.00/nestjs-icon-1024x1020-34exj0g6.png",
    alt: "NestJS Logo",
    padding: "px-8 py-3",
  },
  {
    title: "SQL with example",
    tech: "sql",
    color: "bg-gradient-to-r from-orange-300 to-orange-700",
    hoverColor: "hover:from-orange-400 hover:to-orange-800",
    logo: "https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.png",
    alt: "SQL Logo",
    padding: "px-12 py-3",
  },
];

export const TECH_LOGOS: Record<string, string> = {
  javascript: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
  typescript: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
  golang: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
  gin: "https://avatars.githubusercontent.com/u/7894478?v=4",
  nodejs: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
  nestjs: "https://static-00.iconduck.com/assets.00/nestjs-icon-1024x1020-34exj0g6.png",
  sql: "https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.png"
};

export const LANDING_PAGE_TECHNOLOGIES = [
  {
    name: "JavaScript",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-javascript-2752148-2284965.png?f=webp&w=256",
    color: "from-yellow-400",
    description: "Exemplos práticos para desenvolvimento web moderno",
  },
  {
    name: "TypeScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png",
    color: "from-blue-500",
    description: "Códigos tipados com exemplos de uso real",
  },
  {
    name: "Golang",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-va-77-1175166.png?f=webp&w=256",
    color: "from-cyan-500",
    description: "Exemplos de alta performance e concorrência",
  },
  {
    name: "Gin",
    logo: "https://avatars.githubusercontent.com/u/7894478?v=4",
    color: "from-sky-500",
    description: "Casos práticos de APIs REST em Go",
  },
  {
    name: "NodeJS",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
    color: "from-green-500",
    description: "Exemplos de desenvolvimento server-side",
  },
  {
    name: "NestJS",
    logo: "https://static-00.iconduck.com/assets.00/nestjs-icon-1024x1020-34exj0g6.png",
    color: "from-red-500",
    description: "Framework escalável para aplicações Node.js",
  },
  {
    name: "SQL",
    logo: "https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.png",
    color: "from-orange-500",
    description: "Consultas avançadas e otimização de banco",
  },
];
