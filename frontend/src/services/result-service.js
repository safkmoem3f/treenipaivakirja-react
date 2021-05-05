import axios from 'axios';

const baseUrl = 'https://treenipaivakirja-backend.herokuapp.com/result';

const getAllPro = async () => {
    const config = {
        method: 'get',
        url: baseUrl + '/professionals'
    };
    try {
        let res = await axios(config);
        console.log('Promise fulfilled');
        return res.data;
    } catch(error) {
        return console.log(error);
    };
};

const getAllAmateur = async () => {
    const config = {
        method: 'get',
        url: baseUrl + '/amateurs'
    };
    try {
        let res = await axios(config);
        console.log('Promise fulfilled');
        return res.data;
    } catch (error) {
        return console.log(error);
    };
};

const getAllPersonal = async () => {
    const config = {
        method: 'get',
        url: baseUrl
    };
    try {
        let res = await axios(config);
        console.log('Promise fulfilled');
        return res.data;
    } catch (error) {
        return console.log(error);
    };
};

const getPerson = async (user) => {
    const config = {
        method: 'post',
        url: baseUrl,
        data: user
    };
    try {
        let res = await axios(config);
        console.log('Promise fulfilled');
        return res.data;
    } catch (error) {
        return error;
    };
};

const functions = {
    getAllPro: getAllPro,
    getAllAmateur: getAllAmateur,
    getAllPersonal: getAllPersonal,
    getPerson: getPerson
}

export default functions;
