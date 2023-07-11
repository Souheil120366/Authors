import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../App.css';

const AuthorForm = props => {
  //keep track of what is being typed via useState hook
  const {errors, setErrors, actionType, onSubmitProp, initialName} = props;
  const [name, setName] = useState (initialName);

    const navigate = useNavigate ();
  //handler when the form is submitted
  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault ();
    onSubmitProp ({name});
  };

  return (
    <Container>
      <Row>
        {actionType == 'create'
          ? <h4 className="text-color">Add a new Author</h4>
          : <h4 className="text-color">Edit this Author</h4>}
      </Row>
      <Row>
        <Col sm={4} className="border p-2">
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">

            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={e => {
                setName (e.target.value);
                setErrors ([]);
              }}
            />

          </Form.Group>
          {errors.name
            ? <p className="text-danger">{errors.name.message}</p>
            : null}
          <div className="d-flex justify-content-evenly">
          <Button onClick={() => navigate ('/')}>Cancel</Button>
            {actionType == 'create'
              ? <Button type="submit">Create</Button>
              : <Button type="submit">Update</Button>}
          </div>
        </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default AuthorForm;
