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
    let dp_text = document.createElement("p")
    let dp_img = document.createElement("img")
    let dp_img_2 = document.createElement("img")
    let text2 = document.createElement("p")
    let cop_dp_container = document.createElement("div")
    let cop_dp_containerInner = document.createElement("div")
    let cop_dp_circle = document.createElement("img")
    let cop_dp_img = document.createElement("img")
    let cop_dp_img_2 = document.createElement("img")
    let cop_text2 = document.createElement("p")
    

    main.className = "main"
    menu.className = "menu"
    container.className = "container"
    containerInner.className = "container-inner"
    circle.className = "circle"
    circle.src = "./img/Fondo.png"
    img.className = "img img1"
    img.src = "./img/Player.png"
    text.className = "player"
    text.appendChild(document.createTextNode("Classic"))

    dp_container.className = "container"
    dp_containerInner.className = "container-inner"
    dp_circle.className = "circle"
    dp_circle.src = "./img/Fondo.png"
    dp_img.className = "img dp_img1"
    dp_img.src = "./img/Player.png"
    dp_img_2.className="img dp_img2"
    dp_img_2.src = "./img/Player_2.png"
    dp_text.textContent = "VS"
    dp_text.className = "dp-text"
    text2.className = "players"
    text2.appendChild(document.createTextNode("Competitive"))

    cop_dp_container.className = "container"
    cop_dp_containerInner.className = "container-inner"
    cop_dp_circle.className = "circle"
    cop_dp_circle.src = "./img/Fondo.png"
    cop_dp_img.className = "img cop_dp_img1"
    cop_dp_img.src = "./img/Player.png"
    cop_dp_img_2.className="img cop_dp_img2"
    cop_dp_img_2.src = "./img/Player_2.png"
    cop_text2.className = "players"
    cop_text2.appendChild(document.createTextNode("Cooperative"))

    document.body.insertBefore(main, document.body.childNodes[0])
    main.appendChild(menu)
    
    menu.appendChild(container)
    container.appendChild(containerInner)
    containerInner.appendChild(circle)
    containerInner.appendChild(img)
    containerInner.appendChild(text)

    menu.appendChild(cop_dp_container)
    cop_dp_container.appendChild(cop_dp_containerInner)
    cop_dp_containerInner.appendChild(cop_dp_circle)
    cop_dp_containerInner.appendChild(cop_dp_img)
    cop_dp_containerInner.appendChild(cop_dp_img_2)
    cop_dp_containerInner.appendChild(cop_text2)

    menu.appendChild(dp_container)
    dp_container.appendChild(dp_containerInner)
    dp_containerInner.appendChild(dp_circle)
    dp_containerInner.appendChild(dp_img)
    dp_container.appendChild(dp_text)
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

    cop_dp_container.addEventListener('click',()=>{
        main.remove()
        cooperativePlayers()
    })


}

function userExist(userInfo) {
    let userImage = document.getElementById('user_image');
    let logout = document.createElement("img")

    userImage.src = userInfo.img
    logout.src = "./img/logout.png"
    logout.className = "logout"
    document.body.insertBefore(logout, document.body.childNodes[0]);

    userImage.addEventListener("click",() => {
        window.location.replace(window.location.origin + "/frontend/ranking.html")
    })

    logout.addEventListener("click",()=> {
        localStorage.removeItem("token")
        window.location.reload()
    })
}

function startGame() {
    menu()
    if (localStorage.getItem("token")) {
        userExist(JSON.parse(atob(localStorage.getItem("token"))))    
    } else {
        document.getElementById("user_image").addEventListener("click",() => {
            window.location.replace(window.location.origin + "/frontend/auth.html")
        })
    }
}

async function loadRanking() {
    let back = document.getElementById("back")
    let game_mode = document.getElementById("game_mode")
    back.addEventListener("click",() => {
        window.location.replace(window.location.origin + "/frontend/index.html")
    })
    game_mode.addEventListener("click",() =>{
        game_mode.src = "./img/classic.png"
        loadCopRanking()
    })
    let ranking_users = await usersRanking()
    UpdateRanking(ranking_users)
    
}

async function loadCopRanking() {
    let game_mode = document.getElementById("game_mode")
    game_mode.addEventListener("click",() =>{
        game_mode.src = "./img/cooperative.png"
        loadRanking()
    })
    let ranking_users = await copUsersRanking()
    UpdateRanking(ranking_users)
}

function UpdateRanking(ranking_users) {
    let ranking = document.getElementById("ranking")
    let userToken
    if (localStorage.getItem("token")) {
        userToken = (JSON.parse(atob(localStorage.getItem("token"))))    
    }

    while (ranking.firstChild) {
        ranking.removeChild(ranking.lastChild);
    }
    let header = document.createElement("li")
    let user = document.createElement("p")
    let points = document.createElement("p")    

    header.className = "header"
    user.textContent = "USER"
    points.textContent = "POINTS"

    ranking.appendChild(header)
    header.append(user,points)
    
    
    ranking_users.forEach((userRanking,i) => {
        let li = document.createElement("li")
        let user = document.createElement("p")
        let points = document.createElement("p")
        user.textContent = (i+1)+" "+userRanking.user
        points.textContent = userRanking.maxscore
        if (userRanking.user == userToken.user) {
            li.className = "current-user"
        }
        if ((userRanking.user).includes(userToken.user)) {
            li.className = "current-user"
        }
        

        li.append(user,points)
        ranking.appendChild(li)       
    });
}