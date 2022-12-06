import Axios from "axios"
import { useEffect, useState } from 'react'



export default function ExibirPersonagem() {

    const baseUrl = "http://localhost:3000"
    let [UserId, setUserId] = useState(0)
    let [condition, setCondition] = useState('')

    useEffect(() => {
        if (condition === 'active') {
            Axios.get(`${baseUrl}/getUserId`)
                .then((response) => {
                    setUserId(response.data)
                })
        }
    })



function clickCondition() {
    setCondition('active')
}



function exibir() {
    console.log(UserId)
    // getLocalStorage()
}

return (
    <div>
        <button onClick={clickCondition}>Get id</button>
        <button onClick={exibir}>exibir</button>
    </div>
)
}