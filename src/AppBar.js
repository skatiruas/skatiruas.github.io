import React from 'react';
import { Avatar, IconButton, Button } from 'react-toolbox';
import styles from './AppBar.css'
import github from './assets/github.svg'
import linkedin from './assets/linkedin.svg'

const Link = ({ icon, href }) => (
  <IconButton icon={<img alt={icon} src={icon} width="22" />} href={href} target='_blank'/>
)

class AppBar extends React.Component {
    render() {
      return (
        <div className={styles.holder}>
          <div className={styles.signature}>
            <span className={styles.signatureName}>Tiago Ruas</span>
            <div className={styles.signatureLinks}>
              <Link icon={github} href='https://github.com/skatiruas' />
              <Link icon={linkedin} href='https://www.linkedin.com/in/skatiruas' />
            </div>
          </div>
          <Avatar className={styles.avatar}>
            <img className={styles.image} src={`${process.env.PUBLIC_URL}/profile.jpg`} />
          </Avatar>
            <div className={styles.signature}>
              <Button disabled label='Home' />
              <Button label='Projects' />
              <Button label='Personal' />
              <Button label='Contact' />
            </div>
        </div>
      )
    }
}

export default AppBar;
