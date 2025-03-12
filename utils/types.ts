import { ReactNode } from "react";

export type modal = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  maxWidth: number;
};

export interface User {
  id: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface CounterState {
  value: number;
}

export interface RootState {
  auth: AuthState;
  counter: CounterState;
}

export interface JWTTokenPayload {
  id: string;
  email: string;
  // Add other fields as necessary
}