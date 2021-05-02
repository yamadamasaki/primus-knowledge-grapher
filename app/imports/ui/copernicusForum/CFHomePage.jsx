import React from 'react'
import {Grid, Header} from 'semantic-ui-react'

const CFHomePage = ({program}) => {
  const {title, subtitle, fromDate, toDate, organization} = program.structure
  const height = '30vh'

  return (
      <Grid columns={1} textAlign='center' verticalAlign='middle' style={{height: '100vh'}} padded>
        <Grid.Row style={{height}}>
          <Grid.Column>
            <Header as="h1">{title}
              <Header.Subheader>{subtitle}</Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{height}}>
          <Grid.Column>
            <Header as="h2">{fromDate} - {toDate}</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{height}}>
          <Grid.Column>
            <Header as="h2">{organization}</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default CFHomePage
