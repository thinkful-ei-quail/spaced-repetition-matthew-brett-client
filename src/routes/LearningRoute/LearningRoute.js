import React, { Component } from 'react'
import WordCard from '../../components/WordCard/WordCard';
import './LearningRoute.css';

class LearningRoute extends Component {
  // TODO Implement and style Learning.
  render() {
    return (
      <section className='learn'>
        <h2>Learn!</h2>
        <div className='userScore light window'>
          <section>
            <p>Language: Frenchy</p>
          </section>
        </div>
        <div className='wordCard light window'>
          <section>
            <WordCard />
          </section>
        </div>
      </section>
    );
  }
}

export default LearningRoute
