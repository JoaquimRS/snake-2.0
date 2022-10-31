let cop_game
let cop_player_1
let cop_player_2  
let cop_food_1
let cop_food_2
let cop_refreshGame

async function cooperativePlayers() {
    const config_p1 = await configPlayer("1","COOPERATIVE_PLAYER")
    const config_p2 = await configPlayer("2","COOPERATIVE_PLAYER")
    
    getCopKeyPress(lvls)

    cop_game = new GameArea("player",config_p2.name)
    cop_game.start()

    cop_player_1 = new Player(config_p1.name,config_p1.color,config_p1.bodyColor,cop_game.context)
    cop_player_1.spawn()
    cop_player_2 = new Player(config_p2.name,config_p2.color,config_p2.bodyColor,cop_game.context)
    cop_player_2.spawnSecond()

    cop_food_1 = new Food(cop_game.context)
    cop_food_2 = new Food(cop_game.context)

    CopPlayPause(lvls)

    cop_refresh(lvls)
}

function CopPlayPause(lvls) {
    document.getElementById("pause_player").addEventListener('click',()=>{
        document.getElementById("play_player").style.display = "block"
        document.getElementById("pause_player").style.display = "none"
        clearInterval(cop_refreshGame)
    })

    document.getElementById("play_player").addEventListener('click',()=>{
        document.getElementById("play_player").style.display = "none"
        document.getElementById("pause_player").style.display = "block"
        cop_refresh(lvls)
    })
}

function getCopKeyPress(lvls) {
    window.onkeydown = (event) => {
        switch (event.key.toUpperCase()) {
            case "W":
                cop_player_1.setDir("UP")
                break;
            case "A":
                cop_player_1.setDir("LEFT");
                break;
            case "S":
                cop_player_1.setDir("DOWN");
                break;
            case "D":
                cop_player_1.setDir("RIGHT");
                break;
            case "ARROWUP":
                cop_player_2.setDir("UP")
                break;
            case "ARROWLEFT":
                cop_player_2.setDir("LEFT");
                break;
            case "ARROWDOWN":
                cop_player_2.setDir("DOWN");
                break;
            case "ARROWRIGHT":
                cop_player_2.setDir("RIGHT");
                break;
            case "R":
                clearInterval(cop_refreshGame)
                cop_player_2.restartSecond()
                cop_player_1.restart()
                cop_game.restart()
                cop_refresh(lvls)
                break;
            case "DELETE":
                clearInterval(cop_refreshGame)
                cop_player_2.restartSecond()
                cop_player_1.restart()
                cop_game.restart()
                cop_refresh(lvls)
                break;
            case ".":
                clearInterval(cop_refreshGame)
                cop_player_2.restartSecond()
                cop_player_1.restart()
                cop_game.restart()
                cop_refresh(lvls)
                break;
        }
    }
}

function cop_refresh(lvls) {
    cop_refreshGame = setInterval(()=>{
        cop_game.clear()
        cop_food_1.spawn()
        cop_food_2.spawn()
        cop_player_1.move(lvls[cop_game.lvl].vel)
        cop_player_2.move(lvls[cop_game.lvl].vel)
        let b_l_x
        let b_l_y
        let w_b_p = []
    
        w_b_p.push({x:cop_player_1.x,y:cop_player_1.y})

        //P_1 BODIES
        cop_player_1.bodies.forEach((body,index) => {
            if (index == 0) {
                body.move(cop_player_1.l_x,cop_player_1.l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            } else {
                body.move(b_l_x,b_l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            }
            if (cop_player_1.x == body.x-10 && cop_player_1.y == body.y-10) {
                cop_player_1.die()
                cop_player_2.die()
                clearInterval(cop_refreshGame)
            }
            w_b_p.push({x:body.x-10,y:body.y-10})
        });

        //P_2 >>> P_1 & P_1.BODIES
        w_b_p.forEach((w_p) => {
            if (cop_player_2.x == w_p.x && cop_player_2.y == w_p.y) {
                cop_player_1.die()
                cop_player_2.die()
                clearInterval(cop_refreshGame) 
            }
        });

        //P_2 BODIES
        cop_player_2.bodies.forEach((body,index) => {
            if (index == 0) {
                body.move(cop_player_2.l_x,cop_player_2.l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            } else {
                body.move(b_l_x,b_l_y)
                b_l_x=body.l_x
                b_l_y=body.l_y
            }
            if (cop_player_2.x == body.x-10 && cop_player_2.y == body.y-10) {
                cop_player_1.die()
                cop_player_2.die()
                clearInterval(cop_refreshGame)
            }
            //P_2.BODIES >>> P_1 & P_1.BODIES
            w_b_p.forEach((w_p) => {
                if (body.x == w_p.x+10 && body.y == w_p.y+10) {
                    cop_player_1.die()
                    cop_player_2.die()
                    clearInterval(cop_refreshGame)
                }
            });
        });

        //FOOD P_1
        if (cop_player_1.x == cop_food_1.x && cop_player_1.y == cop_food_1.y ) {
            cop_player_1.addBody()
            cop_food_1.changePosition()
            cop_game.addScore()
            clearInterval(cop_refreshGame)
            cop_refresh(lvls)   
        }
        if (cop_player_1.x == cop_food_2.x && cop_player_1.y == cop_food_2.y ) {
            cop_player_1.addBody()
            cop_food_2.changePosition()
            cop_game.addScore()
            clearInterval(cop_refreshGame)
            cop_refresh(lvls)   
        }

        //FOOD P_2
        if (cop_player_2.x == cop_food_1.x && cop_player_2.y == cop_food_1.y ) {
            cop_player_2.addBody()
            cop_food_1.changePosition()
            cop_game.addScore()
            clearInterval(cop_refreshGame)
            cop_refresh(lvls)   
        }
        if (cop_player_2.x == cop_food_2.x && cop_player_2.y == cop_food_2.y ) {
            cop_player_2.addBody()
            cop_food_2.changePosition()
            cop_game.addScore()
            clearInterval(cop_refreshGame)
            cop_refresh(lvls)   
        }
        
        //DEAD PLAYERS
        if(cop_player_1.dead == true){
            cop_player_1.die()
            cop_player_2.die()
            clearInterval(cop_refreshGame)
        }
        if(cop_player_2.dead == true){
            cop_player_1.die()
            cop_player_2.die()
            clearInterval(cop_refreshGame)
        }
    }, lvls[cop_game.lvl].fps)
}