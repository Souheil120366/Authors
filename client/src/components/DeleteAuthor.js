import React, {useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import io from "socket.io-client";

const url = 'http://192.168.1.249:8002';

const DeleteAuthor = props => {
  const [socket] = useState (() => io (':8002'));  
  const {authorId, successCallback} = props;
  const deleteAuthor = e => {
    axios
      .delete (url + '/api/author/' + authorId)
      .then (res => {
        socket.emit("deleted_author",authorId);
        
        successCallback ();
      });
  };
  return (
    <Button variant="warning" onClick={deleteAuthor}>
      Delete
    </Button>
  );
};
export default DeleteAuthor;
