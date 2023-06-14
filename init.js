
const world = new World({
    element: document.querySelector('.game-container'),
});

let buttonStart = document.getElementById("start");
buttonStart.addEventListener("click", load)

let buttonRestart = document.getElementById("restart");
buttonRestart.addEventListener("click", reset)

const instruction = document.getElementById('howto');

function load() {
    world.init();
    instruction.style.display = 'none';
    buttonStart.style.display = 'none';
};



function reset() {
    location.reload();
    buttonStart.style.display = 'block';
}