const express = require('express');
const cors = require('cors');
const port = 3000;
const server = express();
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
// const sessions = require('express-session');
// const { application, request } = require('express');
const session = require('express-session');
const { Cookie } = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
let {LocalStorage} = require('node-localstorage');


server.use(cookieParser());
server.use(express.json())
server.use(cors())

if (!session.user) {
    server.use(session({
        secret: "Algo",
        saveUninitialized: true,
        cookie: { maxAge: oneDay, secure: true },
        resave: false,
        // rolling: true
    }))
}

global. localStorage = new LocalStorage('./localStorage')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "CadastrarRPG"
});



let erros = [];
let idUsuario = [];

server.post('/cadastrar/usuario', async (req, res) => {
    erros = []
    if (!req.body.Nome || req.body.Nome === undefined || req.body.Nome === null) {
        erros.push({ text: 'Nome inválido' })
    }
    if (!req.body.Username || req.body.Username === undefined || req.body.Username === null) {
        erros.push({ text: 'Username inválido' })
    }
    if (!req.body.Email || req.body.Email === undefined || req.body.Email === null) {
        erros.push({ text: 'Email inválido' })
    }
    if (!req.body.Senha || req.body.Senha === undefined || req.body.Senha === null) {
        erros.push({ text: 'Senha inválida' })
    }
    if (req.body.Senha != req.body.ConfirmarSenha) {
        erros.push({ text: 'Senhas diferentes' })
    }
    console.log(erros.length)
    if (erros.length === 0) {
        let getNome = `SELECT * FROM Usuarios WHERE Nome = '${req.body.Nome}'`
        let getUsername = `SELECT * FROM Usuarios WHERE Username = '${req.body.Username}'`
        let getEmail = `SELECT * FROM Usuarios WHERE Email = '${req.body.Email}'`

        db.query(getNome, async function (err, result) {
            if (err) throw err;
            console.log(result)
            if (result.length > 0) {
                erros.push({ text: 'Usuario já cadastrado' })
            }
            else {
                db.query(getUsername, async function (err, resultado) {
                    if (resultado.length > 0) {
                        erros.push({ text: 'Username em uso' })
                    } else {
                        db.query(getEmail, async function (err, resultadoEmail) {
                            if (resultadoEmail.length > 0) {
                                erros.push({ text: 'Email já cadastrado' })
                            }
                            else {
                                const { Nome } = req.body;
                                const { Username } = req.body;
                                const { Senha } = req.body;
                                const { Email } = req.body;
                                let insertUsuario = 'INSERT INTO Usuarios(Nome, Username, Senha,Email) VALUES (?,?,?,?)';
                                db.query(insertUsuario, [Nome, Username, Senha, Email], (err, result) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log(result)
                                        Cookie.Email = Email
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

server.get('/getUserId', (req,res)=>{
    let getUserId = Cookie.UserId
    res.send(getUserId)
})

server.get('/verify', (req,res)=>{
    let verificacao = Cookie.UserId
    if(verificacao){
        res.send('true')
    }
})


server.post('/cadastrar/personagem', (req, res) => {
    erros = []
    if(!req.body.NomePersonagem || req.body.NomePersonagem === undefined || req.body.NomePersonagem === null){
        erros.push({text: 'Nome do personagem inválido'})
    }
    if(!req.body.ClassePrimaria || req.body.ClassePrimaria === undefined || req.body.ClassePrimaria === null){
        erros.push({text:'Classe do personagem inválida'})
    }

    if (erros.length === 0) {
        let idUsuario = `SELECT Id FROM Usuarios WHERE Email ='${Cookie.Email}'`
        // Cookie.IdUser = idUsuario
        const {NomePersonagem} = req.body;
        const {Descricao} = req.body;
        const {Aparencia} = req.body;
        const {ClassePrimaria} = req.body;
        const {ClasseSecundaria} = req.body;
        const Criador = parseInt(idUsuario)
        let insertPersonagem = 'INSERT INTO Personagens(NomePersonagem, Descricao, Aparencia,  ClassePrimaria, ClasseSecundaria, Criador) VALUES (?,?,?,?,?,?)';
        db.query(insertPersonagem, [NomePersonagem, Descricao, Aparencia, ClassePrimaria, ClasseSecundaria, Criador], (err, result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
        })
    }
})

server.post('/login', (req, res, next) => {
    erros = []
    const { Email } = req.body
    const { Senha } = req.body
    let user = `SELECT * FROM Usuarios WHERE Email= '${Email}'`;
    console.log(Email
        )
    db.query(user, async function (err, result) {
        if (result.length > 0) {
            let senha = (Senha, result[0].Senha);
            if (Senha === senha) {
                console.log('teste')
                let Id = 0
                let id = (Id, result[0].Id)
                let email = (Email, result[0].Email)
                Cookie.Email = email
                Cookie.UserId = id
                console.log(Cookie)
            }
            else {
                erros.push({ text: "senha incorreta" })
            }
        }else{
            erros.push({text: 'email incorreto'})
        }
    })
})


server.get('/personagens', (req, res) => {
    erros = []
    let getPersonagem = `SELECT FROM Personagens WHERE Id = ${parseInt(Cookie.UserId)} `;
    db.query(getPersonagem, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

server.get('/getUser', (req,res)=>{
    erros = []
    let getUsers = `SELECT * FROM Usuarios WHERE Id = ${Cookie.UserId}`;
    db.query(getUsers, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

server.get('/erros', (req, res) => {
    res.send(erros)
})


server.listen(port, () => console.log(`http://localhost:${port}`))