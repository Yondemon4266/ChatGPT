import { theme } from "../signals/Theme";

export function VerifTheme(str1: string, str2: string) {
  return theme.value.darkBool ? str1 : str2;
}
