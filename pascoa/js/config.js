
function setConfig(){
    var text = {
        "title":"Vendas"
    };    
    document.title = text.title; //Pega o valor "title" da variavel text e define como titulo da aplicação(tag <title> do documento html referenciado)
    document.getElementById("navTitle").innerHTML = text.title;//pega o valor title da variavel text e o coloca onde o id for navTitle
}

setConfig();