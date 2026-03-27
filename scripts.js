const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('imagem-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click()
})

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject)=> {
        const leitor = new FileReader();
        leitor.onload = () =>{
            resolve({url:leitor.result, nome: arquivo.name})
        }

        leitor.onerror = ()=> {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector('.main_imagem');
const nomeDaImagem = document.querySelector('.container_imagem_nome p');

inputUpload.addEventListener('change', async (evento)=>{
    const arquivo = evento.target.files[0];

    if (arquivo){
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome
        } catch (erro) {
            console.error('Erro na leitura do arquivo')
        }
    }
})

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('lista-tags')

listaTags.addEventListener('click', (evento) =>{
    if (evento.target.classList.contains('remove-tag')){
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

const tagsDisponiveis = [
    'Front-end', 'Programação', 'Data Science', 'Full-Stack', 'HTML', 'CSS', 'JavaScript'
];

async function VerificarTagsDisponiveis (tagtexto) {
    return new Promise((resolve) =>{
        setTimeout(() =>{
            resolve(tagsDisponiveis.includes(tagtexto));
        }, 1000)
    })
}

inputTags.addEventListener('keypress', async (evento) => {
    if (evento.key === 'Enter'){
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== ''){
            try {
            const tagExiste = await VerificarTagsDisponiveis(tagTexto);
            if (tagExiste){
            const tagNova = document.createElement('li');
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
            listaTags.appendChild(tagNova);
            inputTags.value = '';
            } else {
                alert('tag não foi encontrada')
            }
            } catch (error){
                console.error('erro ao verificar a existência da tag');
                alert('erro ao verificar a existência da tag');
            }
        }
    }
})

const botaoPublicar = document.querySelector('.botao_publicar');

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resome, reject)=>{
        setTimeout(()=>{
            const deuCerto = Math.random() > 0.5;

            if (deuCerto){
                resolve('Projeto Publicado com sucesso');
            } else {
                reject('erro ao publicar o Projeto')
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById('nome').value;
    const descricaoDoProjeto = document.getElementById('descricao').value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert('Deu tudo certo!')
    } catch (error) {
        console.log('Deu errado: ', error)
        alert('Deu tudo errado')
    }
})

const botaoDescartar = document.querySelector('.botao_descartar');

botaoDescartar.addEventListener('click', (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector('form');
    
    formulario.reset();
    imagemPrincipal.src = './img/imagem1.png';
    nomeDaImagem.textContent = 'imagem.projeto.png';

    listaTags.innerHTML = '';
})