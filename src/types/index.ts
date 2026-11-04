/**
 * Types partagés pour l'application JapApp
 */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export type Theme = "light" | "dark";

export type SortOrder = "asc" | "desc";

// --- Types pédagogiques (Lot 2) ---

export * from "./pedagogical";
export * from "./schemas";
export * from "./loaders";
