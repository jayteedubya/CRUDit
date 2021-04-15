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
    return body;
}

const getCommentBody = () => {
    const comment = {
        comment: stringPrep(document.getElementById("comment").value),
        postID: document.getElementById("postID").value
    };
    document.getElementById("comment").value = '';
    return comment;
}

const validateUsername = (username) => {
    if (/^[a-zA-Z0-9]$/.test(username)) {
        return username;
    }
    alert("username must be alphanumeric or one of these symbols: _ ! ? &");
    return false;
}

const validatePassword = (password, confirmPassword) => {
    if (/[a-zA-Z0-9\_\!\?\&]/.test(password) && password.length > 7 && password === confirmPassword) {
        return password;
    }
    alert("password must be alphanumeric or one of these symbols: _ ! ? & and at least 8 characters");
    return false;
}

const getNewUserInfo = () => {
    const username = validateUsername(document.getElementById("username"));
    const password = validatePassword(document.getElementById("password"), document.getElementById("confirm-password"));
    if (username && password) {
        return {
            username: username,
            password: password
        };
    }
    return false;
}

const deletePost = async () => {
    const requestParameters = {
        method: 'DELETE',
        credentials: 'include'
    }
    try {
        const result = await fetch(window.location.href, requestParameters);
        console.log(result);
        window.location.assign('/');
        return;
    }
    catch (err) {
        console.warn(err);
        return;
    }
}

const editPost = async () => {
    const edit = prompt('make your edit here!', document.getElementById("body").value);
    const body = JSON.stringify({'postbody': stringPrep(edit)});
    const headers = {
        'Access-Control-Allow-Origin': 'https://crudit.herokuapp.com',
        origin: 'https://crudit.herokuapp.com',
        'content-type': 'application/json'
    }
    const requestParameters = {
        method: 'PUT',
        credentials: 'include',
        headers: headers,
        body: body
    }
    try {
        const result = await fetch(window.location.href, requestParameters);
        console.log(result);
        window.location.reload();
        return;
    }
    catch (err) {
        console.warn(err);
        return;
    }
}

const submitPost = async () => {
    const body = getPostBody();
    if (!body.title) {
        alert("empty titles are not allowed");
        return;
    }
    const requestParameters = {
        method: 'POST',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        redirect: "follow",
        body: JSON.stringify(body)
    }
    try {
        const result = await fetch(window.location.href, requestParameters);
        console.log(result);
        return;
    }
    catch (err) {
        console.warn(err);
        return;
    }
}

const submitComment = async () => {
    const comment = getCommentBody();
    if (!comment.comment) {
        alert("empty comments are not allowed"); 
        return;
    }
    const requestParameters = {
        method: 'POST',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(comment),
        redirect: "follow"
    };  
    try {
        const result = await fetch('/submit/comment', requestParameters);
        console.log(result);
        window.location.reload();
        return;
    }
    catch (err) {
        console.warn(err);
        return;
    }
}

const editComment = async (id) => {
    const edit = prompt('make your edit here!', document.getElementById(`${id}`).value);
    const body = JSON.stringify({'commentbody': stringPrep(edit)});
    const headers = {
        'Access-Control-Allow-Origin': 'https://crudit.herokuapp.com',
        origin: 'https://crudit.herokuapp.com',
        'content-type': 'application/json'
    }
    const requestParameters = {
        method: 'PUT',
        credentials: 'include',
        headers: headers,
        body: body
    }
    try {
        const result = await fetch(`/submit/comment/${id}`, requestParameters);
        console.log(result);
        window.location.reload();
        return;
    }
    catch (err) {
        console.warn(err);
        return;
    }
}

const deleteComment = async (id) => {
    const requestParameters = {
        method: 'DELETE',
        credentials: 'include'
    }
    try {
        const result = await fetch(`/submit/comment${id}`, requestParameters);
        console.log(result);
        window.location.reload();
        return;
    }
    catch (err) {
        console.warn(err);
        return;
    }
}

const createUser = async () => {
    console.log("creating user!");
    const body = getNewUserInfo();
    if (!body) {
        console.log("body undefined/false");
        return;
    }
    const requestParams = {
        method: 'POST',
        credentials: 'include',
        redirect: 'follow',
        headers: {'content-type': 'application/json'},
        body: body
    }
    try {
        console.log("submitting to server");
        const result = await fetch('/auth/sign-up', requestParams);
        console.log(result);
        return;
    }
    catch (err) {
        console.warn(err);
        return;
    }
}


