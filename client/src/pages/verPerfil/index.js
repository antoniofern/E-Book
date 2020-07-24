import React, { useState, useEffect, useContext } from 'react';
import { Button, Row, Spinner, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import { UserContext } from '../../contexts/UserContext';

import api from '../../services/api';

import './styles.css';

function VerPerfil() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState('true');
  const [error, setError] = useState('false');
  const userContext = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get('/user/getMe', {
          headers: { authorization: `Bearer ${userContext.user}` },
        });

        console.log(data.data.doc);
        setUser(data.data.doc);
        setIsLoading(false);
        console.log(data.data.doc);
      } catch (apiError) {
        setIsLoading(false);
        setError(true);
        console.log(apiError);
      }
    }
    fetchData();
  }, []);

  return isLoading ? (
    <Row style={{ justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Spinner></Spinner>
    </Row>
  ) : error ? <p>Error</p> : (
    <div className="perfil">
      <section>
        <h3 className="text-center">User Information</h3>
        <Form className="edit-form">
          <FormGroup row>
            <Label sm={2}>Nome</Label>
            <Col sm={10}>
              <Input type="text" name="username" value={user.username}></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="email" name="email" value={user.email}></Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2}>Rua</Label>
            <Col sm={10}>
              <Input type="text" name="street" value={user.address[0].street}></Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2}>Numero</Label>
            <Col sm={10}>
              <Input type="text" name="number" value={user.address[0].number}></Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2}>Bairro</Label>
            <Col sm={10}>
              <Input type="text" name="neighborhood" value={user.address[0].neighborhood}></Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2}>Estado</Label>
            <Col sm={10}>
              <Input type="text" name="state" value={user.address[0].state}></Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2}>Pais</Label>
            <Col sm={10}>
              <Input type="text" name="country" value={user.address[0].country}></Input>
            </Col>
          </FormGroup>
        </Form>
        <div className="buttons">
          <Button>botão</Button>
          <Button>botão</Button>
        </div>
      </section>
    </div>
  );
}

export default VerPerfil;
