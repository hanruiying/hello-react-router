import React from 'react'
import { withRouter } from 'react-router'

const Hello = (props) => {
  return (
    <div><button onClick={ () => props.history.push('/about') }>Hello</button></div>
  )
}

const WithRouterHello = withRouter(Hello);

class Home extends React.Component {
  state = {
    profile: null
  }

  chooseProfile = () => {
    import('./Profile').then((mod) => {
      this.setState({
        profile: mod.default
      })
    })
  }

  render() {
    const { profile: Profile } = this.state;
    return (
      <div>
        <button onClick={ () => this.props.history.push('/about') }>click me</button>
        <p>Welcome Home</p>
        { Profile !== null
            ? <Profile />
            : <button onClick={ () => this.chooseProfile() }>chooseProfile</button>
        }
        <WithRouterHello />
      </div>
    )
  }
}

export default Home
