import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/style.css';
import FastPage from './components/FastPage';
import Navbar from './components/Navbar';
import Error404 from './components/Error404';

function App() {
  return (
    <div className="App">
      <h2>Fasting App</h2>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/fast" element={<FastPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
