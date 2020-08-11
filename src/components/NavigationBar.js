import React, { Component } from 'react';
import { Navbar, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    Gestor
                </Link>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-variants-Secondary">Pabellón</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to={"/pabellon/agregarPabellon"}>Add Pabellon</Link></Dropdown.Item>
                        <Dropdown.Item><Link to={"/pabellon/tabla"}>Pabellon List</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-variants-Secondary">Pacientes</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to={"/add"}>Add Paciente</Link></Dropdown.Item>
                        <Dropdown.Item><Link to={"/list"}>Paciente List</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-variants-Secondary">Personal</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to={"/personal/add"}>Agregar Personal</Link></Dropdown.Item>
                        <Dropdown.Item><Link to={"/personal/list"}>Personal List</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        );
    }

}