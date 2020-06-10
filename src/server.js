const express = require("express")                          // Função vai fazer o pedido do express e ele vai voltar e ficar na variavel/const
const server = express()

// Pegar o banco de dados / Aplicação com acesso ao banco
    const db = require("./database/db")


// Configuração da pasta Pública
    server.use(express.static("public"))                    // Configuração do servidor


// Habilitar o usa da req.body na aplicação
    server.use(express.urlencoded({ extended:true }))

// Utilizando o template engine
    const nunjucks = require("nunjucks")
    nunjucks.configure("src/views", {
        express: server,
        noCache: true                                       // Salvando alguns dados na memória para devolver de forma mais rápida. Mas não iremos deixar habilitada
    })

// Configurando caminhos/rotas da minha aplicação
// Método HTTP - GET: Recupera informações do back-end
// req: Requisição = Pedido
// res: Resposta

// Rota da Página inicial 
    server.get("/", (req, res) => {                         // Primeiro argumento - /  ,  Segundo argumento - função que vai executar algo
        return res.render("index.html", { title: "Um título"})       // Abrir um arquivo , dirname é o diretório
    })


// Rota da página de Cadastro do ponto de coleta
    server.get("/create-point", (req, res) => {   
        //req.query: Query Strings da nossa url
        // console.log(req.query)       
        return res.render("create-point.html")      
    })

//
    server.post("/savepoint" , (req,res) => {
        // req.body: O corpo do nosso formulário
            // console.log(req.body)

        // Inserir dados no banco de dados
        const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
        `    
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
        function afterInsertData(err) {
            if(err){
                console.log(err)
               return res.send("Erro no cadastro!")
               // return res.send("create-point.html", { error: true })
            }
            console.log("Cadastrado com sucesso!")
            console.log(this)    
            
            return res.render("create-point.html", { saved: true })

        }
        db.run(query, values, afterInsertData)
        
    })


// Rota da página de Pesquisar pontos de coleta
server.get("/search", (req, res) => {    
    const search = req.query.search

    if(search == ""){
        // Pesquisa vazia
        return res.render("search-results.html" , { total: 0})      
    }

    // PEGAR OS DADOS DO BANCO DE DADOS
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'` , function(err, rows){
            if(err){
                return console.log(err)
            }
            // Contar quantos elementos tenho dentro do array
            const total = rows.length 

            console.log("Aqui estão seus registros")
            console.log(rows)
    
            // Mostrar a pag HTML com os dados do banco de dados, que está na propriedade PLACES
                return res.render("search-results.html" , { places: rows, total: total})      
        })    
})


// Rodar o servidor     npm start
server.listen(3000)                                         // Função para abrir a porta 3000