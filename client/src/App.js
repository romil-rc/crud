import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddNote from './components/AddNote';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route exact path='/addnote' element={ <AddNote /> } />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
