import React, { Component } from 'react';
import userContext from '../../contexts/UserContext';
//import LanguageService from '../../services/language-service';
import './WordCard.css';

export default class WordCard extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  };

  static defaultProps = { 
    match: { params: {} }
  };
  static contextType = userContext;

  submitAnswer(ev) {
    ev.preventDefault();
    this.props.handleSubmit(this.state.value);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  renderWordCard() {
    const {userScore} = this.context;
    // Returning test layout card if no card is properly provided.
    //console.log(this.props)
    const word = this.props.word// !== undefined ? this.props.word : {original: 'Escargot', correct_count: 5, incorrect_count: 3}
    return (
      <>
        <h2>Tanslate the word:</h2>
        <span>{word.original}</span>
        <p>Your total score is: {userScore}</p>
        <form onSubmit={this.submitAnswer}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input id='learn-guess-input' type='text' required='required' value={this.state.value} onChange={this.handleChange}/>
          <button type='submit'>Submit your answer</button>
        </form>
        <section>
          <p>You have answered this word correctly {word.correct_count} times.</p>
          <p>You have answered this word incorreclty {word.incorrect_count} times.</p>
        </section>
      </>
    )
  };

  render() {
    const {error} = this.context;
    return (
      <section className='wordCard'>
        {error ? <p className='red'>There was an error, please try again.</p> : this.renderWordCard()}
      </section>
    );
  };
}