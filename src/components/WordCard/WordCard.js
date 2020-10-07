import React, { Component } from 'react';
import userContext from '../../contexts/UserContext';
//import LanguageService from '../../services/language-service';
import './WordCard.css';

// TODO Implement Word Cards, to display the word and let the user enter a guess.

export default class WordCard extends Component {
  static defaultProps = { 
    match: { params: {} }
  };

  static contextType = userContext;

  componentDidMount() {
    // Retrieve word data? Pull correct word from userContext. Or use LanguageService.
  };

  renderWordCard() {
    // Create word card?
    // Returning test layout card.
    return (
      <>
        <h2>Tanslate the word:</h2>
        <span>Escargo</span>
        <p>Your total score is: 9001</p>
        <form>
          <label for='learn-guess-input'>What's the translation for this word?</label>
          <input id='learn-guess-input' type='text' required='required'/>
          <button type='submit'>Submit your answer</button>
        </form>
        <section>
          <p>You have answered this word correctly 5 times.</p>
          <p>You have answered this word incorreclty 3 times.</p>
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