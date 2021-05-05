import React, { useState, useEffect } from 'react';
import TulosTaulukko from './TulosTaulukko';
import Container from 'react-bootstrap/Container';
import ResultService from '../services/result-service';

const Harrastajat = () => {
    const [Results, setResults] = useState([]);

    useEffect(() => {
        ResultService.getAllAmateur().then((data) => setResults(data))
    }, []);

    return (
        <Container fluid className = 'p-5'>
            <h1>Harrastajien tulokset</h1>
            <TulosTaulukko Results = {Results} />
        </Container>
    );
};

export default Harrastajat;
