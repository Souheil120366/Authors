import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import DeleteAuthor from './DeleteAuthor';
import '../App.css';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

const url = 'http://192.168.1.249:8002';
const AuthorList = props => {
  const [socket] = useState (() => io (':8002'));
  const [authorList, setAuthorList] = useState ([]);
  //   const {authorList, setAuthorList} = props;
  const navigate = useNavigate ();
  const removeFromDom = authorId => {
      setAuthorList (authorList.filter (author => author._id !== authorId));
  };

  useEffect (() => {
   console.log ("inside useEffect for sockets");
   console.log (socket);
   console.log (authorList);

   socket.on("connection", () =>{
    console.log (socket.id);
   });

   socket.on("added_author", data => {
     console.log ("new author added",data);
     
     setAuthorList((previousValue)=>[data,...previousValue]);
   });

   socket.on("author_updated", data => {
    console.log ("author updated",data);
    setAuthorList(previousAuthorList => {
        const updatedList = previousAuthorList.map(obj => {
          if (obj._id === data._id) {
            return data;
          }
          return obj;
        });
        return updatedList;
      });

      socket.on("author_deleted", data => {
        console.log ("author deleted",data);
        setAuthorList(previousAuthorList => previousAuthorList.filter(({ _id }) => _id !== data));
        
      });
      return () => {
        socket.off ('added_author');
        socket.off ('author_updated');
        socket.off ('author_deleted');
      };

  });

   return () => socket.disconnect();

  }, []);

  useEffect (() => {
    axios
      .get (url + '/api/author')
      .then (res => {
        setAuthorList (res.data);
      })
      .catch (err => console.log (err));
  }, []);

  return (
    <Container>
      <Row>
        <h1>Favorite Authors</h1>
        <Link to={`/new`}>Add an Author</Link>
        <h4 className="text-color">We have quotes by:</h4>
        <Table striped bordered hover size="sm" variant="light">
          <thead>
            <tr>
              <th>Author</th>
              <th>Actions available</th>

            </tr>
          </thead>
          <tbody>
            {authorList.map ((author, index) => {
              return (
                <tr key={index}>
                  <td>
                    <p className="text-color">{author.name}</p>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <Button
                        variant="primary"
                        onClick={() => navigate ('/edit/' + author._id)}
                      >
                        Edit
                      </Button>

                      <DeleteAuthor
                          authorId={author._id}
                          successCallback={() => removeFromDom (author._id)}
                        />
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
export default AuthorList;
