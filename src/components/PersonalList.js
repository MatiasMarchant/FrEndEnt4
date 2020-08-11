import React, {Component} from 'react';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class PersonalList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personales : []
        };
    }

    componentDidMount() {
        this.findAllPersonal();
    }
    
    findAllPersonal() {
        axios.get("https://tomcs.herokuapp.com/v1/personal/getAll")
            .then(response => response.data)
            .then((data) => {
                this.setState({personales: data})
            });
    }

    deletePersonal = (personalRut) => {
        axios.delete("https://tomcs.herokuapp.com/v1/personal/"+personalRut)
            .then(response => {
                if(response.data != null) {
                    alert("Paciente eliminado exitosamente");
                    this.setState({
                        personales: this.state.personales.filter(personal => personal.rut !== personalRut)
                    });
                }
            });
    };


    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> Personal List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                    <thead>
                        <tr>
                        <th>RUT</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Mail</th>
                        <th>Profesion</th>
                        <th>Especializacion</th>
                        <th>Tipo Personal</th>
                        <th>Disponibilidad</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.personales.length === 0 ? 
                            <tr align="center">
                                <td colSpan="8">No hay personal inscritos</td>
                            </tr> : //Else
                            this.state.personales.map((personal) => (
                            <tr key={personal.rut}>
                                <td>{personal.rut}</td>
                                <td>{personal.nombre}</td>
                                <td>{personal.apellido}</td>
                                <td>{personal.mail}</td>
                                <td>{personal.profesion}</td>
                                <td>{personal.especializacion}</td>
                                <td>{personal.tipoPersonal}</td>
                                <td>{(personal.disponibilidad ? "" : "No ")} Disponible</td>
                                <td>
                                    <ButtonGroup>
                                        <Link to={"edit/"+personal.rut} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                        <Button size="sm" variant="outline-danger" onClick={this.deletePersonal.bind(this, personal.rut)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>


                            ))
                        }
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}