import { styled } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { Element } from "react-scroll";
import { AppBar, SectionLabel, sectionLabels } from "./AppBar";
import { Home } from "./Home";
import { Personal } from "./Personal";
import { Contact } from "./Contact";
import { ThemeModeContext, darkTheme, lightTheme, useThemeMode } from "./Theme";

const sectionElements: { [key in SectionLabel]: ReactElement } = {
  Home: <Home />,
  Personal: <Personal />,
  Contact: <Contact />,
};

const AppWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
}));

export function App(): ReactElement {
  const appBarRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const themeMode = useThemeMode();

  useEffect(() => {
    const updateOffset = () => setOffset(appBarRef.current?.clientHeight ?? 0);

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const minHeight = useMemo(() => `calc(100vh - ${offset}px)`, [offset]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={themeMode[0] === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <AppWrapper style={{ marginTop: `${offset}px`, minHeight }}>
          <AppBar ref={appBarRef} offset={offset} />
          {sectionLabels.map((label) => (
            <Element style={{ minHeight }} key={label} name={label}>
              {sectionElements[label]}
            </Element>
          ))}
        </AppWrapper>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
