let game = {
    running: false,
    intervalId: null,
    settings: {
        keybindings: {
            left: ['KeyA','ArrowLeft'],
            right: ['KeyD','ArrowRight'],
        },
    },
    startbtn: document.getElementById("start"),
    canvas: document.getElementById("canvas"),
}
const player = {
    position: 280,
}

function draw() {
    if (!game.canvas.getContext) {
        alert("Canvas not found!")
        return;
    }
    const ctx = game.canvas.getContext("2d")
    ctx.fillStyle = "rgb(200 0 0)"
    ctx.fillRect(280,740,40,40)
    console.log("draw")
}

function start() {
    if(game.running) {
        console.log("game already running")
        return
    }
    game.startbtn.style.display = 'none'
    game.canvas.style.display = 'block'
    game.intervalId = setInterval( draw , 20 )
    game.running = true
}

function stop() {
    if(!game.running) {
        console.log("game not running")
        return
    }
    clearInterval(game.intervalId)
    game.startbtn.style.display = 'block'
    game.canvas.style.display = 'none'
    game.running = false
}

function setup() {
    game.startbtn.addEventListener('click', () => start())
    window.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            start()
        }
    })
}

setup();
