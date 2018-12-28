import React, { Component } from 'react'
import { compose } from 'recompose'

import { withAuthorization, withEmailVerification } from '../Session'
import { withFirebase } from '../Firebase'
import Stats from '../Stats'

class HomePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null
    }
  }

  componentDidMount () {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val()
      })
    })
  }

  componentWillUnmount () {
    this.props.firebase.users().off()
  }

  render () {
    return (
      <div className='columns'>
        <div className='column is-4'>
          <div className='box'>
            <p className='title'>Your Assassin dashboard</p>
            <div className='content'>
              <p>You can create or join a game here!</p>
              <p>You can also view your stats!</p>
            </div>
          </div>

        </div>
        <div className='column'>
          <div className='box'>
            <Stats />
          </div>
        </div>
      </div>
    )
  }
}

const condition = authUser => !!authUser

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(HomePage)
