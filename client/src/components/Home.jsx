import {Link} from 'react-router-dom'

export default function Home(){

    return(
        <div>
            <Link to="/cadastroUsuario"><button>Cadastrar</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </div>
    )
}