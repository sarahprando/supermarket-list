class Lista {
    constructor(qntd, item, valor) {
        this.qntd = qntd,
        this.item = item,
        this.valor = valor
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(l){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(l))

        localStorage.setItem('id', id)
    }
}

let bd = new Bd()

function cadastrarItem() {
    let qntd = document.getElementById('qntd')
    let item = document.getElementById('item')
    let valor = document.getElementById('valor')
    
    let lista = new Lista(
        qntd.value,
        item.value,
        valor.value
    )

    bd.gravar(lista)

    qntd.value = ''
    item.value = ''
    valor.value = ''
}

// modal lista completa

const btnLista = document.querySelector('.btn-lista');
const btnClose = document.querySelector('.btn-close button');
const modalLista = document.querySelector('.modal-lista');

btnLista.addEventListener('click', () => {
    modalLista.classList.toggle('ativo');
    document.querySelector('.modal-lista-container .lista-completa').innerHTML = 'lista aqui'
});

btnClose.addEventListener('click', () => {
    modalLista.classList.toggle('ativo');
});

// modal add item

const btnAdd = document.querySelector('.btn-add');
const btnCloseAdd = document.querySelector('.btn-close-add button');
const modalAdd = document.querySelector('.modal-add');

btnAdd.addEventListener('click', () => {
    modalAdd.classList.toggle('ativo');
});

btnCloseAdd.addEventListener('click', () => {
    modalAdd.classList.toggle('ativo');
});
