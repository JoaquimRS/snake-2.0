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