import "./Header.scss"
import logo from "../../assets/Bosch_logo.svg"
import { NavLink } from "react-router-dom"

function Header() {



	return (
		<nav id="header"> 	
			<div className="content">
				<NavLink to="/"><img className="logo" src={logo}/></NavLink>
				<div id="links">
					<NavLink className="link" to="/posts">Posts</NavLink> 
					{/* <NavLink className="link" to="/register">Cadastro</NavLink>  */}
					<NavLink className="link" to="/login">Entrar</NavLink> 
				</div>
			</div>
		</nav>
	)
}

export default Header