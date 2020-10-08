import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext';
import LanguageService from '../../services/language-service';
import WordCard from '../../components/WordCard/WordCard';
import './LearningRoute.css';

class LearningRoute extends Component {
  // TODO Implement and style Learning.
  static defaultProps = {
    match: {params: {} }
  }
  
  static contextType = UserContext;

  state = {
    error: null,
    submitted: false
  };

  componentDidMount() {
    // get the current word and pass it to the word card via props.
    // TODO Make sure to change res in setCurrentWord call to the correct passed format.
    // TODO Uncomment .catch statement once getHead is implemented server side. For now, ignore the error thats returned.
    this.context.clearError();
    LanguageService.getHead()
      .then(res => {
        this.context.setCurrentWord(res)
      })
      //.catch(this.context.setError);
  }

  handleSubmit() {
    // TODO Apply changes to userScore based on correct/incorrect.
    //      API call to /language/guess to submit answer and get reply about correctness.
    this.setState({submitted: true});
  }

  handleNext() {
    // TODO Load next wordCard.
    this.setState({submitted: false});
  }

  renderFeedback() {
    // TODO If submitted answer is correct/incorrect, provide proper feedback
    //      as well as a next word button.
    return (
      <>
      </>
    )
  }

  render() {
    const {currentWord, userLanguage} = this.context;
    return (
      <section className='learn'>
        <h2>Learn!</h2>
        <div className='userScore light window'>
          <section>
            <p>Language: {userLanguage}</p>
          </section>
        </div>
        <div className='wordCard light window'>
          <section className='feedback'>
            {this.state.submitted ? this.renderFeedback() : <></> /* TODO replace empty jsx with WordCard? */}
          </section>
          <section>
            <WordCard key={currentWord.id} word={currentWord} submit={this.handleSubmit}/>
          </section>
        </div>
      </section>
    );
  }
}

export default LearningRoute
