import React, { Component } from 'react'
import Base from '../utils/base'
import { connect } from 'react-redux'
import { sendToEveryone, addTodoEveryone } from '../actions/notifications'
import { fetchUsers } from '../actions/users'

class GrownodesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grownodes: {}
    };
  }

  componentDidMount(){
    Base.bindToState(`grownodes`, {
      context: this,
      state: 'grownodes',
      asArray: false
    })
  }

  addTodo(e) {
    e.preventDefault()
    const title = e.target.title.value
    const body = e.target.body.value
    const grownodeId = e.target.grownodeId.value

    Base.push(`grownodes/${grownodeId}/todo_list`, {
      data: {
        title,
        body,
        created_at: new Date()
      }
    })
  }

  renderListItem() {
    return Object.keys(this.state.grownodes).map((key, index) => {
      const grownode = this.state.grownodes[key]
      return (
        <div className='card' style={{marginBottom: 50}} key={key}>
          <div className='card-header'>{key}</div>
          <form className='card-block' onSubmit={this.addTodo}>
            <input type='hidden' name='grownodeId' value={key} />
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='title' name='title' required />
            </div>

            <div className='input-group'>
              <textarea className='form-control' placeholder='body' name='body' required />
            </div>

            <button className='btn btn-primary btn-block'>Add</button>
          </form>
        </div>
      )
    })
  }

  render () {
    return (
      <div className='container'>
        {this.renderListItem()}
      </div>
    )
  }
};

export default connect(null, { sendToEveryone, addTodoEveryone, fetchUsers })(GrownodesList)
