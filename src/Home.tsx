import React, { ReactElement } from "react";
import { Section } from "./Section";
import UfmgLogo from "./assets/UfmgSquareLogo";
import SmartReportingLogo from "./assets/SmartReportingLogo";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { Trans, useTranslation } from "react-i18next";

interface ContentItemProps {
  title: string;
  infoLine1: string;
  infoLine2: string;
  leftIcon: React.ReactElement;
  rightIcon?: React.ReactElement;
}

const ContentItem = ({
  title,
  infoLine1,
  infoLine2,
  leftIcon,
  rightIcon,
}: ContentItemProps) => {
  const theme = useTheme();
  return (
    <ListItem secondaryAction={rightIcon}>
      <ListItemAvatar>
        <Avatar
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {leftIcon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <>
            {infoLine1}
            <br />
            <b>{infoLine2}</b>
          </>
        }
      />
    </ListItem>
  );
};

export const Home = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <Section
      greetings={[
        <div key="title">
          <Trans i18nKey="home.title" />
        </div>,
        <Button
          key="company"
          onClick={() =>
            window.open("https://www.smart-reporting.com/", "_blank")
          }
          color="inherit"
          sx={{ marginTop: 5 }}
        >
          <SmartReportingLogo sx={{ width: 300 }} />
        </Button>,
      ]}
    >
      <List>
        <ListSubheader>{t("home.education.title")}</ListSubheader>
        <Divider />
        {[
          {
            title: t("home.education.computerScience.title"),
            infoLine1: t("home.education.computerScience.info1"),
            infoLine2: t("home.education.computerScience.info2"),
            leftIcon: <UfmgLogo />,
          },
          {
            title: t("home.education.electricalEngineering.title"),
            infoLine1: t("home.education.electricalEngineering.info1"),
            infoLine2: t("home.education.electricalEngineering.info2"),
            leftIcon: <UfmgLogo />,
          },
        ].map((props) => (
          <ContentItem {...props} key={props.title} />
        ))}
        <ListSubheader>{t("home.honorAndAward.title")}</ListSubheader>
        <Divider />
        {[
          {
            title: t("home.honorAndAward.featuredStudentAward.title"),
            infoLine1: t("home.honorAndAward.featuredStudentAward.info1"),
            infoLine2: t("home.honorAndAward.featuredStudentAward.info2"),
            leftIcon: <UfmgLogo />,
            rightIcon: <Star />,
          },
        ].map((props) => (
          <ContentItem {...props} key={props.title} />
        ))}
      </List>
    </Section>
  );
};
