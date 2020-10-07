import React,  { Component } from 'react';
import './Word.css';

export default class Word extends Component {
  state = {
    word: {}
  };

  componentDidMount() {
    // Load word data from props into the Word class state.
    const {word} = this.props;
    this.setState({
      word
    });
  };

  render() {
    const {word} = this.props;
    // TODO Implement Correct and Incorrect in word data to display them on word cards.
    return (
      <section className='word-card window'>
        <p className='word'>{word.original}</p>
        <p>Correct</p>
        <p className='correct'>{word.correct}</p><p>/</p><p className='incorrect'>{word.incorrect}</p>
        <p>Incorrect</p>
      </section>
    );
  };
};