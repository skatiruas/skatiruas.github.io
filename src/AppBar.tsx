import React, { ReactElement, useCallback, useMemo, useState } from "react";

import { Link } from "react-scroll";
import { Avatar, Button, IconButton, SvgIcon, styled } from "@mui/material";
import GitHubIcon from "./assets/GitHubIcon";
import GitLabIcon from "./assets/GitLabIcon";
import LinkedInIcon from "./assets/LinkedInIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeModeContext } from "./Theme";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Gunny Rewritten",
  borderStyle: "solid",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  borderColor: theme.palette.divider,
  borderWidth: "0 0 1px 0",
  borderBottomLeftRadius: "3em",
  borderBottomRightRadius: "3em",
  position: "fixed",
  top: "0",
  width: "100%",
  zIndex: 999,
}));

const SignatureAndLinks = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Signature = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.primary,
  fontSize: "3rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
  flexGrow: 2,
  marginBottom: 5,
}));

const Links = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
}));

const Buttons = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}));

export enum SectionLabel {
  Home = "Home",
  Personal = "Personal",
  Contact = "Contact",
}

export const sectionLabels: ReadonlyArray<SectionLabel> = [
  SectionLabel.Home,
  SectionLabel.Personal,
  SectionLabel.Contact,
];

const IconLink = ({
  component,
  href,
  title,
}: {
  component: React.ElementType;
  href: string;
  title: string;
}) => {
  return (
    <IconButton
      onClick={() => window.open(href, "_blank")}
      color="inherit"
      title={title}
    >
      <SvgIcon component={component} fontSize="small" />
    </IconButton>
  );
};

export const AppBar = React.forwardRef(function AppBarRef(
  { offset }: { offset: number },
  ref: React.Ref<HTMLDivElement>
): ReactElement {
  const [currentSectionLabel, setCurrentSectionLabel] = useState(
    SectionLabel.Home
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [mode, setMode] = React.useContext(ThemeModeContext);

  const onLinkActiveFor = useCallback(
    (label: SectionLabel) => () => {
      if (!isAnimating) setCurrentSectionLabel(label);
      else if (label === currentSectionLabel) setIsAnimating(false);
    },
    [currentSectionLabel, isAnimating]
  );

  const onLinkClickFor = useCallback(
    (label: SectionLabel) => () => {
      setCurrentSectionLabel(label);
      setIsAnimating(label !== currentSectionLabel);
    },
    [currentSectionLabel]
  );

  const image = useMemo(
    () =>
      `${process.env.PUBLIC_URL}/profile${
        currentSectionLabel === SectionLabel.Personal ? "-personal" : ""
      }.jpg`,
    [currentSectionLabel]
  );

  return (
    <Wrapper ref={ref}>
      <SignatureAndLinks>
        <Signature>Tiago Ruas</Signature>
        <Links>
          <IconLink
            component={GitHubIcon}
            href="https://github.com/skatiruas"
            title="GitHub"
          />
          <IconLink
            component={GitLabIcon}
            href="https://gitlab.com/skatiruas"
            title="GitLab"
          />
          <IconLink
            component={LinkedInIcon}
            href="https://www.linkedin.com/in/skatiruas"
            title="LinkedIn"
          />
        </Links>
      </SignatureAndLinks>
      <Avatar
        src={image}
        sx={{
          margin: "5px",
          width: "120px !important",
          height: "120px !important",
        }}
      />
      <Buttons>
        <IconButton
          color="inherit"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          sx={{ width: 16, height: 16 }}
        >
          {mode === "dark" ? (
            <DarkModeIcon sx={{ width: "inherit", height: "inherit" }} />
          ) : (
            <LightModeIcon sx={{ width: "inherit", height: "inherit" }} />
          )}
        </IconButton>
        {sectionLabels.map((label) => (
          <Link
            to={label}
            spy
            smooth
            duration={500}
            key={label}
            offset={-offset}
            onSetActive={onLinkActiveFor(label)}
          >
            <Button
              disabled={currentSectionLabel === label}
              onClick={onLinkClickFor(label)}
              color="inherit"
            >
              {label}
            </Button>
          </Link>
        ))}
      </Buttons>
    </Wrapper>
  );
});
