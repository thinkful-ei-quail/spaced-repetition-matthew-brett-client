import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext';
import LanguageService from '../../services/language-service';
import WordCard from '../../components/WordCard/WordCard';
import './LearningRoute.css';

class LearningRoute extends Component {
  static defaultProps = {
    match: {params: {} }
  }
  
  static contextType = UserContext;

  state = {
    error: null,
    submitted: false,
    correct: false,
    guess: '',
    translation: '',
  };

  componentDidMount() {
    this.loadNextWord();
  }

  loadNextWord = () => {
    // get the current word and pass it to the word card via props.
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
          incorrect_count: res.wordIncorrectCount,
        }
        this.context.setCurrentWord(word);
        this.context.setUserScore(res.totalScore);
      })
      .catch(this.context.setError);
  }

  handleSubmit = (answer) => {
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
        this.setState({guess: answer})
        this.setState({translation: res.answer})
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

  handleNext = () => {
    this.setState({correct: false});
    this.setState({submitted: false});
    this.loadNextWord();
  }

  renderFeedback() {
    const {userScore, currentWord} = this.context;
    if (this.state.correct){
      return (
        <>
          <p>Your total score is: {userScore}</p>
          <h2>You were correct! :D</h2>
          <p>The correct translation for {currentWord.original} was {this.state.translation} and you choose {this.state.guess}!</p>
          <button onClick={this.handleNext}>Try another word!</button>
        </>
      )
    } else {
      return (
        <>
          <p>Your total score is: {userScore}</p>
          <h2>Good try, but not quite right :(</h2>
          <p>The correct translation for {currentWord.original} was {this.state.translation} and you choose {this.state.guess}!</p>
          <button onClick={this.handleNext}>Try another word!</button>
        </>
      )
    }
  }

  renderWordCard() {
    if (!this.state.submitted) {
      return <WordCard key={1} word={this.context.currentWord} handleSubmit={this.handleSubmit}/>
    } else {
      return <></>
    }
  }

  render() {
    const {userLanguage} = this.context;
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
