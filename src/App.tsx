import { styled } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { Element } from "./scroll";
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
    const node = appBarRef.current;
    if (!node) return;

    const updateOffset = () => setOffset(node.clientHeight);
    updateOffset();

    const observer = new ResizeObserver(updateOffset);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const minHeight = useMemo(() => `calc(100dvh - ${offset}px)`, [offset]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={themeMode[0] === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <AppWrapper
          style={{
            ["--header-offset" as string]: `${offset}px`,
            marginTop: `${offset}px`,
            minHeight,
          }}
        >
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
