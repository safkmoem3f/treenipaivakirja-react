import React, { useState, useContext } from 'react';
import UserService from '../services/user-service';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import UserContext from '../contexts/user-context';


const Kirjaudu = (props) => {

    const userContext = useContext(UserContext);
    const [loginState, setLoginState] = useState(true);

    const [user, setUser] = useState({
        fname: '',
        lname: '',
        email: '',
        username: '',
        password: '',
        pro: false
    });

    const handleLoginState = () => {
        if (loginState) {
            setLoginState(false);
        } else if (!loginState) {
            setLoginState(true);
        };
    };


    const handleInput = (e) => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loginState) {
            try {
                UserService.login(user, userContext.login);
            } catch (error) {
                return console.log(error);
            };
            setUser({
                fname: '',
                lname: '',
                email: '',
                username: '',
                password: '',
                pro: false
            });
        } else {
            console.log(user);
            try {
                UserService.signup(user);
                setLoginState(true);
            } catch (error) {
                return console.log(error);
            };
        };
    };

    const handleModalHide = () => {
        props.setModal(false);
        setLoginState(true);
    };

    return (
        <Modal show = {props.showModal} onHide = {handleModalHide}>
            <ModalHeader closeButton>
                <ModalTitle>{loginState ? 'Kirjaudu' : 'Rekisteröidy'}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {loginState ? <LoginForm handleInput = {handleInput} user = {user} /> : <RegisterForm handleInput = {handleInput} user = {user} />}
            </ModalBody>
            <ModalFooter>
                <Button variant = 'link' onClick = {handleLoginState}>{loginState ? 'Rekisteröidy' : 'Kirjaudu'}</Button>
                <Button onClick = {(e) => handleSubmit(e)}>{loginState ? 'Kirjaudu sisään' : 'Rekisteröi uusi käyttäjä'}</Button>
            </ModalFooter>
        </Modal>
    );
};

const LoginForm = (props) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Käyttäjätunnus</Form.Label>
                <Form.Control type = 'text' name = 'username' required value = {props.user.username} onChange = {(e) => props.handleInput(e)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <Form.Control type = 'password' name = 'password' required value = {props.user.password} onChange = {(e) => props.handleInput(e)} />
            </Form.Group>
        </Form>
    );
};

const RegisterForm = (props) => {
    return (
        <Form>  
            <Form.Group>
                <Form.Row>
                    <Col>
                        <Form.Label>Etunimi</Form.Label>
                        <Form.Control type = 'text' name = 'fname' required value = {props.user.fname} onChange = {(e) => props.handleInput(e)} />
                    </Col>
                    <Col>
                        <Form.Label>Sukunimi</Form.Label>
                        <Form.Control type = 'text' name = 'lname' required value = {props.user.lname} onChange = {(e) => props.handleInput(e)} />
                    </Col>
                </Form.Row>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sähköposti</Form.Label>
                <Form.Control type = 'email' name = 'email' required value = {props.user.email} onChange = {(e) => props.handleInput(e)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Käyttäjätunnus</Form.Label>
                <Form.Control type = 'text' name = 'username' required value = {props.user.username} onChange = {(e) => props.handleInput(e)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <Form.Control type = 'password' name = 'password' required value = {props.user.password} onChange = {(e) => props.handleInput(e)} />
            </Form.Group>
            <Form.Group>
                <Form.Check type = 'checkbox' label = 'Ammattilainen' name = 'pro' value = {true} onChange = {(e) => props.handleInput(e)} />
            </Form.Group>
        </Form>
    );
};

export default Kirjaudu;
