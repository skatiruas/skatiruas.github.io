import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import theme from "./toolbox/theme";
import "./toolbox/theme.css";

import { Element } from "react-scroll";
import { AppBar, SectionLabel, sectionLabels } from "./AppBar";
import { Home } from "./Home";
import { Personal } from "./Personal";
import { Contact } from "./Contact";

const sectionElements: { [key in SectionLabel]: ReactElement } = {
  Home: <Home />,
  Personal: <Personal />,
  Contact: <Contact />,
};

export function App(): ReactElement {
  const appBarRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => setOffset(appBarRef.current?.clientHeight ?? 0);

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const minHeight = useMemo(() => `calc(100vh - ${offset}px)`, [offset]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: `${offset}px` }}>
        <AppBar ref={appBarRef} offset={offset} />
        {sectionLabels.map((label) => (
          <Element style={{ minHeight }} key={label} name={label}>
            {sectionElements[label]}
          </Element>
        ))}
      </div>
    </ThemeProvider>
  );
}
