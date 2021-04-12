const stringPrep = (string) => {
    const formattedString = string.replaceAll("'", "''").replaceAll(`"`, `\"`);
    return formattedString;
}

const getPostBody = () => {
    const body = {
        title: stringPrep(document.getElementById("title").value),
        topic: stringPrep(document.getElementById("topic").value.replaceAll(' ', '-')),
        post: stringPrep(document.getElementById("post").value)
    }
    if (!body.title) {
        alert("empty titles are not allowed");
        return;
    }
    return body;
}

const deletePost = async () => {
    const result = await fetch(window.location.href, {
        method: 'DELETE',
        credentials: 'include',
    });
    window.location.assign('/');
    return;
}
const editPost = async () => {
    const edit = prompt('make your edit here!', document.getElementById("body").value);
    let body = {'postbody': stringPrep(edit)}
    body = JSON.stringify(body);
    const result = await fetch(window.location.href, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': 'https://crudit.herokuapp.com',
            origin: 'https://crudit.herokuapp.com',
            'Access-Control-Allow-Credentials': true,
            'content-type': 'application/json'

        }, //when including credentials, access control allow origin must be set, cors thing
        body: body
    });
    console.log(result);
    window.location.reload();
}
const submitPost = async () => {
    const requestParameters = {
        method: 'POST',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        redirect: "follow",
        body: JSON.stringify(getPostBody())
    }
    try {
        const result = await fetch(window.location.href, requestParameters);
        console.log(result);
        window.location.assign(result.url);
    }
    catch(err) {
        console.warn(err);
        return;
    }
}



