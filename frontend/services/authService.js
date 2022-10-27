// return get(url).then(response => {return response})
function login(userInfo) {
    let url = 'http://ximo.com:3000/auth/login'
    return post(url,userInfo).then(response => {return response})
}

function register(userInfo) {
    let url = 'http://ximo.com:3000/auth/register'
    return post(url,userInfo).then(response => {return response})
}