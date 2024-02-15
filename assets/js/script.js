class Lista {
    constructor(categoria, qntd, item, valor) {
        this.categoria = categoria
        this.qntd = qntd
        this.item = item.charAt(0).toUpperCase() + item.slice(1)
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
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

    recuperarRegistros() {

        let listas = Array()

        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {
            let lista = JSON.parse(localStorage.getItem(i))

            if (lista === null) {
                continue
            }

            lista.id = i

            listas.push(lista)
        }

        return listas
    }

    remover(id) {
        localStorage.removeItem(id)
        alert('Item removido')
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

    if (lista.validarDados()) {
        bd.gravar(lista)

        alert('Inserido com sucesso!')

        categoria.value = ''
        qntd.value = ''
        item.value = ''
        valor.value = 'R$ '

    } else {

        alert('Preencher campos corretamente!')

    }
}


// carregar lista completa

function carregaListaCompleta(listas = Array(), filtro = false) {

    if (listas.length == 0 && filtro == false) {
        listas = bd.recuperarRegistros()
    }

    let listaCompleta = document.getElementById('listaCompleta')
    listaCompleta.innerHTML = ''

    listas.forEach(function (l) {

        let linha = listaCompleta.insertRow()

        switch (l.categoria) {
            case '1': l.categoria = 'Mercearia'
                break

            case '2': l.categoria = 'Hortifrúti'
                break

            case '3': l.categoria = 'Carnes'
                break

            case '4': l.categoria = 'Padaria'
                break

            case '5': l.categoria = 'Bebidas'
                break

            case '6': l.categoria = 'Utilidades'
                break

            case '7': l.categoria = 'Limpeza'
                break

            case '8': l.categoria = 'Higiene'
                break
        }

        linha.insertCell(0).innerHTML = l.categoria
        linha.insertCell(1).innerHTML = l.qntd
        linha.insertCell(2).innerHTML = l.item
        linha.insertCell(3).innerHTML = `R$ ${l.valor}`

        let btn = document.createElement('button')
        btn.className = 'btn-remove'
        btn.innerHTML = '-'
        btn.id = `id_lista_${l.id}`
        btn.onclick = function () {

            let id = this.id.replace('id_lista_', '')

            bd.remover(id)
        }
        linha.insertCell(4).append(btn)

        const valorTotal = listas.reduce((acumulador, id) => {
            const precoLimpo = +id.valor.replace('R$ ', '').replace(',', '.');
            return acumulador + precoLimpo;
          }, 0)
    
          let total = document.querySelector('.total')
          total.innerHTML = `R$ ${valorTotal.toFixed(2)}`
    })

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

