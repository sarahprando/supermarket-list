class Lista {
    constructor(categoria, qntd, item, valor) {
        this.categoria = categoria
        this.qntd = qntd
        this.item = item
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
           if(this[i] == undefined || this[i] == '' || this[i] == null) {
            return false
           } 
        }
        return true
    }

}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(l) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(l))

        localStorage.setItem('id', id)
    }

}

let bd = new Bd()

function cadastrarItem() {
    let categoria = document.getElementById('categoria')
    let qntd = document.getElementById('qntd')
    let item = document.getElementById('item')
    let valor = document.getElementById('valor')

    let lista = new Lista(
        categoria.value,
        qntd.value,
        item.value,
        valor.value
    )

    if(lista.validarDados()) {
        bd.gravar(lista)

        alert('Inserido com sucesso!')

        categoria.value = ''
        qntd.value = ''
        item.value = ''
        valor.value = ''

    } else {

        alert('Preencher campos corretamente!')

    }     
}

// modal lista completa

const btnLista = document.querySelector('.btn-lista');
const btnClose = document.querySelector('.btn-close button');
const modalLista = document.querySelector('.modal-lista');

function FModalLista(event) {
    modalLista.classList.toggle('ativo');
}

btnLista.addEventListener('click', FModalLista);

btnClose.addEventListener('click', FModalLista);

// modal add item

function FModalAdd(event) {
    modalAdd.classList.toggle('ativo');
}

const btnAdd = document.querySelector('.btn-add');
const btnCloseAdd = document.querySelector('.btn-close-add button');
const modalAdd = document.querySelector('.modal-add');

btnAdd.addEventListener('click', FModalAdd);

btnCloseAdd.addEventListener('click', FModalAdd);
