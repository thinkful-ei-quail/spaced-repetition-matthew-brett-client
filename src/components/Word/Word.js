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
    return (
      <li>
        <section className='word-card window'>
          <h4 className='word'>{word.original}</h4>
          <p className='correct'>Correct answer count: {word.correct_count}</p>
          <p className='incorrect'>Incorrect answer count: {word.incorrect_count}</p>
        </section>
      </li>
    );
  };
};