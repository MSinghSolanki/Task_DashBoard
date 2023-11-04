
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import SignupForm from './components/singup/SignUp';
import { LoginForm } from './components/Login/Login';
import { Homepage } from './components/home/home';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
