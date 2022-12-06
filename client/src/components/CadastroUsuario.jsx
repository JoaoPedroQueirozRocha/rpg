import Axios from 'axios';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import '../public/style/CadastrarUsuario.css'



export default function CadastroUsuario() {
    let [values, setValues] = useState([]);
    
    const baseUrl = "http://localhost:3000";

    const handleChangeValues = (value) =>{
        setValues((prevValues)=>({
            ...prevValues,
            [value.target.name]: value.target.value
        }))
    }

    const handleClickButton = () =>{
        Axios.get(`${baseUrl}/erros`,{  
        }).then((response)=>{
            if(response.data.length === 0){
                Axios.post(`${baseUrl}/cadastrar/usuario`,{
                        Nome: values.Nome,
                        Username: values.Username,
                        Senha: values.Senha,
                        Email: values.Email,
                        ConfirmarSenha: values.ConfirmarSenha
                    }).then((response)=>{
                        console.log(response)
                    })
            }else{
                response.data.forEach(element => {
                    alert(element.text)
                    
                });
            }
        })

        

    }


    return (
        <div>
            <div className='formUsuario'>
                <input type="text" placeholder="Nome" name="Nome" onChange={handleChangeValues} />
                <input type="text" placeholder="Username" name="Username" onChange={handleChangeValues} />
                <input type="email" placeholder="Email" name="Email" onChange={handleChangeValues} />
                <input type="password" placeholder="Senha" name="Senha" onChange={handleChangeValues} />
                <input type="password" placeholder="Confirmar senha" name="ConfirmarSenha" onChange={handleChangeValues} />
                <Link to="/CadastrarPersonagem"><button onClick={handleClickButton}>Cadastrar</button></Link>
            </div>
        </div>
    )
}