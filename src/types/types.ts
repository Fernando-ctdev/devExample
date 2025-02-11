// src/types/types.ts
export interface Technology {
  id: string;
  name: string;
  title: string;
  color: string;
  hoverColor: string;
  logo: string;
  alt: string;
  padding: string;
}

export interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
  itemId: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface Item {
  itemId: string;
  title: string;
  example?: Example;
}