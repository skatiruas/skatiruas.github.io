import React, { ReactElement } from "react";
import { Card, CardMedia, CardTitle } from "react-toolbox/lib/card";
import styles from "./Personal.module.css";
import { Section } from "./Section";

interface Embed {
  title: string;
  href: string;
}

const embeds: Embed[] = [
  { title: "Skateboarding", href: "BIQToGXABVI" },
  { title: "Snowboarding", href: "BWbKJxXFCC8" },
  { title: "Skydiving", href: "BVfNA2ilMl9" },
  { title: "Music", href: "BQxzg5ulrZV" },
];

const Blockquote = ({ href }: Pick<Embed, "href">) => (
  <blockquote
    className={`${styles.blockquote} instagram-media`}
    data-instgrm-permalink={href}
    data-instgrm-version="8"
  >
    <div className={styles.embedCard}>
      <div className={styles.embedWindow}>
        <div className={styles.embedMedia}></div>
      </div>
    </div>
  </blockquote>
);

const InstagramEmbed = ({ href, title }: Embed) => (
  <Card className={styles.card}>
    <CardMedia>
      <Blockquote href={`https://www.instagram.com/p/${href}`} />
    </CardMedia>
    <CardTitle className={styles.cardTitle} title={title} />
  </Card>
);

export const Personal = (): ReactElement => (
  <Section
    greetings={
      <div>
        Also I&apos;m a <b>Skateboarder</b> who loves <b>Photography</b>,{" "}
        <b>Music</b> and to <b>learn new skills</b>.
      </div>
    }
  >
    <div className={styles.embeds}>
      {embeds.map(({ href, title }) => (
        <InstagramEmbed key={href} href={href} title={title} />
      ))}
    </div>
  </Section>
);
