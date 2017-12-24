import React from 'react';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox';
import styles from './Home.css'
import ufmg from './assets/ufmg-square.svg'
import appsomos from './assets/appsomos.svg'
import udacity from './assets/udacity.svg'

const education = [
  {
    title: 'Machine Learning Engineer Nanodegree',
    school: 'Udacity',
    info: 'Currently attending this course',
    avatar: udacity,
  },
  {
    title: 'BSc in Computer Science',
    school: 'Federal University of Minas Gerais',
    info: '2013/1st Semester - 2015/1st Semester',
    avatar: ufmg,
  },
  {
    title: 'Incomplete BEng in Electrical Engineering',
    school: 'Federal University of Minas Gerais',
    info: '2009/2nd Semester - 2012/2nd Semester',
    avatar: ufmg,
  },
]

const award = [
  {
    title: 'Featured Student Award',
    school: 'DCC, Federal University of Minas Gerais',
    info: '3rd Place of the 1st semester of 2015 - Computer Science',
    avatar: ufmg,
    rightIcon: 'star',
  },
]

const Item = ({ title, school, info, avatar, rightIcon }) => (
  <ListItem key={title}
    avatar={<img alt={avatar} src={avatar} className={styles.avatar} />}
    ripple={false}
    caption={title}
    legend={<div>{school}<br/><span className={styles.info}>{info}</span></div>}
    rightIcon={rightIcon}
  />
)

class Home extends React.Component {
    render() {
      return (
        <div className={styles.home}>
          <div className={styles.greetings}>
            <div>Hello, I'm a <b>Software Engineer</b> currently working at:</div>
            <a href="http://www.somoseducacao.com.br/appprova/"
               rel="noopener noreferrer" target='_blank'>
              <img alt="appprova-somos" src={appsomos} />
            </a>
          </div>
          <div>
            <List selectable ripple>
              <ListSubHeader caption='Education' />
              <ListDivider />
              {education.map(e => <Item {...e} />)}
              <br/>
              <ListSubHeader caption='Honor & Award' />
              <ListDivider />
              {award.map(e => <Item {...e} />)}
            </List>
          </div>
        </div>
      )
    }
}

export default Home;
