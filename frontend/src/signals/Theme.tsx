import { effect, signal } from "@preact/signals-react";

export const theme = signal<ThemeType>(getTheme());

type ThemeType = {
  dark: string;
  light: string;
  darkBool: boolean;
};

function getTheme() {
  const value = localStorage.getItem("theme");
  if (!value) {
    return {
      dark: "#202020",
      light: "#FFFFFF",
      darkBool: true,
    };
  } else {
    return JSON.parse(value);
  }
}

effect(() => {
  localStorage.setItem("theme", JSON.stringify(theme.value));
});
