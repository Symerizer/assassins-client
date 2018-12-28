import React, { Component } from 'react'
import { withFirebase } from '../Firebase'
class Stats extends Component {
  constructor () {
    super()
    this.state = {
      stats: []
    }
  }
  componentDidMount = () => {
    const userId = JSON.parse(localStorage.getItem('authUser')).uid
    this.props.firebase.user(userId).on('value', snapshot => {
      const user = snapshot.val()
      if (user.stats !== undefined) {
        this.setState({ stats: user.stats })
      }
    })
  }

  render () {
    return (
      <div>
        <p className='title'>Your stats</p>
        <div className='content' >
          {this.state.stats.length !== 0 ? (
            <p>Your stats!</p>
          ) : (
            <p>You have no stats yet!</p>
          )}
        </div>
      </div>
    )
  }
}

export default withFirebase(Stats)
