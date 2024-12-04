import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/index.jsx';
import Nosotros from './pages/Nosotros/index.jsx';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/nosotros" element={<Nosotros />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

