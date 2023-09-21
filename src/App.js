import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactRouter from './ReactRouter';
import { ChakraProvider } from '@chakra-ui/react'
import Userrole from './Context/Userrole';

function App() {
  return (
    <Userrole>
      <ReactRouter />
    </Userrole>

  );
}

export default App;
