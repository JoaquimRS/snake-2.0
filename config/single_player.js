let game
let player  
let food
let refreshGame

function configPlayer() {
    let config = {name: "",color: "",lvl: "",bodyColor: ""}
    let configMenu = document.createElement("div")
    let title = document.createElement('h1');
    let container = document.createElement('div');
    let name = document.createElement('input');
    let colorContainer = document.createElement('div');
    let colorLabel = document.createElement('label');
    let color = document.createElement('input');
    let bodyColorContainer = document.createElement('div');
    let bodyColorLabel = document.createElement('label');
    let bodyColorSpan = document.createElement('span')
    let bodyColor = document.createElement('input');


    configMenu.className = "config-menu"
    title.appendChild(document.createTextNode("Player Configuration"))
    container.className = "container-menu"
    name.className = "name-input"
    name.type = "text"
    name.placeholder = "Name"
    name.maxLength = "16"
    colorContainer.className = "color-container"
    colorLabel.appendChild(document.createTextNode("Color"))
    colorLabel.htmlFor = "color-input"
    colorLabel.className = "color-label"
    color.id = "color-input"
    color.className = "color-input"
    color.type = "color"
    color.value = "#ff0000"
    
    bodyColorContainer.className = "color-container"
    bodyColorLabel.appendChild(document.createTextNode("Boby Color"))
    bodyColorLabel.htmlFor = "color-input"
    bodyColorLabel.className = "color-label"
    bodyColorSpan.className = "body-color-span"
    bodyColor.id = "color-input"
    bodyColor.className = "body-color-input"
    bodyColor.type = "color"
    bodyColor.value = "#ff0000"

    
    document.body.insertBefore(configMenu, document.body.childNodes[0]);
    configMenu.appendChild(title)
    configMenu.appendChild(container)
    container.appendChild(name)
    container.appendChild(colorContainer)
    colorContainer.appendChild(colorLabel)
    colorContainer.appendChild(color)
    container.appendChild(bodyColorContainer)
    bodyColorContainer.appendChild(bodyColorLabel)
    bodyColorContainer.appendChild(bodyColorSpan)
    bodyColorContainer.appendChild(bodyColor)

    bodyColorSpan.addEventListener("click",()=>{
        bodyColor.click()        
    })
    
    bodyColor.addEventListener("change",()=>{
        bodyColorSpan.style.backgroundColor = bodyColor.value
    })


}



function singlePlayer() {
    configPlayer() 

    // getKeyPress()
    
    // game = new GameArea("player")
    // game.start();

    // player = new Player("red",game.context)
    // player.spawn()
    
    // food = new Food(game.context)
    
    // PlayPause(lvls)

    // refresh(lvls)   
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
