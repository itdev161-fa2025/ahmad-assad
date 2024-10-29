import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GoodThings</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;