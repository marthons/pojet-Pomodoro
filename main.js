const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iconebt = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela =document.querySelector('#timer');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const fimTimer = new Audio('/sons/beep.mp3');
const startPause = document.querySelector('#start-pause');

musica.loop = true;

let tempoDescorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else {
        musica.pause();
    }
})

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
        break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
        break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superficie.,<br>
            <strong class="app__title-strong">Faça uma pausa longa</strong>
            `
        break;
        default:
            break;
    }
}

focoBt.addEventListener('click', () => {
    tempoDescorridoEmSegundos =  1500;
    alterarContexto('foco')
    focoBt.classList.add('active');
   
})

curtoBt.addEventListener('click', () => {
    tempoDescorridoEmSegundos =  300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active');
    
})

longoBt.addEventListener('click', () => {
    tempoDescorridoEmSegundos =  900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active');
    
})

const contagemRegressiva = () => {
    if (tempoDescorridoEmSegundos <= 0) {
        fimTimer.play();
        alert('Tempo finalizado!');
        zerar();
        return 
    }
    tempoDescorridoEmSegundos -= 1
    mostrarTempo(); 
}

startPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        pause.play()
        zerar()
        return
    }
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar";
    iconebt.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId)
     intervaloId = null;
     iniciarOuPausarBt.textContent = "Começar";
     iconebt.setAttribute('src', '/imagens/play_arrow.png');
}

function mostrarTempo() {
    const tempo = new Date(tempoDescorridoEmSegundos *  1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {
        minute: '2-digit', 
        second: '2-digit'
    })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo();