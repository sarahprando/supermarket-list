class Lista {
    constructor(valor) {
        this.valor = valor
    }
}

const item = document.getElementById('entrada');

let lista = new Lista(item.value)

function cadastrarItem() {
    return console.log(item.value);
}

