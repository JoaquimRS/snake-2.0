function post(url,data) {
    return fetch(url,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData;
        })
        .catch(error => console.warn(error));
}

function get(url) {
    return fetch(url,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            return responseData;
        })
        .catch(error => console.warn(error));
}