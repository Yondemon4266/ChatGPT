import { effect, signal } from "@preact/signals-react";
import { v4 as uuidv4 } from "uuid";

export const userId = signal(getUserID());

export function getUserID() {
  const value = localStorage.getItem("userId");
  if (value == null) return uuidv4();
  return JSON.parse(value);
}

effect(() => localStorage.setItem("userId", JSON.stringify(userId.value)));
