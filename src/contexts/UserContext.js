import React, { Component } from "react";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import IdleService from "../services/idle-service";
import LanguageService from "../services/language-service";

const UserContext = React.createContext({
  user: {},
  userLanguage: '',
  userScore: 0,
  userWords: [],
  currentWord: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = { user: {}, userLanguage: '', userScore: 0, userWords: [], currentWord: {}, error: null };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      };

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle);
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUser = (user) => {
    this.setState({ user });
  };

  processLogin = (authToken) => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    });
    IdleService.registerIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken();
    });
    this.processUserData();
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({});
  };

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({ idle: true });
  };

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken();
        });
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  setLanguage = (lang) => {
    const userData = {
      userLanguage: lang,
    }
    this.setState(userData)
  }

  setUserScore = (score) => {
    const userData = {
      userScore: score,
    }
    this.setState(userData)
  }

  setUserWords = (words) => {
    const userData = {
      userWords: words
    }
    this.setState(userData)
  }

  setCurrentWord = (word) => {
    const userData = {
      currentWord: word
    }
    this.setState(userData)
  }

  processUserData = () => {
    LanguageService.getLanguage()
      .then (res => {
        this.setLanguage(res.language.name);
        this.setUserScore(res.language.total_score);
      })
  };

  render() {
    const value = {
      user: this.state.user,
      userLanguage: this.state.userLanguage,
      userScore: this.state.userScore,
      userWords: this.state.userWords,
      currentWord: this.state.currentWord,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      setUserWords: this.setUserWords,
      setCurrentWord: this.setCurrentWord
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
