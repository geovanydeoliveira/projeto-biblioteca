"use strict";
// armazena títulos
let armazenatitulos = [
    'volta',
    'bruxa de blair',
    'o sobrinho do mago',
    'antes de voce',
    'o jogo do exterminador',
    'a menina que roubava livros',
    'as aventuras de tom sawyer'
];
// carrega livros do localStorage ou inicia vazio
let livros = JSON.parse(localStorage.getItem('livros') || '[]');
//funcao auxiliar para mostrar mensagens tela
function monstrarMensagem(texto, cor = 'black') {
    let div = document.getElementById('mensagem');
    if (div) {
        div.innerText = texto;
        div.style.color = cor;
        div.style.marginTop = '10px';
    }
}
// função 01. adiciona livros no array livros e salva no localStorage
function adicionarlivros() {
    // pega o elemento input
    let inputTitulo = document.getElementById('respostatitulo');
    if (!inputTitulo) {
        monstrarMensagem('Campo de título não encontrado');
        return;
    }
    // pega o valor, limpa espaços e coloca em minúsculas
    let valorTitulo = inputTitulo.value.trim().toLowerCase();
    if (valorTitulo === '') {
        monstrarMensagem('⚠️ Por favor, digite um título.');
        return;
    }
    // verifica se está na lista permitida
    let jaExiste = false;
    for (let i = 0; i < armazenatitulos.length; i++) {
        if (armazenatitulos[i].toLowerCase() === valorTitulo) {
            jaExiste = true;
        }
    }
    if (!jaExiste) {
        monstrarMensagem('❌ Esse Livro Não Está Adicionado À Lista');
        return;
    }
    // verifica se já foi cadastrado
    let jaCadastrado = false;
    for (let i = 0; i < livros.length; i++) {
        if (livros[i] === valorTitulo) {
            jaCadastrado = true;
        }
    }
    if (jaCadastrado) {
        monstrarMensagem('⚠️ Livro já está cadastrado');
        return;
    }
    // adiciona e salva
    livros.push(valorTitulo);
    localStorage.setItem('livros', JSON.stringify(livros));
    monstrarMensagem('✅ Livro Adicionado Com Sucesso');
    // limpa o campo
    inputTitulo.value = '';
}
function mostrarLista() {
    let divLista = document.getElementById('listaLivros');
    let livrosJSON = localStorage.getItem('livros');
    if (divLista) { // verifica se o elemento existe
        if (livrosJSON) {
            let livros = JSON.parse(livrosJSON);
            let listaHTML = '<ul>';
            livros.forEach((titulo) => {
                listaHTML += '<li>' + titulo + '</li>';
            });
            listaHTML += '</ul>';
            divLista.innerHTML = listaHTML;
        }
        else {
            divLista.innerHTML = 'Nenhum livro salvo.';
        }
    }
}
// Espera o DOM carregar pra garantir que o botão existe
document.addEventListener('DOMContentLoaded', () => {
    const btnMostrarLista = document.getElementById('mostrarLista');
    if (btnMostrarLista) {
        btnMostrarLista.addEventListener('click', mostrarLista);
    }
});

// Função para abrir o livro em PDF na nova aba
function abrirLivro() {
    const input = document.getElementById('tituloLivro');
    const titulo = input.value.trim();
    if (titulo === '') {
        monstrarMensagem('Por favor, digite o título do livro.');
        return;
    }
    const livrosJSON = localStorage.getItem('livros');
    if (!livrosJSON) {
        monstrarMensagem('Nenhum livro cadastrado.');
        return;
    }
    const livros = JSON.parse(livrosJSON);
    const livroExiste = livros.some(l => l.toLowerCase() === titulo.toLowerCase());
    if (!livroExiste) {
        monstrarMensagem('Livro não encontrado.');
        return;
    }
    monstrarMensagem('Abrindo livro...', 'green');
    const nomeArquivo = titulo.toLowerCase().replace(/\s+/g, '-');
    const caminhoPDF = `pdf/${nomeArquivo}.pdf`;
    window.open(caminhoPDF, '_blank');
}
// Adiciona evento ao botão após carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const btnAbrir = document.getElementById('abrirLivros');
    if (btnAbrir) {
        btnAbrir.addEventListener('click', abrirLivro);
    }
});
