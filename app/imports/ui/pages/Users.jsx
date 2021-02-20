import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Container, Header } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

const Users = () => {
  const users = useTracker(() => Meteor.users, [])
  const { t } = useTranslation()

  return (
          <Container>
            <Header as="h2" textAlign="center">{t('Users')}</Header>
            <ul>
              {users.find().fetch().map((user, index) => <li key={index}>{user.username}</li>)}
            </ul>
          </Container>
  )
}

export default Users
