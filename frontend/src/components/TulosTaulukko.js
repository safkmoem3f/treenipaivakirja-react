import React from 'react';
import Table from 'react-bootstrap/Table';

const TulosTaulukko = (props) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Päivämäärä</th>
                    <th>Suoritukset yhteensä</th>
                    <th>Suorittajalukumäärä</th>
                </tr>
            </thead>
            <tbody>
                {props.Results.map((result) => <TaulukkoRivi result = {result} key = {result._id} />)}
            </tbody>
        </Table>
    );
};

const TaulukkoRivi = (props) => {
    return (
        <tr>
            <td>{props.result.pvm}</td>
            <td>{props.result.yht}</td>
            <td>{props.result.lkm}</td>
        </tr>
    );
};

export default TulosTaulukko;
