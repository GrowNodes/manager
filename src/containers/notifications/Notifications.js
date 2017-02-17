import React, { Component } from 'react'
import Base from '../../utils/base'
import { connect } from 'react-redux'
import { sendToEveryone, addTodoEveryone } from '../../actions/notifications'
import { fetchUsers } from '../../actions/users'
class Notifications extends Component {

  componentDidMount(){
    Base.syncState(`grownodes`, {
      context: this,
      state: 'grownodes',
      asArray: false
    })
  }

  sendToEveryone (event) {
    event.preventDefault()
    const body = this.refs.body
    this.props.sendToEveryone(this, body.value)
    body.value = ''
  }

  addTodoEveryone (event) {
    event.preventDefault()
    const title = this.refs.todotitle
    const body = this.refs.todobody
    this.props.addTodoEveryone(this, title.value, body.value)
    title.value = ''
    body.value = ''
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Send text to everyone</div>
              <form className='card-block'>

                <div className='input-group'>
                  <textarea ref='body' className='form-control' placeholder='body (required)' required autoFocus />
                </div>

                <button className='btn btn-primary btn-block' onClick={this.sendToEveryone.bind(this)}>Send</button>
              </form>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Add todo item to everyone</div>
              <form className='card-block'>
                <div className='input-group'>
                  <input type='text' ref='todotitle' className='form-control' placeholder='title' required autoFocus />
                </div>

                <div className='input-group'>
                  <textarea ref='todobody' className='form-control' placeholder='body' required />
                </div>

                <button className='btn btn-primary btn-block' onClick={this.addTodoEveryone.bind(this)}>Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps (state) {
  return { users: state.users }
}

export default connect(mapStateToProps, { sendToEveryone, addTodoEveryone, fetchUsers })(Notifications)
