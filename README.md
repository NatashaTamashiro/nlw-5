# NLW_#1
## [Rocketseat](https://rocketseat.com.br/) - Next Level Week - Starter

# Para rodar o projeto
* npm start
* entrar no [link](http://localhost:3000/) http://localhost:3000/

## Banco de dados
  * Dados não devem ficar na aplicação ( porque? )
    - Podemos PERDER/CORROMPER a aplicação/dados, então devemos armazenar no banco
    - SEGURANÇA - os acessos (por exemplo, uma senha) não pode ficar armazenada no html, no javascript , pois esses são acessos abertos 
    - RESPONSABILIDADES - organizar/persistir/guardar os dados e apresentar para os clientes

* SQL - Structured Query Language
  - Linguagem para fazer querys e/ou buscas estruturas/organizadas e armazena-las. Para: Criar dados, consultar, atualizar, deletar, ...
* Dados do SQL
  - Esses dados sao organizados no SQL como TABELAS/ENTIDADES/RELAÇÕES ( as 3 significam a mesma coisa )
  - Banco de dados RELACIONAL - porque faz relações
  - Compõe de colunas e linhas

* Tecnologia utilizada **SQLite**
  - Open source (código aberto)
  - Fácil de configurar
  - É um banco de dados que reside na própria aplicação
  - Excelente para iniciantes

## Iniciando o código
  * Instalar o sqlite
    - npm install sqlite3
    
* Criação completa do banco de dados
```
// Importar a dependencia do sqlite3
// Função quando esta dentro de um objeto, se da o nome de método!

    const sqlite3 = require("sqlite3").verbose()        
                                                       

// Criar o objeto que irá fazer operações no banco de dados
    const db = new sqlite3.Database("./src/database/database.db")


// Utilizar o objeto de banco de dados, para nossas operações - Rodar sequência de códigos
    db.serialize(() => {

----- OPERAÇÕES -----

        // 1 - Criar uma tabela com comandos sql
            db.run(`
                CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    image TEXT,
                    name TEXT,
                    address TEXT,
                    address2 TEXT,
                    state TEXT,
                    city TEXT,
                    items TEXT
                );
            `)
        // 2 - Inserir dados na tabela
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
            "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            "Papersider",
            "Guilherme Gemballa, Jardim América",
            "Nº 260",
            "Santa Catarina",
            "Rio do Sul",
            "Papéis e Papelão"
        ]
        function afterInsertData(err) {
            if(err){
                return console.log(err)
            }
            console.log("Cadastrado com sucesso!")
            console.log(this)                            
        }
        db.run(query, values, afterInsertData)         


	// 3- Consultar os dados da tabela                  
            db.all(`SELECT * FROM places` , function(err, rows){
                if(err){
                    return console.log(err)
                }
                console.log("Aqui estão seus registros")
                console.log(rows)
            })


        // 4 - Deletar um dado da tabela    // Para deletar TUDO = DELETE FROM places
            db.run(`DELETE FROM places WHERE id = ?` , [1], function(err){                
                if(err){
                    return console.log(err)
                }
                console.log("Registro deletado com sucesso!")
            })     
    })
```

* Comando para rodar o banco  
  - node src/database/db.js
  
* Explicando a criação de tabela
  - id = Identificador único de registros
  - INTEGER = Tipo numérico do sql
  - PRIMARY KEY = Campo principal que a tabela vai usar para identificar o registro
  - AUTOINCREMENT = Números que vão se incrementar - Inicia no id1, quando adicionar OUTRO registro, se torna id2, e assim por diante
  
* Explicando a inserção de dados na tabela
  - INSERT INTO places ( campos ) VALUES ( valores );* - Vamos INSERIR na tabela PLACES, valores
  
* Exportar o objeto parar ser usado em outro local
  - module.exports = db  
  
* Incluindo Pontos de coleta cadastrados de forma dinamica usando o **for**
```
FOR
{# ESTRUTURA DE REPETIÇÃO NUNJUCKS PARA DADOS DINÂMICOS #}
            {% for place in places %}
                <div class="card">
                    <img src="{{ place.image }}" alt="{{ place.name }}">
                    <h1>{{ place.name }}</h1>
                    <h3>{{ place.items }}</h3>
                    <p>
                        {{ place.city }},
                        {{ place.state }}<br>
                        {{ place.address }}<br>
                        {{ place.address2 }}
                    </p>
                </div>
            {% endfor %}
```

```
IF	
 Se não houvessem pontos de coleta cadastrados, o que seria apresentado?
	
	SE TOTAL FOR MAIOR QUE ZERO ( ou seja, existir algum ponto ), irá aparecer os cards dos pontos cadastrados
		{% if total > 0  %}

	Caso for zero ( total = 0 )
		mostrar mensagem
			{% else %}
            
           			 <h4><strong>Nenhum</strong> ponto de coleta encontrado</h4>
            
        	{% endif %}

```
![Exemplo de IF - arquivo não encontrado](https://user-images.githubusercontent.com/66738539/84305469-8072ab80-ab30-11ea-87b4-c69c6f290cc2.png)


