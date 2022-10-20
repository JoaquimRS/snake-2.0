function loadLogin() {
    let login = document.getElementById("login")
    let register = document.getElementById("register")
    login.style.display = "block"
    register.style.display = "none"
    let registerButton = document.getElementById("login_register")
    let loginButton = document.getElementById("login_login")
    let user = document.getElementById("log_user")
    let password = document.getElementById("log_password")
    

    
    let users = [
        {
            uuid: "1",
            user: "Donyet",
            password: btoa("asdf"),
            img: "1.png"
        },
        {
            uuid: "2",
            user: "gfmois",
            password: btoa("asdf"),
            img: "2.png"
        }
    ]
    loginButton.addEventListener("click",() => {
        let userInfo = {
            user: user.value,
            password: btoa(password.value)
        }
        users.map(user => {
            if (userInfo.user == user.user && userInfo.password == user.password) {
                localStorage.setItem("token",btoa(JSON.stringify(user)))
                window.location.replace(window.location.origin + "/index.html")
            }
        })
    })


    registerButton.addEventListener("click",()=>{
        loadRegister()
    })
}

function loadRegister() {
    let login = document.getElementById("login")
    let register = document.getElementById("register")
    login.style.display = "none"
    register.style.display = "block"
    let loginButton = document.getElementById("register_login")

    loginButton.addEventListener("click",()=>{
        loadLogin()
    })
}

function loadAuth() {
    loadLogin()
    

    
}