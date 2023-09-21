import "./Header.scss"
import logo from "../../assets/Bosch_logo.svg"
import { NavLink, useNavigate } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext"
import authService from "../../services/authService"

function Header() {

	const { userInfo } = useUserContext()

	const nav = useNavigate()

	const Logoff = () => {
		authService.logout()
		nav("/")
	}

	return (
		<nav id="header"> 	
			<div className="content">
				<NavLink to="/"><img className="logo" src={logo}/></NavLink>
				<div id="links">
					<NavLink className="link" to="/posts">Posts</NavLink> 
					{/* <NavLink className="link" to="/register">Cadastro</NavLink>  */}
					
					{ !userInfo ? 
						<NavLink className="link" to="/login">Entrar</NavLink> 
						: <a className="link">Sair</a> }
					
					
				</div>
			</div>
		</nav>
	)
}

export default Header