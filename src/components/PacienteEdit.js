import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

export default class Paciente extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.PacienteChange = this.PacienteChange.bind(this);
        this.submitPaciente = this.submitPaciente.bind(this);
    }

    initialState = {
        id:'', idmedico:'', estado:''
    };

    componentDidMount() {
        const pacienteId = +this.props.match.params.id;
        if(pacienteId) {
            this.findPacienteById(pacienteId);
        }
    };

    findPacienteById = (pacienteId) => {
        axios.get("http://iswayudantia02072020.herokuapp.com/pacientes/"+pacienteId)
                .then(response => {
                    if(response.data != null) {
                        this.setState({
                            id: response.data.id,
                            idmedico: response.data.idmedico,
                            estado: response.data.estado
                        });
                    }
                }).catch((error) => {
                    console.error("Error - "+error)
                });
    };

    resetPaciente = () => {
        this.setState(() => this.initialState);
    };

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
    };

    updatePaciente = event => {
        event.preventDefault();

        const Paciente = {
            id: this.state.id,
            idmedico: this.state.idmedico,
            estado: this.state.estado
        };

        axios.put("http://iswayudantia02072020.herokuapp.com/pacientes", Paciente)
            .then(response => {
                if(response.data != null) {
                    this.setState(this.initialState);
                    alert("Paciente actualizado correctamente");
                    setTimeout(() => this.PacienteList(), 3000);
                }
            });
    };

    PacienteChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    PacienteList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {idmedico, estado} = this.state;
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> {this.state.id ? "Actualizar Paciente" : "Ingresar Paciente"}</Card.Header>
                
                    <Form onReset={this.resetPaciente} onSubmit={this.updatePaciente} id="PacienteFormId">
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
                                <FontAwesomeIcon icon={faEdit}/> {this.state.id ? "Actualizar" : "Ingresar"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.PacienteList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Paciente List
                            </Button>
                        </Card.Footer>
                    </Form>
            </Card>
        );
    }
}