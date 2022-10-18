let game
let player  
let food
let refreshGame


async function singlePlayer() {
    
    const config = await configPlayer()

    getKeyPress()
    
    game = new GameArea("player")
    game.start();

    player = new Player(config.name,config.color,config.bodyColor,game.context)
    player.spawn()
    
    food = new Food(game.context)
    
    PlayPause(lvls)

    refresh(lvls)   
}

function PlayPause(lvls) {
    document.getElementById("pause_player").addEventListener('click',()=>{
        document.getElementById("play_player").style.display = "block"
        document.getElementById("pause_player").style.display = "none"
        clearInterval(refreshGame)
    })

    document.getElementById("play_player").addEventListener('click',()=>{
        document.getElementById("play_player").style.display = "none"
        document.getElementById("pause_player").style.display = "block"
        refresh(lvls)
    })
}

function getKeyPress() {
    window.onkeydown = (event) => {
        switch (event.key.toUpperCase()) {
            case "W":
                player.setDir("UP")
                break;
            case "A":
                player.setDir("LEFT");
                break;
            case "S":
                player.setDir("DOWN");
                break;
            case "D":
                player.setDir("RIGHT");
                break;
            case "ARROWUP":
                player.setDir("UP")
                break;
            case "ARROWLEFT":
                player.setDir("LEFT");
                break;
            case "ARROWDOWN":
                player.setDir("DOWN");
                break;
            case "ARROWRIGHT":
                player.setDir("RIGHT");
                break;
        }
    }
}

function refresh(lvls) {
    
    refreshGame = setInterval(()=>{
        game.clear()
        food.spawn()        
        player.move(lvls[game.lvl].vel)
        let b_l_x
        let b_l_y
        player.bodies.forEach((body,index) => {
            if (index == 0) {
                body.move(player.l_x,player.l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            } else {
                body.move(b_l_x,b_l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            }
            if (player.x == body.x-10 && player.y == body.y-10) {
                player.die()
                clearInterval(refreshGame)
            }
        });
        if(player.x == food.x && player.y == food.y) {
            player.addBody()
            food.changePosition()
            game.addScore()
            clearInterval(refreshGame)
            refresh(lvls)
            
        }
        if (player.dead == true) {
            player.die()
            clearInterval(refreshGame)
        }
        
    }, lvls[game.lvl].fps)
}
