import React, {Component} from 'react';

import {Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class PacienteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Pacientes : []
        };
    }

    componentDidMount() {
        this.findAllPacientes();
    }
    
    findAllPacientes() {
        axios.get("http://iswayudantia02072020.herokuapp.com/pacientes")
            .then(response => response.data)
            .then((data) => {
                this.setState({Pacientes: data})
            });
    }


    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> Paciente List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>ID Médico</th>
                        <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Pacientes.length === 0 ? 
                            <tr align="center">
                                <td colSpan="6">No hay pacientes inscritos</td>
                            </tr> : //Else
                            this.state.Pacientes.map((Paciente) => (
                            <tr key={Paciente.id}>
                                <td>{Paciente.id}</td>
                                <td>{Paciente.idmedico}</td>
                                <td>{Paciente.estado}</td>
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