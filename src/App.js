import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import NoMatch from './components/Error';
// import queryString from 'query-string';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

// import Link from 'react-router-dom/Link';

const User = (props) => {
  // 解析?name='dasdg'&a='daaf'的数据结构
  // const params = new URLSearchParams(props.location.search);
  // console.log(params.get("name"));
  // console.log(params.get("a"));
  // const values = queryString.parse(props.location.search);
  // console.log(values.name);
  // console.log(values.a);
  // console.log(props.location.state.fromDashboard);
  console.log(props);
  return (
    props.match.params.id === 'rails365' ?
    <Redirect to="/" /> :
    <div>User { props.match.params.id }</div>
  )
}

// const MenuLink = ({ children, to, exact }) => {
//   const match = window.location.pathname === to
//   return (
//     <NavLink activeStyle={ match ? { color: 'green' } : {} } to={ to }>
//       { match ? '>' : '' }{ children }
//     </NavLink>
//   )
// }

const MenuLink = ({ children, to, exact }) => {
  return (
    <Route path={ to } exact={ exact } children={ ({ match }) => (
      <NavLink activeStyle={ match ? { color: 'green' } : {} } to={ to }>
        { match ? '>' : '' }{ children }
      </NavLink>
    )} />
  )
}

const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/about",
    component: About,
    exact: true,
    strict: true
  }
]

class DynamicImport extends Component {
  state = {
    component: null
  }

  // componentDidMount
  componentWillMount() {
    this.props.load()
      .then((mod) => this.setState({
        component: mod.default
      }))
  }

  render() {
    return this.props.children(this.state.component)
  }
}

const Profile = (props) => (
  <DynamicImport load={() => import('./components/Profile')}>
    {(Component) => Component === null 
      ? <h1>Loading...</h1>
      : <Component { ...props } />
    }
  </DynamicImport>
)

const About = (props) => (
  <DynamicImport load={() => import('./components/About')}>
    {(Component) => Component === null 
      ? <h1>Loading...</h1>
      : <Component { ...props } />
    }
  </DynamicImport>
)

class App extends Component {
  handleClick = () => {
    console.log(this.props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="App-intro">
            <ul>
              <li>
                <MenuLink exact={ true } to="/">
                  Home
                </MenuLink>
              </li>
              <li>
                <MenuLink exact={ true } to="/profile">
                  Profile
                </MenuLink>
              </li>
              <li>
                <MenuLink exact={ true } to="/about">
                  About
                </MenuLink>
              </li>
              <li>
                <NavLink
                  to="/error"
                  activeStyle={{
                    color: 'green'
                }}>
                  Error
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users/rails365"
                  activeStyle={{
                    color: 'green'
                }}>
                  Rails365
                </NavLink>
              </li>
              <li>
                <Link to={{
                  pathname: '/users/rails365',
                  search: '?a=b',
                  hash: '#the-hash',
                  state: { fromDashboard: true }
                }}>
                  pro
                </Link>
              </li>
            </ul>
            <div>
              <button onClick={ () => this.handleClick() }>push</button>
            </div>
            <Switch>
              { routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  { ...route }
                />
              ))}
              <Route path="/about/new" component={ About } />
              <Route path="/home" component={ Home } />
              <Route path="/profile" component={ Profile } />
              <Route path="/new_home" render={ (props) => <Home { ...props } name={ "rails365" } /> } />
              <Route path="/users/profile/:id" component={ User } />
              <Redirect from="/users/:id" to="/users/profile/:id" />
              <Route component={ NoMatch } />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
