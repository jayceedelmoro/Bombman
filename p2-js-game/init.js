(function() {
    const world = new World({
        element: document.querySelector('.game-container')
    });

    world.init();
})();


// let canvas = document.querySelector('.game-canvas');
// let ctx = canvas.getContext('2d');

// let buttonLoad = document.getElementById("load");
// buttonLoad.addEventListener("click", load)
// let buttonRestart = document.getElementById("restart");
// buttonRestart.addEventListener("click", reset)

// function reset() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }