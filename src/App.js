import logo from './assets/logo.svg';
import './App.css';
import axios from 'axios';

const url = 'http://localhost:3001'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React awdawd
        </a>
      </header>
    </div>
  );
}

export default App;
