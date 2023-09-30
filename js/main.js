
//pesquisarCep recebe arrow function

const pesquisarCep = async () => {

    var cep = document.getElementById('cep').value

    //usando templete string para concatenar strings


    const url = `http://viacep.com.br/ws/${cep}/json/`;

    //modo para realizar consullta utilizando o fetch 
    // fetch(url)
    // .then(resposta => resposta.json())
    // .then((dados) => console.log(dados));


    if (cepValido(cep)) {

        limparCampos()

        const dados = await fetch(url);
        const endereco = await dados.json();


        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('logradouro').value = 'CEP nao localizado';
        } else {
            preencherFormulario(endereco);
        }



    } else {
        document.getElementById('logradouro').value = 'digitação invalida';
    }


    // console.log(endereco);

};


const preencherFormulario = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro;  
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;


};
// verifica quantidade de caracteres do cep
// verifica se todos os caracteres informado sao numeros 
// o acento circunflexo (^) indica que o inicio da variavel precisa ser numero 
// o sinal de + respresenta que pode ser mais que 1 caracteres 
// o cifrao $ indica que é o fim da validaçao

const cepValido = (cep) => cep.length == 8 && eNumero(cep);
const eNumero = (numero) => /^[0-9]+$/.test(numero);

const limparCampos = () =>{
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    
}


//addEventListener "escuta" os eventos relacionados ao controle mencionado no id, neste caso escuta o evento focusout (quando o controle perde o foco ), nesse momento ele aciona a função.

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

