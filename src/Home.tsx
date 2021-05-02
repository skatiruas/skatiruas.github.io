import React, { ReactElement } from "react";
import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
} from "react-toolbox/lib/list";
import { Section } from "./Section";
import styles from "./Home.module.css";
import ufmg from "./assets/ufmg-square.svg";
import smartReporting from "./assets/smart-reporting.svg";

interface ContentItem {
  title: string;
  school: string;
  info: string;
  avatar: string;
  rightIcon?: string;
}

const education: ContentItem[] = [
  {
    title: "BSc in Computer Science",
    school: "Federal University of Minas Gerais",
    info: "2013/1st Semester - 2015/1st Semester",
    avatar: ufmg,
  },
  {
    title: "Incomplete BEng in Electrical Engineering",
    school: "Federal University of Minas Gerais",
    info: "2009/2nd Semester - 2012/2nd Semester",
    avatar: ufmg,
  },
];

const award: ContentItem[] = [
  {
    title: "Featured Student Award",
    school: "DCC, Federal University of Minas Gerais",
    info: "3rd Place of the 1st semester of 2015 - Computer Science",
    avatar: ufmg,
    rightIcon: "star",
  },
];

const greetings = [
  <div key="title">
    Hello, I&apos;m a <b>Software Engineer</b> currently working at:
  </div>,
  <a
    key="image"
    href="https://www.smart-reporting.com/"
    rel="noopener noreferrer"
    target="_blank"
    className={styles.currentWork}
  >
    <img
      className={styles.currentLogo}
      alt="smart-reporting"
      src={smartReporting}
    />
  </a>,
];

const renderListItem = (
  { title, school, info, avatar, rightIcon }: ContentItem,
  i: number
) => {
  const props = {
    itemContent: (
      <div className={styles.itemContent}>
        <div className={styles.itemTitle}>{title}</div>
        <div className={styles.itemSchool}>{school}</div>
        <div className={styles.itemInfo}>{info}</div>
      </div>
    ),
    avatar: <img alt={avatar} src={avatar} className={styles.avatar} />,
  };
  return (
    <ListItem
      {...props}
      key={`${i}${title}`}
      ripple={false}
      rightIcon={rightIcon}
    />
  );
};

export const Home = (): ReactElement => (
  <Section greetings={greetings}>
    <div>
      <List>
        <ListSubHeader caption="Education" />
        <ListDivider />
        {education.map(renderListItem)}
        <br />
        <ListSubHeader caption="Honor & Award" />
        <ListDivider />
        {award.map(renderListItem)}
      </List>
    </div>
  </Section>
);
