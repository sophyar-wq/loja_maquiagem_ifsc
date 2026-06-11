const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loja_maquiagem"
});

conexao.connect((erro) => {
    if (erro) {
        console.log(erro);
    } else {
        console.log("Banco conectado!");
    }
});

app.post("/usuarios", (req, res) => {

    const { nome, email, senha } = req.body;

    const sql =
    "INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?)";

    conexao.query(sql,
    [nome,email,senha],
    (erro)=>{

        if(erro){
            return res.status(500).json({
                mensagem:"Erro ao salvar"
            });
        }

        res.json({
            mensagem:"Usuário cadastrado com sucesso"
        });

    });

});

app.post("/login", (req,res)=>{

    const { email, senha } = req.body;

    const sql =
    "SELECT * FROM usuarios WHERE email=? AND senha=?";

    conexao.query(sql,
    [email,senha],
    (erro,resultado)=>{

        if(erro){
            return res.status(500).json({
                sucesso:false
            });
        }

        if(resultado.length > 0){

            res.json({
                sucesso:true
            });

        }else{

            res.json({
                sucesso:false
            });

        }

    });

});

app.get("/", (req,res)=>{
    res.send("Servidor funcionando");
});

app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000");
});