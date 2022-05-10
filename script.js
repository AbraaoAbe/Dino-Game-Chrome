const dino = document.querySelector('.dino');
const bg = document.querySelector('.background');
const placar = document.querySelector('.placar');
let position = 0;
let score = 0;

let taPulando = false;

intervalPlacar = setInterval(() => {
    score += 1;
    placar1();
}, 100)

function getKey(event) {
    if (event.key === " ") {
        console.log("jump");
        if (!taPulando) {
            jump();
        }
    }
}

function jump() {
    taPulando = true;

    let upInterval = setInterval(() => {
        if (position >= 200) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                position -= 20;
                dino.style.bottom = position + 'px';

                if (position <= 0) {
                    clearInterval(downInterval);
                    taPulando = false;
                }
            }, 30);
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }



    }, 20);
}

function criaCactos() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    bg.appendChild(cactus);

    let leftInterval = setInterval(() => {


        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            bg.removeChild(cactus);

            //colisao
        } else if (cactusPosition > 0 && cactusPosition <= 60 && position <= 60) {
            //gameOver

            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class ="gameover">Fim de Jogo</h1>';

        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    setTimeout(criaCactos, randomTime);
}

function placar1() {

    placar.innerHTML = "<h2> Pontos: " + score + "</h2>";


} //fim da função placar()


criaCactos();
document.addEventListener('keyup', getKey);