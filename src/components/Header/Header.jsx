import './Header.css'
import logoCidalink from '../../assets/LogotipoCida.svg'
import AcessibilityMenu from '../AcessibilityMenu/AcessibilityMenu'

export default function Header(){
    return(
        <header>
             <img src={logoCidalink} alt="logo" className ="logo" />
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