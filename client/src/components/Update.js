import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../App.css';
// import {Navbar, Nav} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate, useParams, Link} from 'react-router-dom';
import AuthorForm from '../components/AuthorForm';
import io from "socket.io-client";

const Update = props => {
  const {id} = useParams ();
  const [author, setAuthor] = useState ({});
  const [errors, setErrors] = useState ([]);
  const [loaded, setLoaded] = useState (false);
  const [socket] = useState (() => io (':8002'));

  const navigate = useNavigate ();

  const url = 'http://192.168.1.249:8002';

  useEffect (() => {
    axios
      .get (url + `/api/author/${id}`)
      .then (res => {
        setAuthor (res.data);
        setLoaded (true);
      })
      .catch (err => console.log (err));
  }, []);
  const updateAuthor = authorParam => {
    axios
      .put (url + `/api/author/${id}`, authorParam)
      .then (res => {
        console.log ('res',res.data);
        socket.emit("updated_author",res.data);
        
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
      <Row>
        <h1>Favorite Authors</h1>
        <Link to={`/`}>Home</Link>
        {loaded &&
          <AuthorForm
            errors={errors}
            setErrors={setErrors}
            actionType={'update'}
            onSubmitProp={updateAuthor}
            initialName={author.name}
          />}

      </Row>
    </Container>
  );
};
export default Update;
