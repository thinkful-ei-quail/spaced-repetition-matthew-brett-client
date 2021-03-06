import React, { Component } from 'react';
import WordListPage from '../../components/WordListPage/WordListPage';
import UserContext from '../../contexts/UserContext';
import {Link} from 'react-router-dom'

import './DashboardRoute.css';

class DashboardRoute extends Component {
  static contextType = UserContext;

  state = { error: null };

  renderLanguage = () => {
    return this.context.userLanguage || 'French';
  }

  renderScore = () => {
    return this.context.userScore;
  }

  render() {
    return (
      <section className='dashboard'>
        <div className='userInfo light window'>
          <h2>{this.renderLanguage()}</h2>
          <section>
            <p>Total correct answers: {this.renderScore()}</p>
          </section>
          <section>
            <button><Link onClick={this.handleLogoutClick} to="/learn">Start Practicing</Link></button>
          </section>
        </div>
        <div className='words light window'>
          <section>
            <h3>Words to practice</h3>
            <WordListPage />
          </section>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
