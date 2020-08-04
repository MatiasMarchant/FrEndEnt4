import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar'
import Welcome from './components/Welcome'
import Paciente from './components/Paciente';
import PacienteList from './components/PacienteList';

function App() {
  const marginTop = {
    marginTop:"20px"
  };

  return (
    <Router>
      <NavigationBar></NavigationBar>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>
              <Route path="/" exact component={Welcome}/>
              <Route path="/add" exact component={Paciente}/>
              <Route path="/list" exact component={PacienteList}/>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
