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

const validateString = (string) => {
    const criteria = /^[a-zA-Z0-9\!\?\_\-\#]/;
    const stringArray = [...string];
    const filteredArray = stringArray.filter(item => criteria.test(item));
    return stringArray.join('') === filteredArray.join('');
}

const validatePassword = (password, confirmPassword) => {
    if (!validateString(password)) {
        alert("password must only contain alphanumeric characters or these symbols: ! ? _ - #");
        return;
    }
    if (!password.length > 7) {
        alert("password must be at least 8 characters long");
        return;
    }
    if (password !== confirmPassword) {
        alert("password and confirm password do not match");
        return;
    }
    return password;
}

const validateUsername = (username) => {
    if (!validateString(username)) {
        alert("password must only contain alphanumeric characters or the symbols ! ? _ - #");
        return;
    }
    return username;
}

const getNewUserInfo = () => {
    const username = validateUsername(document.getElementById("username").value);
    const password = validatePassword(document.getElementById("password").value, document.getElementById("confirm-password").value);
    if (username && password) {
        const user = {
            username: username,
            password: password
        };
        console.log(user);
        return user;
    }
    return;
}

const deletePost = async () => {
    const requestParameters = {
        method: 'DELETE',
        credentials: 'include',
        redirect: 'follow'
    }
    try {
        const result = await fetch(window.location.href, requestParameters);
        console.log(result);
        window.location.assign(result.url);
        return;
    }
    catch (err) {
        console.warn(err);
        return;
    }
}
const enableEdit = () => {
  document.getElementById("body").removeAttribute("readonly");
  document.getElementById("edit").innerText = "submit";
  document.getElementById("delete").remove();
  document.getElementById("edit").setAttribute("onclick", "editPost()");
}
const editPost = async () => {
    const edit = document.getElementById("body").value;
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
        window.location.assign(result.url);
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
    console.log(body);
    if (!body) {
        console.log("body undefined");
        return;
    }
    const requestParams = {
        method: 'POST',
        credentials: 'include',
        redirect: 'follow',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    }
    try {
        console.log("submitting to server");
        const result = await fetch('/auth/sign-up', requestParams);
        console.log(result);
        window.location.assign(result.url);
        return;
    }
    catch (err) {
        console.warn(err);
        return;
    }
}

/* place comment controls
1) get the username
2) wherever that username is, add comment controls
*/
const addCommentControls = async () => {
    const response = await fetch('/auth/api/who-am-i').then(response => response.json()).catch(err => console.error(err));
    const username = response.username.user_name;
    console.log(username);
    const comments = document.getElementsByClassName('comment-box');
    Array.from(comments).forEach(comment => {
        console.log(comment.getElementsByClassName('comment-author'));
        const id = comment.getElementsByClassName('comment-author')[0].dataset.id
        const controls = document.createElement('div');
        controls.setAttribute('class', 'post-control')
        controls.innerHTML(`<ul>
            <li><button class="post-control" onclick="deleteComment(${id})"> edit </button></li>
            <li><button class="post-control" onclick="editComment(${id})"> delete </button></li>
        </ul>`);
        let commentAuthor = comment.getElementsByClassName('comment-author')[0];
        console.log(commentAuthor);
        commentAuthor = commentAuthor.dataset.username;
        console.log(commentAuthor);
        if (commentAuthor === username) {
            comment.appendChild(controls);
        }
    });
}


