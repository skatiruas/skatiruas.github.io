import React, { ReactElement, useCallback, useMemo, useState } from "react";
import styles from "./AppBar.module.css";

import Avatar from "react-toolbox/lib/avatar/Avatar";
import Button, { ButtonProps } from "react-toolbox/lib/button/Button";
import IconButton from "react-toolbox/lib/button/IconButton";
import github from "./assets/github.svg";
import gitlab from "./assets/gitlab.svg";
import linkedin from "./assets/linkedin.svg";
import { Link } from "react-scroll";

const IconLink = ({ icon, href }: { icon: string; href: string }) => {
  const props: ButtonProps = {
    target: "_blank",
    icon: <img alt={icon} src={icon} width="22" />,
    href,
  };
  return <IconButton {...props} />;
};

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

export const AppBar = React.forwardRef(function AppBarRef(
  { offset }: { offset: number },
  ref: React.Ref<HTMLDivElement>
): ReactElement {
  const [currentSectionLabel, setCurrentSectionLabel] = useState(
    SectionLabel.Home
  );
  const [isAnimating, setIsAnimating] = useState(false);

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
    <div className={styles.holder} ref={ref}>
      <div className={styles.signature}>
        <span className={styles.signatureName}>Tiago Ruas</span>
        <div className={styles.signatureLinks}>
          <IconLink icon={github} href="https://github.com/skatiruas" />
          <IconLink icon={gitlab} href="https://gitlab.com/skatiruas" />
          <IconLink
            icon={linkedin}
            href="https://www.linkedin.com/in/skatiruas"
          />
        </div>
      </div>
      <Avatar className={styles.avatar}>
        <img alt="profile" className={styles.image} src={image} />
      </Avatar>
      <div className={styles.signature}>
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
              label={label}
              disabled={currentSectionLabel === label}
              onClick={onLinkClickFor(label)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
});
