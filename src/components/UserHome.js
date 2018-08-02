import React, { Component } from 'react'
import Nav from './Nav'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'
import AnsweredQuestion from './AnsweredQuestion'
import '../css/UserHome.css'
import { getAuthedUser } from '../actions/authedUser'
import { loadingQuestions } from '../actions/questions'
import { loadingUsers } from '../actions/users'

class UserHome extends Component {
  state = {
    loading: true,
    showUnansweredQuestions: true,
  }

  componentDidMount() {
    const { getSelectedUser } = this.props;
      getSelectedUser()
  }

  renderAnsweredQuestions = () => {
    if (this.state.showUnansweredQuestions === true) {
      this.setState(
        {showUnansweredQuestions: false}
      )
    } 
  }

  renderUnansweredQuestions = () => {
    if (this.state.showUnansweredQuestions === false) {
      this.setState(
        {showUnansweredQuestions: true}
      )
    } 
  }

  render() {

    const { authedUser, unAnsweredQuestions, answeredQuestions, authedUserAvatar } = this.props
    const { loading, showUnansweredQuestions } = this.state

    if (loading === true && authedUser === null) {
      return <Redirect to='/' />
    }

    return (
      <div className='userHome-full'>
        <Nav />
        <div className="userHome-question-buttons-div">
          <button className="userHome-question-buttons userHome-unanswer-btn" onClick={this.renderUnansweredQuestions}>QUESTIONS TO ANSWER</button>
          <button className="userHome-question-buttons userHome-answer-btn" onClick={this.renderAnsweredQuestions}>ANSWERED QUESTIONS</button>
        </div>
        <div>
          {showUnansweredQuestions === true ? (
            unAnsweredQuestions.map(question => (
              <Question 
                key={question.id}
                questionID={question.id}
                author={question.author}
                optionOne={question.optionOne.text}
                optionTwo={question.optionTwo.text}
                userID={question.author}
                />
            ))) 
            : answeredQuestions.map(question => (
              <AnsweredQuestion 
                key={question.id}
                author={question.author}
                optionOne={question.optionOne.text}
                optionTwo={question.optionTwo.text}
                userID={question.author}
                optionOneVotes={question.optionOne.votes}
                optionTwoVotes={question.optionTwo.votes}
                />
            ))
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({questions, users, authedUser}, props) {
  let unAnsweredQuestions = {}

  let answeredQuestions = {}

  if (authedUser !== null) {
    unAnsweredQuestions = Object.values(Object.values(questions)).filter((question) => 
      !question.optionOne.votes.includes(authedUser.id) && !question.optionTwo.votes.includes(authedUser.id)); 

    answeredQuestions = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id));
  }

  return {
    unAnsweredQuestions: Object.values(unAnsweredQuestions),
    answeredQuestions: Object.values(answeredQuestions),
    users: users,
    authedUser: authedUser,
    questions: questions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSelectedUser: () => dispatch(getAuthedUser()),
    getQuestions: () => dispatch(loadingQuestions()),
    getUsers: () => dispatch(loadingUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);