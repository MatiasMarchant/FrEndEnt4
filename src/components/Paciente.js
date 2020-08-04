import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

export default class Paciente extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.PacienteChange = this.PacienteChange.bind(this);
        this.submitPaciente = this.submitPaciente.bind(this);
    }

    initialState = {
        idmedico:'', estado:''
    }

    resetPaciente = () => {
        this.setState(() => this.initialState);
    }

    submitPaciente = event => {
        event.preventDefault();

        const Paciente = {
            idmedico: this.state.idmedico,
            estado: this.state.estado
        };

        axios.post("http://iswayudantia02072020.herokuapp.com/pacientes", Paciente)
            .then(response => {
                if(response.data != null) {
                    this.setState(this.initialState);
                    alert("Paciente ingresado correctamente");
                }
            });
    }

    PacienteChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        const {idmedico, estado} = this.state;
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Add Paciente</Card.Header>
                
                    <Form onReset={this.resetPaciente} onSubmit={this.submitPaciente} id="PacienteFormId">
                        <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridIDMedico">
                                <Form.Label>ID Médico</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="idmedico" value={idmedico} onChange={this.PacienteChange} className={"bg-dark text-white"} placeholder="Ingrese ID Médico" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEstado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="estado" value={estado} onChange={this.PacienteChange} className={"bg-dark text-white"} placeholder="Ingrese Estado" />
                            </Form.Group>
                        </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Submit
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
            </Card>
        );
    }
}