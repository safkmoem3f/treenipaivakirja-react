import React, { useContext, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import UserContext from '../contexts/user-context';
import ResultService from '../services/result-service';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Treenit = (props) => {
    const userContext = useContext(UserContext);

    const [Results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newResult, setNewResult] = useState({
        username: userContext.username,
        pvm: '',
        laji: '',
        krt: '',
        paino: ''
    });

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            ResultService.getPerson(userContext).then((data) => setResults(data))
        }
        return () => mounted = false;
    }, [userContext]);

    const addResult = () => {
        setShowModal(true);
    };
    
    return (
        <Container fluid className = 'p-5'>
            <div>
                <h1>Omat treenit: {userContext.name}</h1>
            </div>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Päivämäärä</th>
                            <th>Laji</th>
                            <th>Suorituskerrat</th>
                            <th>Paino (kg)</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Results.map((result) => <Taulukko result = {result} key = {result._id} setShowModal = {setShowModal} />)}
                    </tbody>
                </Table>
                <Button onClick = {addResult}>Lisää tulos</Button>
                <ResultModal showModal = {showModal} setShowModal = {setShowModal} newResult = {newResult} setNewResult = {setNewResult} />
            </div>
        </Container>
    );
};

const Taulukko = (props) => {
    return (
        <tr>
            <td>{props.result.pvm}</td>
            <td>{props.result.laji}</td>
            <td>{props.result.krt}</td>
            <td>{props.result.paino}</td>
            <td><Button onClick = {() => props.setShowModal(true)}>Muokkaa</Button><Button>Poista</Button></td>
        </tr>
    );
};

const ResultModal = (props) => {

    const handleChange = (e) => {
        e.preventDefault();
        props.setNewResult({
            ...props.newResult,
            [e.target.name]: e.target.value
        });
    };

    return(
        <Modal show = {props.showModal} onHide = {() => props.setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Lisää uusi tulos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Päivämäärä</Form.Label>
                        <Form.Control type = 'date' name = 'pvm' value = {props.newResult.pvm} onChange = {(e) => handleChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Laji</Form.Label>
                        <Form.Control type = 'text' name = 'laji' value = {props.newResult.laji} onChange = {(e) => handleChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Suorituskerrat</Form.Label>
                        <Form.Control type = 'number' name = 'krt' value = {props.newResult.krt} onChange = {(e) => handleChange(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Paino (kg)</Form.Label>
                        <Form.Control type = 'number' name = 'lkm' value = {props.newResult.lkm} onChange = {(e) => handleChange(e)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button>Ok</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default Treenit;
