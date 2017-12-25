import React from 'react';
import { Input, Button } from 'react-toolbox';
import Section from './Section'
import styles from './Contact.css';

const validEmail = email => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
const emptyState = { name: '', email: '', message: '', errors: {}, status: false }

class Contact extends React.Component {
  state = { ...emptyState }

  _handleChange = (field, value) => {
    this.setState({ [field]: value, errors: { ...this.state.errors, [field]: ''}, status: false })
  }

  _input = (type, label, field, props = {}) => {
    const valueProps = { value: this.state[field], error: this.state.errors[field] }
    const fieldProps = { type, label, name: field, onChange: v => this._handleChange(field, v) }
    return <Input className={styles.input} {...props} {...fieldProps} {...valueProps} />
  }

  _validate = () => {
    const { name, email, message } = this.state
    const errors = {}
    if (!name) errors['name'] = "Name can't be blank"
    if (!email) errors['email'] = "Email can't be blank"
    else if(!validEmail(email)) errors['email'] = 'Email is invalid'
    if (!message) errors['message'] = "Message can't be blank"

    this.setState({ errors })
    return !Object.keys(errors).length
  }

  _send = () => {
    if (!this._validate()) return
    const { name, email, message } = this.state
    this.setState({ status: 'sending' })
    fetch('https://formspree.io/skatiruas@gmail.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    }).then(() => {
      this.setState({ ...emptyState, status: 'sent' })
    }).catch(() => {
      this.setState({ errors: { message: 'Unknown error, try again'} })
    })
  }

  _button = () => {
    const sent = this.state.status === 'sent'
    const props = {
      icon: sent ? 'email' : undefined,
      label: sent ? 'The Email has been sent' : 'Send',
      disabled: sent || this.state.status === 'sending',
      className: sent ? styles.sent : '',
    }
    return <Button {...props} onClick={this._send} raised primary />
  }

  render = () => (
    <Section greetings={
      <div>If you are interested in <b>professional</b> or even <b>
      personal</b> contact, send me a message! </div>}
      childrenClassName={styles.form}
    >
      <div>
        {this._input('text', 'Name', 'name')}
        {this._input('email', 'Email', 'email')}
        {this._input('text', 'Message', 'message', { multiline: true, rows: 6 })}
        {this._button()}
      </div>
    </Section>
  )
}

export default Contact
