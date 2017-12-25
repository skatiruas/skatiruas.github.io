import React from 'react';
import { Card, CardMedia, CardTitle } from 'react-toolbox';
import styles from './Personal.css'
import Section from './Section'

const embeds = [
  { title: 'Skateboarding', href: 'BIQToGXABVI' },
  { title: 'Snowboarding', href: 'BWbKJxXFCC8' },
  { title: 'Skydiving', href: 'BVfNA2ilMl9' },
  { title: 'Music', href: 'BQxzg5ulrZV'},
]

const Blockquote = ({ href }) => (
  <blockquote
    className={`${styles.blockquote} instagram-media`}
    data-instgrm-permalink={href}
    data-instgrm-version="8"
  >
    <div className={styles.embedCard}>
      <div className={styles.embedWindow}>
        <div className={styles.embedMedia}>
        </div>
      </div>
    </div>
  </blockquote>
)

const InstagramEmbed = ({ href, title }) => (
  <Card className={styles.card}>
    <CardMedia>
      <Blockquote href={`https://www.instagram.com/p/${href}`} />
    </CardMedia>
    <CardTitle className={styles.cardTitle} title={title} />
  </Card>
)

const Personal = () => (
  <Section greetings={
    <div>Also I'm a <b>Skateboarder</b> who loves <b>
    Photography</b>, <b>Music</b> and to <b>learn new skills</b>.</div>}
  >
    <div className={styles.embeds}>
      {embeds.map(e => <InstagramEmbed key={e.href} {...e} />)}
    </div>
  </Section>
)

export default Personal;
