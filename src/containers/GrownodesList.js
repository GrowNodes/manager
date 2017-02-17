import React, { Component } from 'react'
import Base from '../utils/base'
import { connect } from 'react-redux'
import { sendToEveryone, addTodoEveryone } from '../actions/notifications'
import { fetchUsers } from '../actions/users'
import request from 'request'
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






    Base.fetch(`fcm_tokens/`, {
      context: this,
      queries: {
        orderByChild: 'uid',
        equalTo: this.state.grownodes[grownodeId].owner_uid
      }
    }).then(data => {
      const fcm_tokens = Object.keys(data)

      var options = {
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
          'Authorization': 'key=AAAAetYor2s:APA91bHkaQM2PAmL8rODHC4ChVSFpADsi9JXJoVzAVb4FnuMnio55OONzSfEBffVIXuB3otnKE88O3MQp6kSURnoUIY2SBmw0SHI9GXsADE-vt2T3s1e4Lz4QFjJccfo2W1ZF1nu00h_csyr70b6_kzOm38DBPlqqg',
        },
        json:true,
        body: {
          registration_ids: fcm_tokens,
          data: {
            title,
            body
          }
        }
      }

      request(options, function (error, response, body) {
        console.log(body)
      })
    })
  }

  renderListItem() {
    return Object.keys(this.state.grownodes).map((key, index) => {
      const grownode = this.state.grownodes[key]
      return (
        <div className='card' style={{marginBottom: 50}} key={key}>
          <div className='card-header'>{key}</div>
          <form className='card-block' onSubmit={this.addTodo.bind(this)}>
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
