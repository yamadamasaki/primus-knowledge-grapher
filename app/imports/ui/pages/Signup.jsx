import React from 'react'
import PropTypes from 'prop-types'
import {Link, Redirect} from 'react-router-dom'
import {Button, Container, Form, Grid, Header, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Accounts} from 'meteor/accounts-base'
import NotFound from './NotFound'

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props)
    this.state = {email: '', password: '', username: '', avatar: undefined, error: '', redirectToReferer: false}
  }

  setAvatar(files) {
    if (files.length === 0) this.setState({avatar: undefined})
    const reader = new FileReader()
    reader.onload = e => this.setState({avatar: e.target.result})
    reader.readAsDataURL(files[0])
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, {name, value}) => {
    if (name === 'avatar') this.setAvatar(e.target.files)
    else this.setState({[name]: value})
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const {email, password, username, avatar} = this.state
    Accounts.createUser({email, username: email, password, profile: {avatar, username}}, (err) => {
      if (err) {
        this.setState({error: err.reason})
      } else {
        this.setState({error: '', redirectToReferer: true})
      }
    })
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    if (Meteor.settings.public.selfRegistration !== true) return <NotFound/>
    const {from} = this.props.location.state || {from: {pathname: '/programs'}}
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>
    }
    const resetAvatar = e => {
      e.preventDefault()
      this.setState({avatar: undefined})
    }
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Register your account
              </Header>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Input label="Email" icon="user" iconPosition="left" name="email" type="email"
                              placeholder="E-mail address" onChange={this.handleChange}/>
                  <Form.Input label="Password" icon="lock" iconPosition="left" name="password" placeholder="Password"
                              type="password" onChange={this.handleChange}/>
                  <Form.Input label="Username" icon="address card" iconPosition="left" name="username"
                              placeholder="Username" onChange={this.handleChange}/>
                  <Form.Input label="Avatar" icon="file image" iconPosition="left" name="avatar" type="file"
                              accept="image/*" placeholder="Avatar" onChange={this.handleChange}
                              action={<Button onClick={resetAvatar}><Icon name="remove"/></Button>}
                              actionPosition="right"/>
                  {this.state.avatar ? <Image src={this.state.avatar} avatar size='tiny'/> : <div/>}
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {
                this.state.error === '' ? '' :
                    <Message error header="Registration was not successful" content={this.state.error}/>
              }
            </Grid.Column>
          </Grid>
        </Container>
    )
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
}

export default Signup
