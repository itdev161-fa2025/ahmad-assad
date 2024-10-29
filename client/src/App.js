import { Route, Routes, Link } from 'react-router-dom';
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
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/register" element={<div>Register Page</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;