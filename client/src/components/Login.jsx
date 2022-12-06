import { Link, Navigate } from "react-router-dom"
import Axios from "axios"
import { useState } from "react"
import '../public/style/Login.css'
import { useEffect } from "react"

export default function Login(){
    let [values, setValues] = useState()
    let [status, setStatus] = useState()
    const baseUrl = 'http://localhost:3000'


    const handleChangeValues = (value) =>{
        setValues((prevValues)=>({
            ...prevValues,
            [value.target.name]: value.target.value
        }))
    }

    const handleClickButton = ()=>{
        Axios.post(`${baseUrl}/login`, {
            Email: values.Email,
            Senha: values.Senha,
            ConfirmarSenha: values.ConfirmarSenha
        }).then((response)=>{
        })
    }

    // useEffect(()=>{
        
    // })

    
  
    return(

        <div>
            <div id="form">
                <input type="email" name="Email" onChange={handleChangeValues}/>
                <input type="password" name="Senha" onChange={handleChangeValues}/>
                <button onClick={handleClickButton}>Login</button>           
                {/* <Link to={local}><button onClick={handleClickButton}>Login</button></Link> */}
            </div>
        </div>
    )

}