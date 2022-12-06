import { useEffect } from "react"
import Axios from 'axios'
import { useState } from "react"

export default function UserProfile(){

    let baseUrl = "http://localhost:3000"
    let [personagem, setPersonagens] = useState([])
    let [usuario,setUsuario] = useState([])
    let [status, setStatus] = useState('')

        useEffect(()=>{
            Axios.get(`${baseUrl}/getUser`)
            .then((response)=>{
                // if(status === 'active'){
                    setUsuario(response.data)
                // }
            })
        })

    return(
        <div>
            <div className="container">
                <div></div>
                <div>
                    {usuario.map((user)=>(
                        <ul>
                            <li>{user.Username}</li>
                            <li>{user.Nome}</li>
                            <li>{user.Email}</li>
                        </ul>
                    ))}
                </div>
                <div></div>
            </div>
        </div>
    )
}