let game_1
let game_2
let player_1
let player_2
let food_1
let food_2
let refreshGame_1
let refreshGame_2

async function dualPlayers() {
    
    const config_p2 = await configPlayer("1")
    const config_p1 = await configPlayer("2")
    
    getDualKeyPress(lvls)
    
    game_1 = new GameArea("player_2")
    game_2 = new GameArea("player_1")
    game_1.start()
    game_2.start()

    player_1 = new Player(config_p1.name,config_p1.color,config_p1.bodyColor,game_1.context)
    player_1.spawn()
    player_2 = new Player(config_p2.name,config_p2.color,config_p2.bodyColor,game_2.context)
    player_2.spawn()

    food_1 = new Food(game_1.context)
    food_2 = new Food(game_2.context)

    PlayPause_DP(lvls)


    refresh_p1(lvls)
    refresh_p2(lvls)

}

function PlayPause_DP(lvls) {
    document.getElementById("pause_player_1").addEventListener('click',()=>{
        document.getElementById("play_player_1").style.display = "block"
        document.getElementById("pause_player_1").style.display = "none"
        clearInterval(refreshGame_1)
    })

    document.getElementById("play_player_1").addEventListener('click',()=>{
        document.getElementById("play_player_1").style.display = "none"
        document.getElementById("pause_player_1").style.display = "block"
        refresh_p1(lvls)
    })

    document.getElementById("pause_player_2").addEventListener('click',()=>{
        document.getElementById("play_player_2").style.display = "block"
        document.getElementById("pause_player_2").style.display = "none"
        clearInterval(refreshGame_2)
    })

    document.getElementById("play_player_2").addEventListener('click',()=>{
        document.getElementById("play_player_2").style.display = "none"
        document.getElementById("pause_player_2").style.display = "block"
        refresh_p2(lvls)
    })
}

function getDualKeyPress(lvls) {
    window.onkeydown = (event) => {
        switch (event.key.toUpperCase()) {
            case "W":
                player_2.setDir("UP")
                break;
            case "A":
                player_2.setDir("LEFT");
                break;
            case "S":
                player_2.setDir("DOWN");
                break;
            case "D":
                player_2.setDir("RIGHT");
                break;
            case "ARROWUP":
                player_1.setDir("UP")
                break;
            case "ARROWLEFT":
                player_1.setDir("LEFT");
                break;
            case "ARROWDOWN":
                player_1.setDir("DOWN");
                break;
            case "ARROWRIGHT":
                player_1.setDir("RIGHT");
                break;
            case "R":
                player_2.restart()
                game_2.restart()
                clearInterval(refreshGame_2)
                refresh_p2(lvls)
                break;
            case "DELETE":
                player_1.restart()
                game_1.restart()
                clearInterval(refreshGame_1)
                refresh_p1(lvls)
                break;
            case ".":
                player_1.restart()
                game_1.restart()
                clearInterval(refreshGame_1)
                refresh_p1(lvls)
                break;
        }
    }
}

function refresh_p1(lvls) {
    refreshGame_1 = setInterval(()=>{
        game_1.clear()
        food_1.spawn()
        player_1.move(lvls[game_1.lvl].vel)
        let b_l_x
        let b_l_y
        player_1.bodies.forEach((body,index) => {
            if (index == 0) {
                body.move(player_1.l_x,player_1.l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            } else {
                body.move(b_l_x,b_l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            }
            if (player_1.x == body.x-10 && player_1.y == body.y-10) {
                player_1.die()
                clearInterval(refreshGame_1)
            }
            
        });
        if (player_1.x == food_1.x && player_1.y == food_1.y) {
            player_1.addBody()
            food_1.changePosition()
            game_1.addScore()
            clearInterval(refreshGame_1)
            refresh_p1(lvls)
            
        }
        if(player_1.dead == true){
            player_1.die()
            clearInterval(refreshGame_1)
        }
    }, lvls[game_1.lvl].fps)
}

function refresh_p2(lvls) {
    refreshGame_2 = setInterval(()=>{
        game_2.clear()
        food_2.spawn()
        player_2.move(lvls[game_2.lvl].vel)
        let b_l_x
        let b_l_y
        player_2.bodies.forEach((body,index) => {
            if (index == 0) {
                body.move(player_2.l_x,player_2.l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            } else {
                body.move(b_l_x,b_l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            }
            if (player_2.x == body.x-10 && player_2.y == body.y-10) {
                player_2.die()
                clearInterval(refreshGame_2)
            }
            
        });
        if (player_2.x == food_2.x && player_2.y == food_2.y) {
            player_2.addBody()
            food_2.changePosition()
            game_2.addScore()
            clearInterval(refreshGame_2)
            refresh_p2(lvls)
            
        }
        if(player_2.dead == true){
            player_2.die()
            clearInterval(refreshGame_2)
        }
    }, lvls[game_2.lvl].fps)
}