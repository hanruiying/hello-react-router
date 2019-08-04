import React from 'react'
import { Prompt } from 'react-router-dom';

class About extends React.Component {
  state = {
    name: ""
  }

  render() {
    return (
      <div>
        <Prompt
          when={ !!this.state.name }
          message={ location => `Are you sure you want to go to ${location.pathname}?` }
        />
        <input
          value={ this.state.name }
          type="text"
          onChange={ e => this.setState({ name: e.target.value }) }
        />
      </div>
    )
  }
}

export default About
