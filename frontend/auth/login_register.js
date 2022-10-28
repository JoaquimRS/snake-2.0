function loadLogin() {
    // const _auth = new authService
    let loginContainer = document.getElementById("login")
    let registerContainer = document.getElementById("register")
    loginContainer.style.display = "block"
    registerContainer.style.display = "none"
    let registerButton = document.getElementById("login_register")
    let loginButton = document.getElementById("login_login")
    let user = document.getElementById("log_user")
    let password = document.getElementById("log_password")
    let log_error = document.getElementById("log_error")
    

    loginButton.addEventListener("click",async () => {
        let userInfo = {
            user: user.value,
            password: btoa(password.value)
        }
        let userLogin = await login(userInfo)
        
        if (Object.keys(userLogin).length) {
            if(!userLogin.msg) {
                localStorage.setItem("token",btoa(JSON.stringify(userLogin)))
                window.location.replace(window.location.origin + "/frontend/index.html")   
            } else {
                log_error.textContent = "Usuario o contraseña incorrecto"
            }

        } else {
            log_error.textContent = "Usuario o contraseña incorrecto"
        }
    })


    registerButton.addEventListener("click",()=>{
        loadRegister()
    })
}

function loadRegister() {
    let loginContainer = document.getElementById("login")
    let registerContainer = document.getElementById("register")
    loginContainer.style.display = "none"
    registerContainer.style.display = "block"
    let registerButton = document.getElementById("register_register")
    let loginButton = document.getElementById("register_login")
    let user = document.getElementById("reg_user")
    let password = document.getElementById("reg_password")
    let repassword = document.getElementById("reg_re_password")
    let reg_error = document.getElementById("reg_error")

    registerButton.addEventListener("click",async () => {
        let userInfo = {
            user: user.value,
            password: btoa(password.value)
        }
        if (userInfo.password == btoa(repassword.value)) {
            reg_error.textContent = ""
            let userRegister = await register(userInfo)
            console.log(userRegister);
            if (!userRegister.errors) {
                localStorage.setItem("token",btoa(JSON.stringify(userRegister)))
                window.location.replace(window.location.origin + "/frontend/index.html")        
            } else {
                reg_error.textContent = "Usuario o contraseña incorrecto"
            }

        } else {
            reg_error.textContent = "Contraseñas no coinciden"
        }
    })

    loginButton.addEventListener("click",()=>{
        loadLogin()
    })
}

function loadAuth() {
    loadLogin()
    

    
}