let game = {
    running: false,
    intervalId: null,
    settings: {
        keybindings: {
            start: ['Enter'],
            pause: ['Escape'],
            left: ['a'],
            right: ['d'],
        },
    },
    startbtn: document.getElementById("start"),
    canvas: document.getElementById("canvas"),
    player: {
        position: 280,
        moving: {
            left: false,
            right: false,
        },
    },
}

function run() {
    if(game.player.moving.left && !game.player.moving.right) {
        console.log("moving left")
    } else if(game.player.moving.right && !game.player.moving.left) {
        console.log("moving right")
    } else {
        console.log("standing still")
    }
    draw();
}

function draw() {
    if (!game.canvas.getContext) {
        alert("Canvas not found!")
        return;
    }
    const ctx = game.canvas.getContext("2d")
    ctx.fillStyle = "rgb(200 0 0)"
    ctx.fillRect(280,740,40,40)
}

function start() {
    if(game.running) {
        console.log("game already running")
        return
    }
    game.startbtn.style.display = 'none'
    game.canvas.style.display = 'block'
    game.intervalId = setInterval( run , 20 )
    game.running = true
}


function pause() {
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
    window.addEventListener('keyup', (event) => {
        if (game.settings.keybindings.start.includes(event.key)) {
            start()
        }
        if (game.settings.keybindings.pause.includes(event.key)) {
            pause()
        }
        if (game.running) {
            if (game.settings.keybindings.left.includes(event.key)) {
                game.player.moving.left = false
            }
            if (game.settings.keybindings.right.includes(event.key)) {
                game.player.moving.right = false
            }
        }
    })
    window.addEventListener('keydown', (event) => {
        if (game.running) {
            if (game.settings.keybindings.left.includes(event.key)) {
                game.player.moving.left = true
            }
            if (game.settings.keybindings.right.includes(event.key)) {
                game.player.moving.right = true
            }
        }
    })
}

setup();
