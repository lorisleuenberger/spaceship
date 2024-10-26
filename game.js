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
        size: {
            width: 40,
            height: 40,
        },
        position: {
            x: 280,
            y: 740,
            previous: {
                x: 280,
                y: 740,
            },
        },
        moving: {
            left: false,
            right: false,
        },
    },
}

function run() {
    moveplayer();
    draw();
}

function moveplayer(direction) {
    if(game.player.moving.left && !game.player.moving.right) {
        if(game.player.position.x - 2 > 0) {
            game.player.position.previous.x = game.player.position.x 
            game.player.position.x -= 2
        }
    } else if(game.player.moving.right && !game.player.moving.left) {
        if(game.player.position.x + 2 < game.canvas.width - game.player.size.width) {
            game.player.position.previous.x = game.player.position.x 
            game.player.position.x += 2
        }
    }
}

function draw() {
    if (!game.canvas.getContext) {
        alert("Canvas not found!")
        return;
    }
    const ctx = game.canvas.getContext("2d")
    ctx.fillStyle = "rgb(200 0 0)"
    if(game.player.position.x != game.player.position.previous.x) {
        ctx.clearRect(game.player.position.previous.x,game.player.position.previous.y,game.player.size.width,game.player.size.height)
    }
    ctx.fillRect(game.player.position.x,game.player.position.y,game.player.size.width,game.player.size.height)
}

function start() {
    if(game.running) {
        console.log("game already running")
        return
    }
    game.startbtn.style.display = 'none'
    game.canvas.style.display = 'block'
    game.intervalId = setInterval( run , 10 )
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
