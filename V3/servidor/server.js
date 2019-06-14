//Config Express
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');

//App init
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors()); 

//Inicializando tarefas vazio
var tarefas = [];

var escreverArquivo = function(tarefas) {
	fs.writeFile('tarefas.txt', JSON.stringify(tarefas), function (err) {
  		if (err) throw err;
	}); 
};

//Ler aquivo Json
var readFile = function () {
	return JSON.parse(fs.readFileSync('tarefas.txt'));
};

//Adiciona Tarefa ao arquivo Json
var adicionarTarefa = function (req, res){
	let tarefa = {
		"situacao": req.body.situacao,
		"descricao": req.body.descricao,
		"atribuicao": req.body.atribuicao,
		"prazo": req.body.prazo
	};
	tarefas = readFile();
	tarefas.push(tarefa);
	escreverArquivo(tarefas);
	res.send(tarefas);
};

//Deletar Tarefa ao arquivo Json
var deletarTarefa = function (req, res){
	tarefas = readFile();
	tarefas.splice(parseInt(req.params.id),1);
	escreverArquivo(tarefas);
	res.send(tarefas);
};

var listarTarefas = function (req, res){
	tarefas = readFile();
	res.send(tarefas);
};

var editarTarefa = function (req, res){
	tarefas = readFile();
	let tarefa = tarefas[parseInt(req.body.id)];
	tarefas.splice(parseInt(req.body.id),1);

	tarefa.situacao = req.body.situacao;
	tarefa.descricao = req.body.descricao;
	tarefa.atribuicao = req.body.atribuicao;
	tarefa.prazo = req.body.prazo;

	tarefas.push(tarefa);
	escreverArquivo(tarefas);
	res.send(tarefas);
};

//Serviços da API

//Listar todas as tarefas
app.get('/tarefas', listarTarefas);
//Adicionar adicionar uma tarefa
app.post('/tarefas', adicionarTarefa);
//Deletar uma tarefa
app.delete('/tarefas/:id', deletarTarefa);
//Editar Tarefa
app.put('/tarefas', editarTarefa);

//Porta padrão da aplicação
app.listen(3000, function (){
	console.log('Alive listening on port 3000!');
});


