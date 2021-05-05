import axios from 'axios';

const baseUrl = 'http://localhost:5000/user';

const getAll = async () => {
    const config = {
        method: 'get',
        url: baseUrl
    };
    try {
        let res = await axios(config);
        return res.data;
    } catch(error) {
        return console.log(error);
    };
};

const login = async (user, login) => {
    const config = {
        method: 'post',
        url: baseUrl + '/login',
        data: user
    };
    try {
        let res = await axios(config);
        login(res.data.token, res.data.fname, res.data.lname, res.data.username, res.data.pro);
        return res.data;
    } catch (error) {
        console.log('Could not login!')
        return error;
    };
};

const signup = async (user) => {
    const config = {
        method: 'post',
        url: baseUrl + '/register',
        data: user
    };
    try {
        let res = await axios(config);
        return res.data;
    } catch (error) {
        console.log('Could not signup!');
        return error;
    };
};

const functions = {
    getAll: getAll,
    login: login,
    signup: signup
}

export default functions;