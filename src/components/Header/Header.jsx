import './Header.css'
import logoCidalink from '../../assets/LogoCida.svg'
import AcessibilityMenu from '../AcessibilityMenu/AcessibilityMenu'
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header>
          
  <Link to="/">
  <img src={logoCidalink} alt="Logo CidaLink" className="logo" />
</Link>

             <div className="navDireita">
                <select id="idioma">
                    <option>Português</option>
                    <option>English</option>
                    <option>Español</option>
                </select>
                <AcessibilityMenu/>
             </div>
        </header>
    )
}