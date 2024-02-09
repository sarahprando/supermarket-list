class Lista {
    constructor(item) {
        this.item = item
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
    let item = document.getElementById('item')
    
    let lista = new Lista(
        item.value
    )

    bd.gravar(lista)
}

