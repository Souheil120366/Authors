// import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import './App.css';
import {Container} from 'react-bootstrap';
import Update from './components/Update';
import AuthorList from './components/AuthorList';
import CreateAuthor from './components/CreateAuthor';

function App() {
  return (
    <Container>
    
      <BrowserRouter>
        <Routes>
          <Route element={<AuthorList />} path="/" default />
          <Route element={<CreateAuthor />} path="/new" />
          <Route element={<Update/>} path="/edit/:id"/>
        </Routes>
      </BrowserRouter>
      </Container>
    
  );
}

export default App;
