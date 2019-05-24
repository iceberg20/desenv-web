{
      var lTarefas = new Array;
      var last;

      drawTable();

        //Enabling Cors
        this.CORSRequest = function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }

    //Ajax Request
    this.start = function(){
        var ajax = new XMLHttpRequest();

        ajax.open('GET', 'http://localhost:3000/tarefas', true);
        
        ajax.send();

        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200){
                var data = JSON.parse(ajax.responseText);
                lTarefas = data;
                drawTable();

            }
        };          
    }

    function salvarTarefaServer(last){
        var ajax = this.CORSRequest('POST', 'http://localhost:3000/tarefas');

        ajax.setRequestHeader("Content-Type", "application/json");

        ajax.send(JSON.stringify(last));
        console.log(last);

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var data = JSON.parse(ajax.responseText);
                console.log("salvou no server");
            }
        }
    } 

    start();

    function drawTable() {
        document.getElementById('tarefasTableBody').innerHTML = '';

        var t = [];

        for (i = 0; i < lTarefas.length; i++) {
            t.push('<tr>');

            if (!lTarefas[i].atualiza && !lTarefas[i].terminada) {
                t.push('<td><input type="checkbox" value="' + i + '" onclick="finalizarTarefa()"></td>');
                t.push('<td>' + lTarefas[i].descricao + '</td>');
                t.push('<td>' + lTarefas[i].atribuicao + '</td>');
                t.push('<td>' + formatDate(lTarefas[i].prazo) + '</td>');
            } else if (lTarefas[i].atualiza) {
                if (lTarefas[i].terminada) {
                    t.push('<td><input id="alteraTerminada" type="checkbox" value="' + i + '" onclick="" checked></td>');
                } else {
                    t.push('<td><input id="alteraTerminada" type="checkbox" value="' + i + '" onclick=""></td>');
                }
                t.push('<td><input id="alteraDescricao" type="text" value="' + lTarefas[i].descricao + '"></td>');
                t.push('<td><input id="alteraAtribuicao" type="text" value="' + lTarefas[i].atribuicao + '"></td>');
                t.push('<td><input id="alteraPrazo" type="date" value="' + lTarefas[i].prazo + '"></td>');
                t.push('<td><button value="' + i + '" onclick="modificarTarefa()">Salvar</button></td>');
                t.push('<td><button value="' + i + '" onclick="cancelarEditarTarefa()">Cancelar</button></td>');
                t.push('</tr>');
                continue;
            } else {
                t.push('<td><input type="checkbox" value="' + i + '" onclick="finalizarTarefa()" checked></td>');
                t.push('<td><strike>' + lTarefas[i].descricao + '</strike></td>');
                t.push('<td><strike>' + lTarefas[i].atribuicao + '</strike></td>');
                t.push('<td><strike>' + formatDate(lTarefas[i].prazo) + '</strike></td>');
            }

            t.push('<td><button value="' + i + '" onclick="selecionaEditarTarefa()">Editar</button></td>');
            t.push('<td><button value="' + i + '" onclick="deletarTarefa()">Deletar</button></td>');
            t.push('</tr>');
        }
        document.getElementById('tarefasTableBody').innerHTML = t.join('');
    }

    function adicionarTarefa() {
        var last = {
            descricao: document.getElementById('descricao').value,
            prazo: document.getElementById('prazo').value,
            atribuicao: document.getElementById('atribuicao').value,
            terminada: false,
            atualiza: false
        }; 

        lTarefas.push(last);

        document.getElementById('descricao').value = '';
        document.getElementById('prazo').value = '';
        document.getElementById('atribuicao').value = '';


        salvarTarefaServer(last);
        drawTable();
    }

    function deletarTarefa() {
        lTarefas.splice(parseInt(event.srcElement.value), 1);

        drawTable();
    }

    function finalizarTarefa() {
        lTarefas[parseInt(event.srcElement.value)].terminada = true;

        drawTable();
    }
    function cancelarEditarTarefa() {
        lTarefas[parseInt(event.srcElement.value)].atualiza = false;

        drawTable();
    }

    function selecionaEditarTarefa() {
        lTarefas[parseInt(event.srcElement.value)].atualiza = true;

        drawTable();
    }
    
    function formatDate(data) {
        console.log(data);
        var dataDividida = data.split("-");

        return dataDividida[2] + '/' + dataDividida[1] + '/' + dataDividida[0];
    }

    function modificarTarefa() {
        var tarefa = lTarefas[parseInt(event.srcElement.value)];

        tarefa.atribuicao = document.getElementById('alteraAtribuicao').value;
        tarefa.descricao = document.getElementById('alteraDescricao').value;
        tarefa.prazo = document.getElementById('alteraPrazo').value;

        if (document.getElementById('alteraTerminada').checked) {
            tarefa.terminada = true;
        } else {
            tarefa.terminada = false;
        }

        tarefa.atualiza = false;

        drawTable();
    }



}