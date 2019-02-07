import React from 'react';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Button from 'react-toolbox/lib/button/Button';
import IconButton from 'react-toolbox/lib/button/IconButton';
import styles from './AppBar.module.css'
import github from './assets/github.svg'
import gitlab from './assets/gitlab.svg'
import linkedin from './assets/linkedin.svg'
import { Link } from 'react-scroll'
import { sections } from './App'

const IconLink = ({ icon, href }) => (
  <IconButton icon={<img alt={icon} src={icon} width="22" />} href={href} target='_blank'/>
)

class AppBar extends React.Component {
  state = { current: 'Home', animating: false }

  setter = (label, direct = false) => {
    const { current, animating } = this.state
    if (animating && label === current) this.setState({ animating: false })
    else if (direct && label !== current) this.setState({ animating: true, current: label })
    else if (!(direct || animating)) this.setState({ current: label })
  }

  scrollLink = label => (
    <Link to={label} spy={true} smooth={true} duration={500} key={label}
          offset={-this.props.offset} onSetActive={() => this.setter(label)} >
      <Button label={label} disabled={this.state.current === label}
              onClick={() => this.setter(label, true)}/>
    </Link>
  )

  render() {
    const personal = this.state.current === 'Personal'
    const image = `${process.env.PUBLIC_URL}/profile${personal ? '-personal' : ''}.jpg`
    return (
      <div className={styles.holder} ref={ r => this.holder = r }>
        <div className={styles.signature}>
          <span className={styles.signatureName}>Tiago Ruas</span>
          <div className={styles.signatureLinks}>
            <IconLink icon={github} href='https://github.com/skatiruas' />
            <IconLink icon={gitlab} href='https://gitlab.com/skatiruas' />
            <IconLink icon={linkedin} href='https://www.linkedin.com/in/skatiruas' />
          </div>
        </div>
        <Avatar className={styles.avatar}>
          <img alt="profile" className={styles.image} src={image} />
        </Avatar>
        <div className={styles.signature}>
          {sections.map(this.scrollLink)}
        </div>
      </div>
    )
  }
}

export default AppBar;
