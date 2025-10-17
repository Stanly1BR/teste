function meuEscopo() {
    const form = document.querySelector('.form');

    form.onsubmit = function (evento) {
        alert('Formulário enviado.');
    };
}
meuEscopo();