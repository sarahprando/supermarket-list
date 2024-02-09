class Lista {
    constructor(item) {
        this.item = item
    }
}

function cadastrarItem() {
    let item = document.getElementById('item')
    
    let lista = new Lista(
        item.value
    )

    console.log(lista)
}

