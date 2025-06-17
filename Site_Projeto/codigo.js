//URL da API em JSON
const API_URL = "https://api.jsonbin.io/v3/b/6851c2a28561e97a50260627";
let cardapio = []; // Variável array para armazenar os produtos

// Função para carregar o menu da API
async function mostrarMenu() {
    //Se a API estiver ligada irá fazer:
    try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        cardapio = dados.record.produtos;
        
        //Irá aparecer os produtos no elemento "menu-produto"
        const tabela = document.getElementById('menu-produto');
        tabela.innerHTML = '';
        
        //Irá adicionar uma "row", uma linha á tabela Menu por cada produto adicionado
        cardapio.forEach(produto => {
            const linha = tabela.insertRow();
            linha.className = 'menu-produto';
            linha.innerHTML = `
                <td>
                    <img src="${produto.foto}" alt="${produto.nome}" width="100%">
                    <h3>${produto.nome}</h3>
                    <p>Preço: €${produto.preco.toFixed(2)}</p>

                    <button onclick="pedir(${produto.id})" 
                            style="background-color:#6a0401; color:white; border:none; padding:8px 16px; cursor:pointer">
                        Pedir
                    </button>
                </td>
            `;
        });
        //caso o API não seja reconhecido irá aparecer a mensagem:
    } catch (erro) {
        console.error("Erro ao carregar menu:", erro);
        document.getElementById('menu-produto').innerHTML = '<tr><td>Menu indisponível. Tente recarregar.</td></tr>';
    }
}

// Função para o cliente fazer o seu pedir
function pedir(id) {
    const produto = cardapio.find(item => item.id === id);
    if (produto) {
        alert(`Você pediu: ${produto.nome}\nPreço: €${produto.preco.toFixed(2)}`);
    } else {
        alert("Produto não encontrado!");
    }
}

// Função para o cliente entrar em contacto
const formulario = document.getElementById('contacto');
if (formulario) {
    formulario.onsubmit = function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso!');
        this.reset();
    };
}

window.onload = mostrarMenu;