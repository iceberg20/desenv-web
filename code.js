{

	
            var listaTarefas = [];            

            function drawTable() {
                document.getElementById('todoTableBody').innerHTML = '';

                var tabela = [];

                for (i = 0; i < listaTarefas.length; i++) {
                    tabela.push('<tr>');

                    if (!listaTarefas[i].terminada && !listaTarefas[i].atualiza) {
                        tabela.push('<td><input type="checkbox" value="' + i + '" onclick="completarTarefa()"></td>');
                        tabela.push('<td>' + listaTarefas[i].descricao + '</td>');
                    } else if (listaTarefas[i].atualiza) {
                        if (listaTarefas[i].terminada) {
                            tabela.push('<td><input id="alteraTerminada" type="checkbox" value="' + i + '" onclick="" checked></td>');
                        } else {
                            tabela.push('<td><input id="alteraTerminada" type="checkbox" value="' + i + '" onclick=""></td>');
                        }
                        tabela.push('<td><input id="alteraDescricao" type="text" value="' + listaTarefas[i].descricao + '"></td>');
                        tabela.push('<td><button value="' + i + '" onclick="salvarTarefa()">Salvar</button></td>');
                        tabela.push('<td><button value="' + i + '" onclick="cancelarEditarTarefa()">Cancelar</button></td>');
                        tabela.push('</tr>');
                        continue;
                    } else {
                        tabela.push('<td><input type="checkbox" value="' + i + '" onclick="completarTarefa()" checked></td>');
                        tabela.push('<td><strike>' + listaTarefas[i].descricao + '</strike></td>');
                    }

                    tabela.push('<td><button value="' + i + '" onclick="marcaEditarTarefa()">Editar</button></td>');
                    tabela.push('<td><button value="' + i + '" onclick="deletarTarefa()">Apagar</button></td>');
                    tabela.push('</tr>');
                }
                document.getElementById('todoTableBody').innerHTML = tabela.join('');
            }

            //Desenha a Table com as tarefas
            drawTable();

            function deletarTarefa() {
                listaTarefas.splice(parseInt(event.srcElement.value), 1);

                drawTable();
            }

            function completarTarefa() {
                listaTarefas[parseInt(event.srcElement.value)].terminada = true;

                drawTable();
            }
            function marcaEditarTarefa() {
                listaTarefas[parseInt(event.srcElement.value)].atualiza = true;

                drawTable();
            }
            function cancelarEditarTarefa() {
                listaTarefas[parseInt(event.srcElement.value)].atualiza = false;

                drawTable();
            }

            function adicionarTarefa() {
                listaTarefas.push({
                    descricao: document.getElementById('descricao').value,
                    terminada: false,
                    atualiza: false
                });

                document.getElementById('descricao').value = '';
                drawTable();
            }

            function salvarTarefa() {
                var t = listaTarefas[parseInt(event.srcElement.value)];

                t.descricao = document.getElementById('alteraDescricao').value;

                if (document.getElementById('alteraTerminada').checked) {
                    t.terminada = true;
                } else {
                    t.terminada = false;
                }

                t.atualiza = false;

                drawTable();
            }
}
