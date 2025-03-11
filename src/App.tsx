import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import RPNCalculator from './algo/rpn/index';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <h1>Algorithm Demonstrations</h1>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/rpn">RPN Calculator</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rpn" element={<RPNCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h2>Welcome to Algorithm Demonstrations</h2>
      <div className="algo-list">
        <Link to="/rpn" className="algo-card">
          <h3>Reverse Polish Notation Calculator</h3>
          <p>Calculate expressions using RPN notation</p>
        </Link>
      </div>
    </div>
  );
}

export default App;
