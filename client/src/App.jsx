import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import CadastroUsuario from './components/CadastroUsuario'
import CadastroPersonagem from './components/CadastroPersonagem'
import ExibirPersonagem from './components/ExibirPersonagens'
import Login from './components/Login'
import UserProfile from './components/userProfile'

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/cadastroUsuario' element={<CadastroUsuario/>}></Route>
          <Route path='/cadastrarPersonagem' element={<CadastroPersonagem/>}></Route>
          <Route path='/exibir/personagens' element={<ExibirPersonagem/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/userProfile' element={<UserProfile/>}></Route>
      </Routes>
    </div>
  )
}

export default App
