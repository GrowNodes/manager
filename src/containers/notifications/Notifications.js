import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendToEveryone } from '../../actions/notifications';
class Notifications extends Component {

  sendToEveryone(event) {
    event.preventDefault();
    const title = this.refs.title;
    const body = this.refs.body;
    this.props.dispatch(sendToEveryone(this, title.value, body.value));
    title.value = '';
    body.value = '';
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Send notification to everyone</div>
              <form className="card-block">
                <div className="input-group">
                  <input type="text" ref="title" className="form-control" placeholder="title" required autoFocus/>
                </div>

                <div className="input-group">
                  <textarea ref="body" className="form-control" placeholder="body" required />
                </div>


                <button className="btn btn-primary btn-block" onClick={this.sendToEveryone.bind(this)}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


function mapStateToProps(state) {
  return { grownodes: state.grownodes };
}


export default connect(mapStateToProps)(Notifications);
