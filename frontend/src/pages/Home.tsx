import { useUserContext } from "../contexts/UserContext"

function Home() {

    const { userInfo } = useUserContext()

    return (
        <div>
            <h3>Bem-vindo ao blog da Bosch!!!</h3>
            {userInfo ? <div> {userInfo.username} </div> : <div> Você não está logado!</div>}
        </div>
    )
}

export default Home