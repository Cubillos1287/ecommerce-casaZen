import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  return (

    <div className="categoria-slogan"> 
        <div className="categorias">
            <Link to="/cocina" className="opcion-categoria">Cocina</Link>
            <Link to="/cuarto" className="opcion-categoria">Cuarto</Link>
            <Link to="/baño" className="opcion-categoria">Baño</Link>
            <Link to="/oficina" className="opcion-categoria">Oficina</Link>
            <Link to="/decoracion" className="opcion-categoria">Decoracion de hogar</Link>
        </div>

        <div className="header">
            <div className="slogan">
            <h1>Espacios simples, vida simple.</h1>
            </div>
        </div>
    </div>

  )
    
}
export default Header

