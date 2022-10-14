function menu() {  
    let main = document.createElement("div")
    let menu = document.createElement("div")
    let container = document.createElement("div")
    let containerInner = document.createElement("div")
    let circle = document.createElement("img")
    let img = document.createElement("img")
    let text = document.createElement("p")
    let dp_container = document.createElement("div")
    let dp_containerInner = document.createElement("div")
    let dp_circle = document.createElement("img")
    let dp_img = document.createElement("img")
    let dp_img_2 = document.createElement("img")
    let text2 = document.createElement("p")

    main.className = "main"
    menu.className = "menu"
    container.className = "container"
    containerInner.className = "container-inner"
    circle.className = "circle"
    circle.src = "./img/Fondo.png"
    img.className = "img img1"
    img.src = "./img/Player.png"
    text.className = "player"
    text.appendChild(document.createTextNode("1 Player"))

    dp_container.className = "container"
    dp_containerInner.className = "container-inner"
    dp_circle.className = "circle"
    dp_circle.src = "./img/Fondo.png"
    dp_img.className = "img dp_img1"
    dp_img.src = "./img/Player.png"
    dp_img_2.className="img dp_img2"
    dp_img_2.src = "./img/Player_2.png"
    text2.className = "players"
    text2.appendChild(document.createTextNode("2 Players"))

    document.body.insertBefore(main, document.body.childNodes[0])
    main.appendChild(menu)
    
    menu.appendChild(container)
    container.appendChild(containerInner)
    containerInner.appendChild(circle)
    containerInner.appendChild(img)
    containerInner.appendChild(text)

    menu.appendChild(dp_container)
    dp_container.appendChild(dp_containerInner)
    dp_containerInner.appendChild(dp_circle)
    dp_containerInner.appendChild(dp_img)
    dp_containerInner.appendChild(dp_img_2)
    dp_containerInner.appendChild(text2)

    container.addEventListener('click',()=>{
        main.remove()
        singlePlayer()
    })

    dp_container.addEventListener('click',()=>{
        main.remove()
        dualPlayers()
    })


}

function startGame() {
//    battle()
    menu()
}
