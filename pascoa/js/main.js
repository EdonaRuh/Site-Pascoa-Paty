//---------------matriz------------------------------------------
var list = [
	{"nome": "Livro 1", "Qtd": "2", "valor": "55.30"},
	{"nome": "Livro 2", "Qtd": "1", "valor": "49.90"},//todos os itens deve estar entre {} e finalizados com ","
	{"nome": "Livro 3", "Qtd": "3", "valor": "35.00"},//excerto o ultimo, como na criação de uma tabela no MySQL
	{"nome": "Livro 4", "Qtd": "3", "valor": "15.50"}
];//cria um array com varios itens dentro dele(quase como uma tabela de banco de dados.)


function getTotal(list){//função percorre a matriz e multiplica valor por qtd para dar o valor total de cada venda
	var total = 0;
	for(var key in list){
		total += list[key].Qtd * list[key].valor;
	}
	return total;
}


function setList(list){//função percorre toda a matriz e vai adicionando os dados dela em uma tabela para o usuario ver
	var table = '<tread><tr><td>Nome</td><td>Quantidade</td><td>Valor</td><td>Action</td></tr></tread><tbody>';
	for(var key in list){
		table += '<tr><td>'+formatNome(list[key].nome)+'</td><td>'+formQtd(list[key].Qtd)+'</td><td>'+formatValue(list[key].valor)+'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Editar</button> <button class="btn btn-default" onclick="deleteData('+key+');">Deletar</button></td>';	
	}		
	table += '</tbody>';
	document.getElementById("tableList").innerHTML = table;
}

//------funções-para-formatação-de-string-----------------------------------------------

function formatNome(nome){//função para formatar o nome do item, deixando só a primeira letra maiuscula
	var str = nome.toLowerCase(); //Faz todos os caracteres da string ficarem minusculos
	str = str.charAt(0).toUpperCase() + str.slice(1); //comando separa a primeira linha da string para maiuscula e concatena com as demais, em minusculo.
	//charAt(0) = pega um determinado caractere da string, sendo escolhido de acordo com o numero setado
	//toUpperCase() = passa todos os caracteres para maiusculo
	//slice(1) = vai fazer a concatenação da string a partir de determinado caractere, no exemplo sendo o segundo
	return str;
}	

function formQtd(qtd){
	return parseInt(qtd);
}

function formatValue(value){//função para formatar o campo Valor, apresentando só dois numeros depois da ","
	var str = parseFloat(value).toFixed(2) + "";//parseFloat: passa o valor da string para float
	//toFixed(2): demarca quantos numeros irão aparecer depois da virgula
	// O espaço vazio no final "" serve para fazer o valor float voltar a ser uma string.
	str = str.replace(".",","); //faz com que todos os lugares da string que estejam com "." passe a ter ","
	str = "$ " + str;
	return str;
}

function addData(){
	if (!validar()){//valida os dados antes de salvar eles na lista
		return;
	}
	var nome = document.getElementById("nome").value;
	var qtd = document.getElementById("qtd").value;
	var valor = document.getElementById("valor").value;

	list.unshift({"nome":nome ,"Qtd":qtd ,"valor":valor});
	setList(list);
}

function setUpdate(id){
	document.getElementById("alertErro").style.display = "none";
	var obj = list[id];//pega o ID da linha na lista ao clicar no botão e usa o id para:
	document.getElementById("nome").value = obj.nome;//setar o nome do campo
	document.getElementById("qtd").value = obj.Qtd;//quantidade
	document.getElementById("valor").value = obj.valor;//e valor
	document.getElementById("btnUpdate").style.display = "inline-block";//faz aparecer os btns "save" e "cancel"
	document.getElementById("btnAdd").style.display = "none";//faz sumir o botão "add"
	document.getElementById("pegaId").innerHTML = '<input id="valId" type="hidden" value="'+id+'">';//cria no html
	//um input hidden para salvar o ID da linha que estamos trabalhando.
}

function resetForm(){
	document.getElementById("nome").value = "";//limpa o campo nome
	document.getElementById("qtd").value = "";//limpa o campo qtd
	document.getElementById("valor").value = "";//limpa o campo valor
	document.getElementById("btnUpdate").style.display = "none";//faz sumir os btns "save" e "cancel"
	document.getElementById("btnAdd").style.display = "inline-block";//e faz aparecer o botão "add"
	document.getElementById("pegaId").innerHTML = "";//apaga o campo onde tinha sido salvo o ID da linha trabalhada.
	document.getElementById("alertErro").style.display = "none";//apaga a div dos erros de validação
}

function updateData(){//função para atualizar os dados selecionados
	if (!validar()){//valida os dados antes de salvar eles na lista
		return
	}
	var id =  document.getElementById("valId").value;//pega id do campo
	var nome = document.getElementById("nome").value;//pega nome do campo
	var qtd = document.getElementById("qtd").value;//pega qtd do campo
	var valor = document.getElementById("valor").value;//pega valor do campo

	list[id] = {"nome": nome, "Qtd": qtd, "valor": valor};//adiciona à lista os valores alterados
	resetForm();//limpa os campos
	setList(list);//atualiza a lista para o ususario
}

function deleteData(id){//função para deletar um determinado registro da tabela
	if(confirm("Deseja realmente deletar este item?")){//alert com opção de confirmar ou cancelar
		var remove = list.splice(id, id);//esse metodo "splice" tira da matris todos os valores entre os dois estipulados,
		// os coloca dentro da variavel "remove" e tira da apresentação. Como no caso só queremos excluir um unico valor
		//devemos repetir duas vezes a variavel, pois se colocarmos apenas 1x, o metodo vai apagar da variavel em diante. 
	}
	setList(list);
}

function validar(){

	var nome = document.getElementById("nome").value;
	var qtd = document.getElementById("qtd").value;
	var valor = document.getElementById("valor").value;
	var erro = "";
	document.getElementById("alertErro").style.display = "none";//faz o erro de validação começar "apagado" e faz com que 
	//os erros sumam em toda nova validação
	if(nome === ""){
		erro += "Insira o nome do produto!";
	}else{
		if(qtd === ""){
			erro += "Insira a quantidade do produto!";
		}else if(qtd != parseInt(qtd)){
			erro += "Insira uma quantidade valida";
		}else{
			if(valor === ""){
				erro += "Insira o valor do produto!";
			}else if(valor != parseFloat(valor)){
				erro += "Insira um valor valido";
			}
		}
	}

	if(erro != ""){
		document.getElementById("alertErro").style.display = "block";
		document.getElementById("alertErro").innerHTML = "<h3>Erro:</h3>" + erro;
		return 0;
	}else{
		return 1;
	}
}

setList(list);
console.log(getTotal(list));