const cards = document.querySelectorAll('.card');
let temCartaoVirado = false; //tem o cartão virado
let primeiroCartao, segundoCartao; // primeiro Cartão, segundo Cartão;
let quadroBloqueado = false; // quadro de bloqueio


// vira a carta
function virarCarta() {
    if (quadroBloqueado) return;
    if (this === primeiroCartao) return;
    this.classList.add('flip');
    if (!temCartaoVirado) {
        temCartaoVirado = true;
        primeiroCartao = this;
        return;
    }

    segundoCartao = this;
    temCartaoVirado = false;
    verificaCorrespondencia();
}

// verifique se há correspondência
function verificaCorrespondencia() {
    if (primeiroCartao.dataset.card === segundoCartao.dataset.card) {
        disableCards();
        return;
    }

    desviraCarta();
}
//desativar cartões
function disableCards() {
    primeiroCartao.removeEventListener('click', virarCarta);
    segundoCartao.removeEventListener('click', virarCarta);

    reiniciarPlacar();
}
// desvira carta
function desviraCarta() {
    quadroBloqueado = true;

    setTimeout(() => {
        primeiroCartao.classList.remove('flip');
        segundoCartao.classList.remove('flip');

        reiniciarPlacar();
    }, 1500);
}

//reiniciar placa
function reiniciarPlacar() {
    [temCartaoVirado, quadroBloqueado] = [false, false];
    [primeiroCartao, segundoCartao] = [null, null];
}

//embaralhar
(function embaralhar() {
    cards.forEach((card) => {
        let posicaoAleatoria = Math.floor(Math.random() * cards.length);
        card.style.order = posicaoAleatoria;
    })
})();


cards.forEach((card) => {
    card.addEventListener('click', virarCarta)
});