import Axios from "axios"
import {useEffect, useState } from "react"
import { Link } from "react-router-dom"
import '../public/style/CadastrarPersonagem.css'

export default function CadastroPersonagem(){
    const baseUrl = 'http://localhost:3000'
    const [values, setValues] = useState()
    
    const handleChangeValues = (value) =>{
        setValues((prevValues)=> ({
            ...prevValues,
            [value.target.name]: value.target.value
        }))
    }

    const handleClickButton = () =>{
        Axios.post(`${baseUrl}/cadastrar/personagem`,{
            NomePersonagem: values.NomePersonagem,
            ClassePrimaria: values.ClassePrimaria,
            ClasseSecundaria: values.ClasseSecundaria,
            Descricao: values.Descricao,
            Aparencia: values.Aparencia
        }).then((response)=>{
            console.log(response)
        })
    }



    return(
        <div>
            <div id="container">
            <input type="text" placeholder="Nome do personagem" name="NomePersonagem" onChange={handleChangeValues}/>
            <select name="ClassePrimaria" id="ClassePrimaria" onChange={handleChangeValues}>
                <option value="Lutador">Lutador</option>
                <option value="Bárbaro">Bárbaro</option>
                <option value="Paladino">Paladino</option>
                <option value="Ladino">Ladino</option>
                <option value="Monge">Monge</option>
                <option value="Clérigo">Clerigo</option>
                <option value="Wizard">Wizard</option>
                <option value="Sorcerer">Sorcerer</option>
                <option value="Warlock">Warlock</option>
                <option value="Bardo">Bardo</option>
            </select>
            <select name="ClasseSecundaria" id="ClasseSecundaria" onChange={handleChangeValues}>
                <option value="Lutador">Lutador</option>
                <option value="Bárbaro">Bárbaro</option>
                <option value="Paladino">Paladino</option>
                <option value="Ladino">Ladino</option>
                <option value="Monge">Monge</option>
                <option value="Clérigo">Clerigo</option>
                <option value="Wizard">Wizard</option>
                <option value="Sorcerer">Sorcerer</option>
                <option value="Warlock">Warlock</option>
                <option value="Bardo">Bardo</option>
            </select>
            <textarea name="Descricao" id="Descricao" cols="30" rows="10" placeholder="Descrição do personagem" onChange={handleChangeValues}></textarea>
            <textarea name="Aparencia" id="Aparencia" cols="30" rows="10" placeholder="Aparencia do personagem" onChange={handleChangeValues}></textarea>
            <Link to="/exibir/personagens"><button onClick={handleClickButton}>teste</button></Link>
            </div>
        </div>
    )
}