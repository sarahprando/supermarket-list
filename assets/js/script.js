class Lista {
    constructor(categoria, qntd, item, valor) {
        this.categoria = categoria.charAt(0).toUpperCase() + categoria.slice(1)
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

    pesquisar(lista) {

        let listasFiltradas = Array()
        listasFiltradas = this.recuperarRegistros()

        if(lista.categoria != ''){
            listasFiltradas = listasFiltradas.filter(l => l.categoria == lista.categoria)
        }

        return listasFiltradas
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

function carregaListaCompleta(listas = Array()) {

    if (listas.length == 0) {
        listas = bd.recuperarRegistros()
    }

    let listaCompleta = document.getElementById('listaCompleta')
    listaCompleta.innerHTML = ''

    listas.forEach(function (l) {

        let linha = listaCompleta.insertRow()

        linha.insertCell(0).innerHTML = l.categoria
        linha.insertCell(1).innerHTML = l.qntd
        linha.insertCell(2).innerHTML = l.item
        linha.insertCell(3).innerHTML = `R$ ${l.valor}`

        let btn = document.createElement('button')
        btn.className = 'btn-remove font-3 cor-3'
        btn.innerHTML = '-'
        btn.id = `id_lista_${l.id}`
        btn.onclick = function () {

            let id = this.id.replace('id_lista_', '')

            bd.remover(id)
        }
        linha.insertCell(4).append(btn)

        const valorTotal = listas.reduce((acumulador, id) => {
            const precoLimpo = +id.valor.replace(',', '.');
            return acumulador + precoLimpo;
        }, 0)

        let total = document.querySelector('.total')
        total.innerHTML = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
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


// modal lista categoria

const btnCloseCategoria = document.querySelector('.btn-close-categoria button');
const modalListaCategoria = document.querySelector('.listaCategoria');

function FModalCategoria(event) {
    modalListaCategoria.classList.toggle('ativo');
    window.location.reload();
}

btnCloseCategoria.addEventListener('click', FModalCategoria);


// carrega lista completa por categoria


function carregaCategoria(elemento){

    modalListaCategoria.classList.toggle('ativo')

    let listas = Array()
    listas = bd.recuperarRegistros();

    let id = elemento.id
    id = id.charAt(0).toUpperCase() + id.slice(1)

   let filtradoCategoria = listas.filter( l => l.categoria == id)

   console.log(filtradoCategoria)

   let listaCategoria = document.getElementById('listaCategoria')
   listaCategoria.innerHTML = ''

    filtradoCategoria.forEach(function (l) {

       let linha = listaCategoria.insertRow()

        linha.insertCell(0).innerHTML = l.categoria
        linha.insertCell(1).innerHTML = l.qntd
        linha.insertCell(2).innerHTML = l.item
        linha.insertCell(3).innerHTML = `R$ ${l.valor}`

        let btn = document.createElement('button')
        btn.className = 'btn-remove font-3 cor-3'
        btn.innerHTML = '-'
        btn.id = `id_lista_${l.id}`
        btn.onclick = function () {

            let id = this.id.replace('id_lista_', '')

            bd.remover(id)
            window.location.reload();
        }
        linha.insertCell(4).append(btn)

        const valorTotal = filtradoCategoria.reduce((acumulador, id) => {
            const precoLimpo = +id.valor.replace(',', '.');
            return acumulador + precoLimpo;
        }, 0)

        let totalCategoria = document.querySelector('.total-categoria')
        totalCategoria.innerHTML = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`

    })
   
  }


