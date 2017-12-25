import React from 'react';
import styles from './InstagramEmbed.css'
import { Card, CardMedia, CardTitle } from 'react-toolbox';

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

export default InstagramEmbed;
