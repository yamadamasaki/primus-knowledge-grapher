import React from 'react'
import {Button, Container, Form, Grid, Header, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {withTranslation} from 'react-i18next'
import {Meteor} from 'meteor/meteor'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    const user = Meteor.user()
    const {username, avatar} = user?.profile || {}
    this.state = {username, avatar, error: ''}
  }

  setAvatar(files) {
    if (files.length === 0) this.setState({avatar: undefined})
    const reader = new FileReader()
    reader.onload = e => this.setState({avatar: e.target.result})
    reader.readAsDataURL(files[0])
  }

  handleChange = (e, {name, value}) => {
    if (name === 'avatar') this.setAvatar(e.target.files)
    else this.setState({[name]: value})
  }

  submit = () => {
    const {username, avatar} = this.state
    Meteor.call('users.updateProfile', {
      userId: Meteor.user()?._id,
      profile: {username, avatar},
    }, (error, _) => {
      if (error) this.setState({error})
      else this.setState({error: this.props.t('Your profile has updated.')})
    })
  }

  render() {
    const {t} = this.props

    const resetAvatar = e => {
      e.preventDefault()
      this.setState({avatar: undefined})
    }

    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                {t('Edit your profile')}
              </Header>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Input label={t('Username')} icon="address card" iconPosition="left" name="username"
                              placeholder={t('Username')} onChange={this.handleChange}
                              defaultValue={this.state.username}/>
                  <Form.Input label={t('Avatar')} icon="file image" iconPosition="left" name="avatar" type="file"
                              accept="image/*" onChange={this.handleChange}
                              action={<Button onClick={resetAvatar}><Icon name="remove"/></Button>}
                              actionPosition="right"/>
                  {this.state.avatar ? <Image src={this.state.avatar} avatar size="tiny"/> : <div/>}
                  <Form.Button content={t('Submit')}/>
                </Segment>
              </Form>
              {
                this.state.error === '' ? '' :
                    <Message error header={t('Updating was not successful')} content={this.state.error}/>
              }
            </Grid.Column>
          </Grid>
        </Container>
    )
  }
}

export default withTranslation()(EditProfile)
