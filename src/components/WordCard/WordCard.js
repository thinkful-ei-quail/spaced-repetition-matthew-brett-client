import React, { Component } from 'react';
import userContext from '../../contexts/UserContext';
import LanguageService from '../../services/language-service';
import './WordCard.css';

// TODO Implement Word Cards, to display the word and let the user enter a guess.

export default class WordCard extends Component {
  static defaultProps = { 
    match: { params: {} }
  };

  static contextType = userContext;

  componentDidMount() {
    // Retrieve word data?
  };

  renderWordCard() {
    // Create word card?
    // Returning test layout card.
    return (
      <>
        <h3>Escargo</h3>
        <hr />
        <form>
          <input type='textbox' />
          <input type='button' value='Guess' />
        </form>
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