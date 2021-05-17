import React from 'react';

const UserContext = React.createContext({
    isLoggedIn: false,
    token: null,
    username: '',
    fname: '',
    lname: '',
    pro: '',
    setUsername: () => {},
    setName: () => {},
    login: () => {},
    logout: () => {}
});

export default UserContext;
