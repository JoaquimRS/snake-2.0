function configPlayer(player = "",mode = "") {
    let config = {name: "",color: "",lvl: "",bodyColor: ""}
    return new Promise(resolve => {
        
        let configMenu = document.createElement("div")
        let title = document.createElement('h1');
        let container = document.createElement('div');
        let nameContainer = document.createElement('div');
        let name = document.createElement('input');
        let colorContainer = document.createElement('div');
        let colorLabel = document.createElement('label');
        let color = document.createElement('input');
        let bodyColorContainer = document.createElement('div');
        let bodyColorLabel = document.createElement('label');
        let bodyColorSpan = document.createElement('span')
        let bodyColor = document.createElement('input');
        let playDiv = document.createElement('div')
        let playButton = document.createElement('button');


        configMenu.className = "config-menu"
        if (player) {
            title.appendChild(document.createTextNode("Player " + player + " Configuration"))
        } else {
            title.appendChild(document.createTextNode("Player Configuration"))
        }
        container.className = "container-menu"
        name.className = "name-input"
        name.type = "text"
        
        try {
            if (!player) {
                let infoUser = JSON.parse(atob(localStorage.getItem("token")))
                if (infoUser) {
                    name.value = infoUser.user
                    name.setAttribute("readonly", "readonly")
                    name.className = "name-input invalid"
                } 
            }
            if (mode == "COOPERATIVE_PLAYER") {
                if (player == "1" && localStorage.getItem("token")) {
                    let infoUser = JSON.parse(atob(localStorage.getItem("token")))
                    if (infoUser) {
                        name.value = infoUser.user
                        name.setAttribute("readonly", "readonly")
                        name.className = "name-input invalid"
                    }
                }
            }
        } catch (error) {
            
        }
        name.placeholder = "Name"
        name.maxLength = "16"
        colorContainer.className = "color-container"
        colorLabel.appendChild(document.createTextNode("Color"))
        colorLabel.htmlFor = "color-input"
        colorLabel.className = "color-label"
        color.id = "color-input"
        color.className = "color-input"
        color.type = "color"
        player == "2" ? color.value = "#0000ff" : color.value = "#ff0000"
        playButton.appendChild(document.createTextNode("PLAY"))
        
        bodyColorContainer.className = "color-container"
        bodyColorLabel.appendChild(document.createTextNode("Boby Color"))
        bodyColorLabel.htmlFor = "color-input"
        bodyColorLabel.className = "color-label"
        bodyColorSpan.className = "body-color-span"
        bodyColor.id = "color-input"
        bodyColor.className = "body-color-input"
        bodyColor.type = "color"
        player == "2" ? bodyColor.value = "#0000ff" : bodyColor.value = "#ff0000"
        bodyColorSpan.style.backgroundColor = bodyColor.value
        playDiv.className = "play-div"


        
        document.body.insertBefore(configMenu, document.body.childNodes[0]);
        configMenu.appendChild(title)
        configMenu.appendChild(container)
        container.appendChild(nameContainer)
        nameContainer.appendChild(name)
        container.appendChild(colorContainer)
        colorContainer.appendChild(colorLabel)
        colorContainer.appendChild(color)
        container.appendChild(bodyColorContainer)
        bodyColorContainer.appendChild(bodyColorLabel)
        bodyColorContainer.appendChild(bodyColorSpan)
        bodyColorContainer.appendChild(bodyColor)
        configMenu.appendChild(playDiv)
        playDiv.appendChild(playButton)
        
        bodyColorSpan.addEventListener("click",()=>{
            bodyColor.click()        
        })
        
        bodyColor.addEventListener("change",()=>{
            bodyColorSpan.style.backgroundColor = bodyColor.value
        })

        playButton.addEventListener("click",()=>{
            config = {
                name: name.value,
                color: color.value,
                bodyColor: bodyColor.value
            }
            configMenu.remove()
            resolve(config)
        })
    })


}