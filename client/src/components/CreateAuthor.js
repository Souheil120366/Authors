import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Navbar, Nav} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate, Link} from 'react-router-dom';
import AuthorForm from '../components/AuthorForm';
import io from "socket.io-client";

const url = 'http://192.168.1.249:8002';

const CreateAuthor = props => {
  const [authorList, setAuthorList] = useState ([]);
  const [errors, setErrors] = useState ([]);
  const [socket] = useState (() => io (':8002'));
  const navigate = useNavigate ();

  useEffect (() => {
    axios
      .get (url + '/api/author')
      .then (res => {
        setAuthorList (res.data);
      })
      .catch (err => console.log (err));
  }, []);

  const createAuthor = authorParam => {
    axios
      .post (url + '/api/author', authorParam)
      .then (res => {
        setAuthorList ([...authorList, res.data]);
        socket.emit("new_author_added",res.data);
        
        navigate ('/');
      })
      
      .catch (err => {
        if (err.response.status === 401) navigate ('/');
        else {
          setErrors (err.response.data.errors);
        }
      });
  };

  return (
    <Container className="mt-2">
      <h1>Favorite Authors</h1>
      <Link to={`/`}>Home</Link>
      <Row className="mt-3">
        <Col>

          <AuthorForm
            errors={errors}
            setErrors={setErrors}
            actionType={'create'}
            onSubmitProp={createAuthor}
            initialName=""
          />

        </Col>

      </Row>
    </Container>
  );
};
export default CreateAuthor;
