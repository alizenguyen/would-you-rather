import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/AnsweredQuestion.css'

class Question extends Component {
  render() {
    const { users, authedUser } = this.props

    console.log(authedUser)

    return(
      <div className="question-full-div">
        <div>
          <img className="question-avatar" src={Object.values(users)[2]} /> 
        </div>
        <div className="question-form">
          {authedUser.id === this.props.author
            ? <div className="question-title">Asked by You:</div>
            : <div className="question-title">{this.props.author} asked:</div>}
          <h3> Results </h3>
          <br />
          <p>Would you rather {this.props.optionOne} </p>
          <br />
          <p>Would you rather {this.props.optionTwo}</p>
          <br />
        </div>  
        <div className="clearfix"></div>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }, { userID }) {
  const user = users[userID];

  return {
    users: user,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(Question)