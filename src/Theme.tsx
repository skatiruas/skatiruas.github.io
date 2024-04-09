import { useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { useEffect } from "react";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

type ThemeMode = [
  "light" | "dark",
  React.Dispatch<React.SetStateAction<"light" | "dark">>
];

export const ThemeModeContext = React.createContext<ThemeMode>([
  "light",
  () => undefined,
]);

export const useThemeMode = (): ThemeMode => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  useEffect(() => setMode(prefersDarkMode ? "dark" : "light"), [
    prefersDarkMode,
  ]);

  return [mode, setMode];
};
