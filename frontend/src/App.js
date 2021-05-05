import React, { useState, useCallback } from 'react';
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';
import UserContext from './contexts/user-context';
import Etusivu from './components/Etusivu';
import Harrastajat from './components/Harrastajat';
import Ammattilaiset from './components/Ammattilaiset';
import Treenit from './components/Treenit';
import Kirjaudu from './components/Kirjaudu';

const App = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [pro, setPro] = useState('');
  const [showModal, setModal] = useState(false);

  const login = useCallback((token, fname, lname, username, pro) => {
    setLoggedIn(true);
    setToken(token);
    setUsername(username);
    setName(`${fname} ${lname}`);
    setPro(pro);
    setModal(false);
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    setToken(null);
  }, []);

  const handleLogin = () => {
    if (!isLoggedIn) {
      setModal(true);
    } else {
      logout();
    }
  };

  return (
    <UserContext.Provider value = {{isLoggedIn: !!token, token: token, pro: pro, username: username, name: name, login: login, logout: logout}}>
      <Router>
        <main>
          <nav>
            <ul>
              <li><NavLink exact to = '/'>Etusivu</NavLink></li>
              <li><NavLink to = '/harrastajien-tulokset'>Harrastajien tulokset</NavLink></li>
              {isLoggedIn && pro === 'true' ? <li><NavLink to = '/ammattilaisten-tulokset'>Ammattilaisten tulokset</NavLink></li> : null}
              {isLoggedIn ? <li><NavLink to = '/omat-treenit'>Omat treenit</NavLink></li> : null}
              {isLoggedIn ? <Redirect to = '/omat-treenit' /> : <Redirect to = '/' />}
              <li id = 'right'><button onClick = {handleLogin}>{!isLoggedIn ? 'Kirjaudu' : 'Kirjaudu ulos'}</button></li>
            </ul>
          </nav>
          <Route exact path = '/' component = {Etusivu} />
          <Route path = '/harrastajien-tulokset' component = {Harrastajat} />
          <Route path = '/ammattilaisten-tulokset' component = {Ammattilaiset} />
          <Route path = '/omat-treenit' render = {(props) => (<Treenit {...props}/>)} />
        </main>
      </Router>
      <Kirjaudu showModal = {showModal} setModal = {setModal} />
    </UserContext.Provider>
  );
}

export default App;
