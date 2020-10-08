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
    submitted: false,
    correct: false,
  };

  componentDidMount() {
    // get the current word and pass it to the word card via props.
    // TODO Make sure to change res in setCurrentWord call to the correct passed format.
    // TODO Uncomment .catch statement once getHead is implemented server side. For now, ignore the error thats returned.
    /* LanguageService.getHead() response structure:
      nextWord: headWord.original,
      totalScore: req.language.total_score,
      wordCorrectCount: headWord.correct_count,
      wordIncorrectCount: headWord.incorrect_count,
    */
    this.context.clearError();
    LanguageService.getHead()
      .then(res => {
        const word = {
          original: res.nextWord,
          correct_count: res.wordCorrectCount,
          incorrect_count: res.wordIncorrectCount
        }
        this.context.setCurrentWord(word);
        this.context.setUserScore(res.totalScore);
      })
      .catch(this.context.setError);
  }

  handleSubmit = (answer) => {
    // TODO Apply changes to userScore based on correct/incorrect.
    //      API call to /language/guess through LanguageService to submit answer and get reply about correctness.
    /* LanguageService.submitGuess() response structure:
      const response = {
        nextWord: wordList.head.value.original,
        wordCorrectCount: wordList.head.value.correct_count,
        wordIncorrectCount: wordList.head.value.incorrect_count,
        totalScore: req.language.total_score,
        answer: previousHead.value.translation,
        isCorrect: isCorrect,
      };
    */
    LanguageService.submitGuess(answer)
      .then(res => {
        if (res.isCorrect === true) {
          this.setState({submitted: true});
          this.setState({correct: true});
          this.context.setUserScore(this.context.userScore + 1);
        } else {
          this.setState({submitted: true});
          this.setState({correct: false});
          this.context.setUserScore(this.context.userScore - 1);
        }
      })
      .catch(this.context.setError);
  }

  handleNext() {
    // TODO Load next wordCard.
    this.setState({submitted: false, correct: false});
  }

  renderFeedback() {
    // TODO If submitted answer is correct/incorrect, provide proper feedback
    //      as well as a next word button.
    if (this.state.correct === true){
      return (
        <>
          <p>Correct!</p>
          <button>Next</button>
        </>
      )
    } else {
      return (
        <>
          <p>Incorrect!</p>
          <button>Next</button>
        </>
      )
    }
  }

  renderWordCard() {
    console.log(this.state.submitted);
    if (!this.state.submitted) {
      return <WordCard key={1} word={this.context.currentWord} handleSubmit={this.handleSubmit}/>
    } else {
      return <></>
    }
  }

  render() {
    const {userLanguage} = this.context;
    console.log(this.state.submitted);
    const isSubmitted = this.state.submitted;
    return (
      <section className='learn'>
        <h2>Learn!</h2>
        <div className='userScore light window'>
          <section>
            <p>Language: {userLanguage}</p>
          </section>
        </div>
        <div className='wordCard light window'>
          <section className={isSubmitted ? 'feedback' : ''}>
            {isSubmitted ? this.renderFeedback() : <></>}
          </section>
          <section>
            {this.renderWordCard()}
          </section>
        </div>
      </section>
    );
  }
}

export default LearningRoute
