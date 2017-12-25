import React from 'react';
import { Element } from 'react-scroll'
import AppBar from './AppBar';
import Home from './Home';
import Personal from './Personal';
import Contact from './Contact';

const elements = {
  Home: <Home />,
  Personal: <Personal />,
  Contact: <Contact />,
}

export const sections = Object.keys(elements)

class App extends React.Component {
  state = { offset: 140 }

  componentDidMount() {
    window.scrollTo(0, 0)
    this._updateOffset()
    window.addEventListener('resize', () => this._updateOffset())
  }

  _updateOffset() {
    const offset = this.appbar.holder.clientHeight
    if (offset !== this.state.offset) this.setState({ offset })
  }

  _sections = () => {
    const minHeight = `calc(100vh - ${this.state.offset}px)`
    return sections.map(key => (
      <Element style={{ minHeight }} key={key} name={key}>{elements[key]}</Element>
    ))
  }

  render = () => (
    <div style={{ marginTop: `${this.state.offset}px` }}>
      <AppBar ref={ r => this.appbar = r } offset={this.state.offset} />
      {this._sections()}
    </div>
  )
}

export default App
