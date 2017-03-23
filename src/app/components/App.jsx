import React from 'react'
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route,
  // Link,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'

import Home from './Home.jsx'

import ListLinks from './links/ListLinks.jsx'

const ActiveNavLink = (props) => (
  <NavLink activeClassName="active" {...props}>{props.children}</NavLink>
)

const NavMenu = () => (
  <nav className="ui menu">
    <ActiveNavLink className="item" exact to="/">Home</ActiveNavLink>
    <ActiveNavLink className="item" exact to="/links">Links</ActiveNavLink>
  </nav>
)

const EditLink = () => (<h1>Edit Link</h1>)

const App = () => (
  <Router>
    <div>
      <NavMenu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/links" component={ListLinks} />
        <Route path="/links/:id" component={EditLink} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

export default App
