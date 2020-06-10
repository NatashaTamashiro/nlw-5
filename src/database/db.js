// Importar a dependencia do sqlite3
// Função quando esta dentro de um objeto, se da o nome de método!

    const sqlite3 = require("sqlite3").verbose()        // Função/método que vai configurar o sqlite3, 
                                                        // dizendo que quero ver mensagens/infos no terminal sempre que acontecer algo

// Criar o objeto que irá fazer operações no banco de dados
    const db = new sqlite3.Database("./src/database/database.db")

    module.exports = db                                 // Para exportar o objeto DB

// Utilizar o objeto de banco de dados, para nossas operações - Rodar sequência de códigos
    // db.serialize(() => {
    //     // Criar uma tabela com comandos sql
    //         db.run(`
    //             CREATE TABLE IF NOT EXISTS places (
    //                 id INTEGER PRIMARY KEY AUTOINCREMENT,
    //                 image TEXT,
    //                 name TEXT,
    //                 address TEXT,
    //                 address2 TEXT,
    //                 state TEXT,
    //                 city TEXT,
    //                 items TEXT
    //             );
    //         `)
    //     // Inserir dados na tabela
    //     const query = `
    //         INSERT INTO places (
    //             image,
    //             name,
    //             address,
    //             address2,
    //             state,
    //             city,
    //             items
    //         ) VALUES (?,?,?,?,?,?,?);
    //     `    
    //     const values = [
    //         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    //         "Papersider",
    //         "Guilherme Gemballa, Jardim América",
    //         "Nº 260",
    //         "Santa Catarina",
    //         "Rio do Sul",
    //         "Papéis e Papelão"
    //     ]
    //     function afterInsertData(err) {
    //         if(err){
    //             return console.log(err)
    //         }
    //         console.log("Cadastrado com sucesso!")
    //         console.log(this)                            // Referenciando a resposta ao que o run está trazendo
    //     }
    //     db.run(query, values, afterInsertData)         // db.run é o quem insere no banco de dados
        

    //     // Consultar os dados da tabela                  // Para consultar apenas o nome, por exemplo = SELECT name FROM places
    //         db.all(`SELECT * FROM places` , function(err, rows){
    //             if(err){
    //                 return console.log(err)
    //             }
    //             console.log("Aqui estão seus registros")
    //             console.log(rows)
    //         })


    //     // Deletar um dado da tabela    // Para deletar TUDO = DELETE FROM places
            // db.run(`DELETE FROM places WHERE id = ?` , [5], function(err){                  // Deletar apenas o registro 1 ( o primeiro id que criamos )
            //     if(err){
            //         return console.log(err)
            //     }
            //     console.log("Registro deletado com sucesso!")
            // })     
    // })
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    // ESPLICANDO A CRIAÇÃO DE TABELA
        // id = Identificador único de registros
        // INTEGER = Tipo numérico do sql
        // PRIMARY KEY = Campo principal que a tabela vai usar para identificar o registro
        // AUTOINCREMENT = Números que vão se incrementar - Inicia no id1, quando adicionar OUTRO registro, se torna ad2, e assim por diante

    // ESPLICANDO A INSERÇÃO DE DADOS NA TABELA
        // *INSERT INTO places ( campos ) VALUES ( valores );* - Vamos INSERIR na tabela PLACES, valores