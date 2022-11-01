function usersRanking() {
    let url = 'http://ximo.com:3000/users/'
    return get(url).then(response => {return response})
}

function copUsersRanking() {
    let url = 'http://ximo.com:3000/cooperative/'
    return get(url).then(response => {return response})
}