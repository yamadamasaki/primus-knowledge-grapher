import React, {createContext, useState} from 'react'
import PropTypes from 'prop-types'
import {Meteor} from 'meteor/meteor'
//import 'semantic-ui-css/semantic.css'
import {Roles} from 'meteor/alanning:roles'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Landing from '../pages/Landing'
import ListStuff from '../pages/ListStuff'
import ListStuffAdmin from '../pages/ListStuffAdmin'
import AddStuff from '../pages/AddStuff'
import EditStuff from '../pages/EditStuff'
import NotFound from '../pages/NotFound'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Signout from '../pages/Signout'
import Users from '../pages/Users'
import ProgramPage from '../pages/ProgramPage'
import ScenarioFormPage from '../pages/ScenarioFormPage'
import ScenarioPage from '../pages/ScenarioPage'
import ProgramHomePage from '../pages/ProgramHomePage'
import SessionPage from '../pages/SessionPage'
import SubsessionPage from '../pages/SubsessionPage'
import {ToastProvider} from 'react-toast-notifications'
import EditProfile from '../pages/EditProfile'

export const SideBarContext = createContext({})

const styleLink = document.createElement("link")
styleLink.rel = "stylesheet"
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
document.head.appendChild(styleLink)

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false)

  return (
      <Router>
        <SideBarContext.Provider value={{sideBarOpen, setSideBarOpen}}>
          <ToastProvider>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Meteor.settings.public.selfRegistration ? Signup : NotFound}/>
              <ProtectedRoute path="/profile" component={EditProfile}/>
              <ProtectedRoute path="/list" component={ListStuff}/>
              <ProtectedRoute path="/add" component={AddStuff}/>
              <ProtectedRoute exact path="/programs" component={ProgramPage}/>
              <ProtectedRoute path="/programs/:programId" component={ProgramHomePage}/>
              <ProtectedRoute path="/scenario/edit/:programId" component={ScenarioFormPage}/>
              <ProtectedRoute path="/scenario/show/:programId" component={ScenarioPage}/>
              <ProtectedRoute exact path="/sessions/:programId/:componentName/:sessionId" component={SessionPage}/>
              <ProtectedRoute path="/sessions/:programId/:componentName/:sessionId/:subsessionName"
                              component={SubsessionPage}/>
              <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
              <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
              <AdminProtectedRoute path="/users" component={Users}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </ToastProvider>
        </SideBarContext.Provider>
      </Router>
  )
}
/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null
          return isLogged ?
              (<Component {...props} />) :
              (<Redirect to={{pathname: '/signin', state: {from: props.location}}}/>
              )
        }}
    />
)

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin')
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{pathname: '/signin', state: {from: props.location}}}/>
              )
        }}
    />
)

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
  location: PropTypes.object,
}

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
  location: PropTypes.object,
}

export default App
