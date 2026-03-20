
import { Route,Routes } from "react-router-dom";
import "./App.css"
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout.jsx'
import Navbar from './components/Navbar.jsx'

function App(){

  return (
    <div className="app">
      <Navbar/> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/checkout" element={<Checkout />}/>
      </Routes>
    </div>
  );
}

export default App;