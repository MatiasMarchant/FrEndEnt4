import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

export default class Personal extends Component {

    constructor(props) {
        super(props);
        this.state = {
                        id:'', 
                        rut:'', 
                        nombre:'', 
                        apellido:'', 
                        numero:'', 
                        mail:'', 
                        profesion: '',
                        especializacion:'', 
                        tipoPersonal: 1,
                        disponibilidad: true
                    };
        this.personalChange = this.personalChange.bind(this);
        this.submitPersonal = this.submitPersonal.bind(this);
        this.findPersonalByRut = this.findPersonalByRut.bind(this);
    }


    componentDidMount() {
        const personalRut = this.props.match.params.id;
        if(personalRut) {
            this.setState({id: 1})
            this.findPersonalByRut(personalRut);
        }
    }

    findPersonalByRut = (personalRut) => {
        axios.get("https://tomcs.herokuapp.com/v1/personal/"+personalRut)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        rut: response.data.rut,
                        nombre: response.data.nombre,
                        apellido: response.data.apellido,
                        numero: response.data.numero,
                        mail: response.data.mail,
                        profesion: response.data.profesion,
                        especializacion: response.data.especializacion,
                        tipoPersonal: response.data.tipoPersonal,
                        disponibilidad: (response.data.disponibilidad ? 1 : 0)
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    resetPersonal = () => {
        this.setState(() => this.initialState);
    };

    submitPersonal = event => {
        event.preventDefault();

        const Personal = {
            rut: this.state.rut,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            numero: this.state.numero,
            mail: this.state.mail,
            profesion: this.state.profesion,
            especializacion: this.state.especializacion,
            tipoPersonal: this.state.tipoPersonal,
            disponibilidad: (this.state.disponibilidad === '1' ? true : false)
        }

        axios.post("https://tomcs.herokuapp.com/v1/personal/", Personal)
            .then(response => {
                if(response.data != null) {
                    this.setState({"method":"post"});
                    this.personalList();
                }
            });
        this.setState(this.initialState);

    };

    updatePersonal = event => {
        event.preventDefault();

        const Personal = {
            rut: this.state.rut,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            numero: this.state.numero,
            mail: this.state.mail,
            profesion: this.state.profesion,
            especializacion: this.state.especializacion,
            tipoPersonal: this.state.tipoPersonal,
            disponibilidad: (this.state.disponibilidad === '1' ? true : false)
        };

        axios.put("https://tomcs.herokuapp.com/v1/personal/", Personal)
            .then(response => {
                if(response.data != null) {
                    this.setState({"method":"put"});
                    this.personalList();
                }
            });
        this.setState(this.initialState);
        
    };

    personalChange = event => {

        this.setState({
            [event.target.name]:event.target.value
        });
    };

    personalList = () => {
        return this.props.history.push("/personal/list");
    };

    render() {
        const {rut, nombre, apellido, numero, mail, profesion, especializacion, tipoPersonal, disponibilidad} = this.state;
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Actualizar Personal" : "Ingresar Personal"}</Card.Header>
                    <Form onReset={this.resetPersonal} onSubmit={this.state.id ? this.updatePersonal : this.submitPersonal} id="PacienteFormId">
                        <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridIDMedico">
                                <Form.Label>RUT</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="rut" value={rut} onChange={this.personalChange} className={"bg-dark text-white"} placeholder="Ingrese RUT" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEstado">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="nombre" value={nombre} onChange={this.personalChange} className={"bg-dark text-white"} placeholder="Ingrese Nombre" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridIDMedico">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="apellido" value={apellido} onChange={this.personalChange} className={"bg-dark text-white"} placeholder="Ingrese Apellido" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEstado">
                                <Form.Label>Numero</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="numero" value={numero} onChange={this.personalChange} className={"bg-dark text-white"} placeholder="Ingrese Numero" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridIDMedico">
                                <Form.Label>Mail</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="mail" value={mail} onChange={this.personalChange} className={"bg-dark text-white"} placeholder="Ingrese Mail" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEstado">
                                <Form.Label>Especializacion</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="especializacion" value={especializacion} onChange={this.personalChange} className={"bg-dark text-white"} placeholder="Ingrese Especializacion" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridIDMedico">
                                <Form.Label>Tipo Personal</Form.Label>
                                <Form.Control required autoComplete="off" type="number" name="tipoPersonal" value={tipoPersonal} onChange={this.personalChange} className={"bg-dark text-white"} placeholder="Ingrese Tipo Personal" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEstado">
                                <Form.Label>Disponibilidad</Form.Label>
                                <Form.Control required autoComplete="off" type="number" name="disponibilidad" value={disponibilidad} onChange={this.personalChange} className={"bg-dark text-white"} placeholder="Ingrese Disponibilidad" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridIDMedico">
                                <Form.Label>Profesion</Form.Label>
                                <Form.Control required autoComplete="off" type="text" name="profesion" value={profesion} onChange={this.personalChange} className={"bg-dark text-white"} placeholder="Ingrese Profesion" />
                            </Form.Group>
                        </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Actualizar" : "Ingresar"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.personalList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Personal List
                            </Button>
                        </Card.Footer>
                    </Form>
            </Card>
        );
    }
}