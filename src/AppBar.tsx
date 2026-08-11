import React, { ReactElement, useCallback, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  IconButtonProps,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  styled,
} from "@mui/material";
import { Link } from "./scroll";
import GitHubIcon from "./assets/GitHubIcon";
import GitLabIcon from "./assets/GitLabIcon";
import LinkedInIcon from "./assets/LinkedInIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeModeContext } from "./Theme";
import { useTranslation } from "react-i18next";

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

const AvatarWrapper = styled("div")({
  position: "relative",
  width: 120,
  height: 120,
  margin: "5px",
});

const OrbitIconButton = ({
  angle,
  distance,
  ...props
}: {
  angle: number;
  distance: number;
} & IconButtonProps) => (
  <IconButton
    color="inherit"
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${-distance}px) rotate(${-angle}deg)`,
      width: 16,
      height: 16,
      border: "1px solid",
      borderColor: "divider",
      fontSize: 10,
      fontWeight: "bold",
    }}
    {...props}
  />
);

export enum Section {
  Home = "home",
  Personal = "personal",
  Contact = "contact",
}

export const sections: ReadonlyArray<Section> = [
  Section.Home,
  Section.Personal,
  Section.Contact,
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

const LANGUAGES = [
  { code: "en", label: "EN", nativeLabel: "English" },
  { code: "de", label: "DE", nativeLabel: "Deutsch" },
  { code: "pt", label: "PT", nativeLabel: "Português" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const current =
    LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[1];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (code: string) => () => {
    i18n.changeLanguage(code);
    handleClose();
  };

  return (
    <>
      <OrbitIconButton angle={-140} distance={70} onClick={handleOpen}>
        {current.label}
      </OrbitIconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {LANGUAGES.map(({ code, nativeLabel }) => (
          <MenuItem
            key={code}
            selected={code === current.code}
            onClick={handleSelect(code)}
          >
            <ListItemText>{nativeLabel}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const ThemeSwitcher = () => {
  const [mode, setMode] = React.useContext(ThemeModeContext);

  const isDark = mode === "dark";

  return (
    <OrbitIconButton
      angle={40}
      distance={70}
      onClick={() => setMode(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <DarkModeIcon sx={{ width: "inherit", height: "inherit" }} />
      ) : (
        <LightModeIcon sx={{ width: "inherit", height: "inherit" }} />
      )}
    </OrbitIconButton>
  );
};

export const AppBar = React.forwardRef(function AppBarRef(
  { offset }: { offset: number },
  ref: React.Ref<HTMLDivElement>
): ReactElement {
  const [currentSection, setCurrentSection] = useState(Section.Home);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation();

  const onLinkActiveFor = useCallback(
    (label: Section) => () => {
      if (!isAnimating) setCurrentSection(label);
      else if (label === currentSection) setIsAnimating(false);
    },
    [currentSection, isAnimating]
  );

  const onLinkClickFor = useCallback(
    (label: Section) => () => {
      setCurrentSection(label);
      setIsAnimating(label !== currentSection);
    },
    [currentSection]
  );

  const image = useMemo(
    () =>
      `${process.env.PUBLIC_URL}/profile${
        currentSection === Section.Personal ? "-personal" : ""
      }.jpg`,
    [currentSection]
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
      <AvatarWrapper>
        <Avatar
          src={image}
          sx={{
            width: "120px !important",
            height: "120px !important",
          }}
        />
        <ThemeSwitcher />
        <LanguageSwitcher />
      </AvatarWrapper>
      <Buttons>
        {sections.map((section) => (
          <Link
            to={section}
            spy
            smooth
            duration={500}
            key={section}
            offset={-offset}
            onSetActive={onLinkActiveFor(section)}
          >
            <Button
              disabled={currentSection === section}
              onClick={onLinkClickFor(section)}
              color="inherit"
            >
              {t(`${section}.label`)}
            </Button>
          </Link>
        ))}
      </Buttons>
    </Wrapper>
  );
});
