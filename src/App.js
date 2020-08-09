import React from 'react';
import './App.css';

import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar'
import Welcome from './components/Welcome'
import Paciente from './components/Paciente';
import PacienteList from './components/PacienteList';
import Pabellon from './components/Pabellon';
import Tables from './components/Tables';

function App() {
  const marginTop = {
    marginTop: "20px"
  };

  return (
    <Router>
      <NavigationBar></NavigationBar>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/add" exact component={Paciente} />
              <Route path="/edit/:id" exact component={Paciente} />
              <Route path="/list" exact component={PacienteList} />
              <Route path="/pab" exact component={Pabellon} />
              <Route path="/tab" exact component={Tables} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
