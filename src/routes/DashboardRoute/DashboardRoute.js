import React, { Component } from 'react';

import './DashboardRoute.css';

class DashboardRoute extends Component {
  // TODO Implement and style Dashboard. Displays users progress.
  /*
      - Shows users language.
      - Shows words to learn in the language.
      - Shows count for correct and incorrect for each word.
      - Shows button/link to start learning.
      - Shows total score for guessing words correctly.
  */

  render() {
    return (
      <section className='dashboard'>
        <h2>La Dashboard</h2>
        <div className='userInfo light window'>
          <section>
            <p>My language: French</p>
          </section>
          <section>
            <p>My Score: 69</p>
          </section>
          <section>
            <p>Start Practicing: <input type='button' value='Begin' /></p>
          </section>
        </div>
        <div className='words light window'>
          <section>
            <p>words to learn, and correct/wrong ratio.</p>
            <p>Ex: "Escargo 5/3"</p>
          </section>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
