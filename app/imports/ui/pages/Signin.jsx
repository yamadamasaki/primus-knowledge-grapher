import React from 'react'
import PropTypes from 'prop-types'
import {Link, Redirect} from 'react-router-dom'
import {Meteor} from 'meteor/meteor'
import {Container, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {withTranslation} from 'react-i18next'

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props)
    this.state = {email: '', password: '', error: '', redirectToReferer: false}
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, {name, value}) => {
    this.setState({[name]: value})
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const {email, password} = this.state
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({error: err.reason})
      } else {
        this.setState({error: '', redirectToReferer: true})
      }
    })
  }

  /** Render the signin form. */
  render() {
    const {location, t} = this.props
    const {from} = location.state || {from: {pathname: '/'}}
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>
    }
    // Otherwise return the Login form.
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                {t('Login to your account')}
              </Header>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Input label={t('Email')} icon="user" iconPosition="left" name="email" type="email"
                              placeholder="E-mail address" onChange={this.handleChange}/>
                  <Form.Input label={t('Password')} icon="lock" iconPosition="left" name="password"
                              placeholder="Password" type="password" onChange={this.handleChange}/>
                  <Form.Button content={t('Submit')}/>
                </Segment>
              </Form>
              {
                Meteor.settings.public.selfRegistration === true ?
                    <Message>
                      <Link to="/signup">{t('Click here to Register')}</Link>
                    </Message> : <div/>
              }
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message error header={t('Login was not successful')} content={this.state.error}/>
              )}
            </Grid.Column>
          </Grid>
        </Container>
    )
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
  t: PropTypes.func,
}

export default withTranslation()(Signin)
