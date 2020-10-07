import React, { Component } from 'react';
import userContext from '../../contexts/UserContext';
import LanguageService from '../../services/language-service';
import Word from '../Word/Word';
import './WordListPage.css';

export default class WordListPage extends Component {
  static defaultProps = {
    match: { params: {} }
  };

  static contextType = userContext;

  componentDidMount() {
    // Retrieve word list.
    this.context.clearError();
    LanguageService.getLanguage()
      .then(res => {
        this.context.setUserWords(res.words);
      })
      .catch(this.context.setError);
  }

  renderWords() {
    // Create list of words cards
    const {userWords} = this.context;
    return userWords.map(word => 
      <Word 
        key={word.id}
        word={word}
      />
    );
  };

  render() {
    const {error} = this.context;
    return (
      <section className='word-list'>
        {error ? <p className='red'>There was an error, please try again.</p> : this.renderWords()}
      </section>
    )
  };
};