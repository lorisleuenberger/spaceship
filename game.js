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
    startbtn: document.getElementById('start'),
    canvas: document.getElementById('canvas'),
    backgroundcolor: 'rgb(253, 253, 255)',
    player: {
        color: 'rgb(57, 61, 63)',
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
            speed: 1,
        },
    },
    bullets: {
        settings: {
            color: 'rgb(57, 61, 63)',
            speed: 2,
            interval: 100,
            intervalCountdown: 0,
            size: {
                width: 4,
                height: 16,
            }
        },
        objects: [],
    }
}

function run() {
    moveplayer();
    shooting();
    draw();
}

function moveplayer(direction) {
    if(game.player.moving.left && !game.player.moving.right) {
        if(game.player.position.x - game.player.moving.speed > 0) {
            game.player.position.previous.x = game.player.position.x 
            game.player.position.x -= game.player.moving.speed
        }
    } else if(game.player.moving.right && !game.player.moving.left) {
        if(game.player.position.x + game.player.moving.speed < game.canvas.width - game.player.size.width) {
            game.player.position.previous.x = game.player.position.x 
            game.player.position.x += game.player.moving.speed
        }
    }
}

function shooting() {
    // Spawn bullets
    if(game.bullets.settings.intervalCountdown === 0) {
        game.bullets.objects.push({
            x: game.player.position.x + game.player.size.width / 2,
            y: game.player.position.y,
        })
        game.bullets.settings.intervalCountdown = game.bullets.settings.interval
    }
    game.bullets.settings.intervalCountdown -= 1;

    // update bullets
    let bulletsToDelete = [];
    for( let i = 0; i < game.bullets.objects.length; i++ ) {
        game.bullets.objects[i].y -= game.bullets.settings.speed
        if(game.bullets.objects[i] <= 0) {
            bulletsToDelete.push(i)
        }
    }
    bulletsToDelete.forEach(bulletToDelete => {
        game.bullets.objects.splice(bulletToDelete, 1)
    });
}

function draw() {
    if (!game.canvas.getContext) {
        alert("Canvas not found!")
        return;
    }
    const ctx = game.canvas.getContext("2d")

    ctx.fillStyle = game.backgroundcolor
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    ctx.fillStyle = game.player.color
    ctx.fillRect(game.player.position.x,game.player.position.y,game.player.size.width,game.player.size.height)

    ctx.fillStyle = game.bullets.settings.color
    for( let i = 0; i < game.bullets.objects.length; i++ ) {
        ctx.fillRect( game.bullets.objects[i].x, game.bullets.objects[i].y, game.bullets.settings.size.width, game.bullets.settings.size.height )
    }
}

function start() {
    if(game.running) {
        return
    }
    game.startbtn.style.display = 'none'
    game.canvas.style.display = 'block'
    game.intervalId = setInterval( run , 5 )
    game.running = true
}


function pause() {
    if(!game.running) {
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
