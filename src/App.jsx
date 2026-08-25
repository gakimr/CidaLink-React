import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Prefooter from "./components/PreFooter/Prefooter";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import LoginCidadao from "./pages/Login/LoginCidadao";
import LoginAdmin from "./pages/Login/LoginAdmin";
import CadastroCidadao from "./pages/Login/CadastroCidadao";
import CadastroAdmin from "./pages/Login/CadastroAdmin";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginCidadao />} />
        <Route path="/loginadm" element={<LoginAdmin />} />
        <Route path="/cadastro/cidadao" element={<CadastroCidadao />} />
        <Route path="/cadastro/administrador" element={<CadastroAdmin />} />
      </Routes>
      <Prefooter />
      <Footer />
    </div>
  );
}

export default App;
