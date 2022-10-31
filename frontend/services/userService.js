function users(uuid) {
    let url = 'http://ximo.com:3000/users/'+uuid
    return get(url).then(response => {return response})
}

function userAddScore(uuid) {
    let url = 'http://ximo.com:3000/users/add/'+uuid
    return get(url).then(response => {return response})
}

function userResetScore(uuid) {
    let url = 'http://ximo.com:3000/users/reset/'+uuid
    return get(url).then(response => {return response})
}

//COOPERATIVE

function cop_users(uuid) {
    let url = 'http://ximo.com:3000/cooperative/'+uuid
    return get(url).then(response => {return response})
}

function cop_userAddScore(uuid) {
    let url = 'http://ximo.com:3000/cooperative/add/'+uuid
    return get(url).then(response => {return response})
}

function cop_userResetScore(uuid) {
    let url = 'http://ximo.com:3000/cooperative/reset/'+uuid
    return get(url).then(response => {return response})
}