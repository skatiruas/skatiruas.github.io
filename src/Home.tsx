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

interface ContentItemProps {
  title: string;
  infoLine1: string;
  infoLine2: string;
  leftIcon: React.ReactElement;
  rightIcon?: React.ReactElement;
}

const education: ContentItemProps[] = [
  {
    title: "BSc in Computer Science",
    infoLine1: "Federal University of Minas Gerais",
    infoLine2: "2013/1st Semester - 2015/1st Semester",
    leftIcon: <UfmgLogo />,
  },
  {
    title: "Incomplete BEng in Electrical Engineering",
    infoLine1: "Federal University of Minas Gerais",
    infoLine2: "2009/2nd Semester - 2012/2nd Semester",
    leftIcon: <UfmgLogo />,
  },
];

const award: ContentItemProps[] = [
  {
    title: "Featured Student Award",
    infoLine1: "DCC, Federal University of Minas Gerais",
    infoLine2: "3rd Place of the 1st semester of 2015 - Computer Science",
    leftIcon: <UfmgLogo />,
    rightIcon: <Star />,
  },
];

const greetings = [
  <div key="title">
    Hello, I&apos;m a <b>Software Engineer</b> currently working at:
  </div>,
  <Button
    onClick={() => window.open("https://www.smart-reporting.com/", "_blank")}
    color="inherit"
    sx={{ marginTop: 5 }}
  >
    <SmartReportingLogo sx={{ width: 300 }} />
  </Button>,
];

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
            <div>{infoLine1}</div>
            <div style={{ fontWeight: 600 }}>{infoLine2}</div>
          </>
        }
      />
    </ListItem>
  );
};

export const Home = (): ReactElement => (
  <Section greetings={greetings}>
    <List>
      <ListSubheader>Education</ListSubheader>
      <Divider />
      {education.map((props) => (
        <ContentItem {...props} />
      ))}
      <ListSubheader>Honor & Award</ListSubheader>
      <Divider />
      {award.map((props) => (
        <ContentItem {...props} />
      ))}
    </List>
  </Section>
);
