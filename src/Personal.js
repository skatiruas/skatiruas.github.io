import React from 'react';
import styles from './Personal.css'
import InstagramEmbed from './InstagramEmbed'

const embeds = [
  { title: 'Skateboarding', href: 'BIQToGXABVI' },
  { title: 'Snowboarding', href: 'BWbKJxXFCC8' },
  { title: 'Skydiving', href: 'BVfNA2ilMl9' },
  { title: 'Music', href: 'BQxzg5ulrZV'},
]

class Personal extends React.Component {
  render() {
    return (
      <div className={styles.personal}>
        <div className={styles.greetings}>
          <div>Also, I'm a <b>Skateboarder</b> who loves <b>
          Photography</b>, <b>Music</b> and to <b>learn new skills</b>.</div>
        </div>
        <div className={styles.embeds}>
          {embeds.map(e => <InstagramEmbed key={e.href} {...e} />)}
        </div>
      </div>
    )
  }
}

export default Personal;
