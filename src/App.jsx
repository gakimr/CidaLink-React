import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import LoginCidadao from "./pages/Login/LoginCidadao";
import LoginAdmin from "./pages/Login/LoginAdmin";
import CadastroCidadao from "./pages/Login/CadastroCidadao";
import CadastroAdmin from "./pages/Login/CadastroAdmin";
import AppLayout from "./layout/Applayout";
import Mapa from "./pages/App/Mapa/Mapa";
import Feed from "./pages/App/Feed/Feed";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        element={
          <div>
            <Header />
            <Outlet />
            <Footer />
          </div>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginCidadao />} />
        <Route path="/loginadm" element={<LoginAdmin />} />
        <Route path="/cadastro/cidadao" element={<CadastroCidadao />} />
        <Route path="/cadastro/administrador" element={<CadastroAdmin />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/app/mapa" element={<Mapa />} />
       <Route path="/app" element={<Feed />} />
      </Route>
    </Routes>
  );
}

export default App;