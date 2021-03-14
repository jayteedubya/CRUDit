import * as pg from 'pg';

class Table {
    getNewClient() {
        return new pg.Client();
    }
    async makeQuery(query: string) {
        const client = this.getNewClient();
        client.connect();
        let queryResult;
        try {
            queryResult = await client.query(`${query}`);
        }
        catch(err) {
            console.warn(err);
            console.log('QUERY: ' + query);
        }
        client.end();
        return queryResult;
    }
}

class Posts extends Table {
    initialize() {
        const startQuery = 'CREATE TABLE posts (\
        id SERIAL PRIMARY KEY,\
        title VARCHAR(100) NOT NULL,\
        topic VARCHAR(30),\
        comments INTEGER[],\
        upvotes INTEGER DEFAULT 0,\
        time_stamp DATE NOT NULL DEFAULT NOW(),\
        body VARCHAR(5000),\
        user_id INTEGER REFERENCES users(id));'
        return this.makeQuery(startQuery);
    }
    getAllOrderedByDate() {
        const query = 'SELECT *\
        FROM posts\
        ORDER BY time_stamp DESC;'
        return this.makeQuery(query)
    }
    getAllOrderedByRank() {
        const query = 'SELECT *\
        FROM posts\
        ORDER BY upvotes DESC;'
        return this.makeQuery(query);
    }
    getAllByTopic(topic: string) {
        const query = `SELECT *\
        FROM posts\
        WHERE topic = ${topic};`
        return this.makeQuery(query);
    }
    getPostById(post_id: number) {
        const query = `SELECT *\
        FROM posts\
        WHERE id = ${post_id};`;
        return this.makeQuery(query);
    }
    createPost(title: string, topic: string, body: string, user_id: number) {
        const query = `INSERT INTO posts (title, topic, body, user_id)\
        VALUES (${title}, ${topic}, ${body}, ${user_id});`;
        return this.makeQuery(query);
    }
    editPost(body: string, post_id: number) {
        const query = `UPDATE posts\
        SET body = ${body}\
        WHERE id = ${post_id};`;
        return this.makeQuery(query);
    }
    deletePost(post_id: number) {
        const query = `DELETE FROM posts\
        WHERE id = ${post_id};`;
        return this.makeQuery(query);
    }
}

class Comments extends Table {
    initialize() {
        const startQuery = 'CREATE TABLE comments (\
        id SERIAL PRIMARY KEY,\
        user_id INTEGER REFERENCES users(id),\
        body VARCHAR(1000),\
        time_stamp DATE NOT NULL DEFAULT NOW(),\
        post_id INTEGER REFERENCES posts(id),\
        parent INTEGER);';
        return this.makeQuery(startQuery);
    }
    createComment(user_id: number, body: string, post_id: number) {
        const query = `INSERT INTO comments (user_id, body, post_id)\
        VALUES (${user_id}, ${body}, ${post_id});`;
        return this.makeQuery(query);
    }
    editComment(id: number, body: string) {
        const query = `UPDATE comments\
        SET body = ${body}\
        WHERE id = ${id};`;
        return this.makeQuery(query);
    }
    deleteComment(id: number) {
        const query = `DELETE FROM posts\
        WHERE id = ${id};`;
        return this.makeQuery(query);
    }
    getCommmentsByPostId(post_id: number) {
        const query = `SELECT *\
        FROM comments\
        WHERE post_id = ${post_id};`;
        return this.makeQuery(query);
    }
    getAllCommentsByUser(user_id: number) {
        const query = `SELECT *\
        FROM comments\
        WHERE user_id = ${user_id};`;
        return this.makeQuery(query);
    }
}

class Users extends Table {
    initialize() {
        const startQuery = 'CREATE TABLE users(\
        id SERIAL PRIMARY KEY,\
        user_name VARCHAR(40) NOT NULL,\
        email VARCHAR(120),\
        upvoted INTEGER[],\
        downvoted INTEGER[],\
        password TEXT);';
        this.makeQuery(startQuery)
    }
    getUserPublicInfo(user_id: number) {
        const query = `SELECT user_name, upvoted, downvoted\
        FROM users\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    getUserIdFromUserName(user_name: string) {
        const query = `SELECT id\
        FROM users\
        WHERE user_name = ${user_name};`;
        return this.makeQuery(query);
    }
    getPasswordByUserId(user_id: number) {
        const query = `SELECT password\
        FROM users\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    getUserFullInfo(user_id: number) {
        const query = `SELECT *\
        FROM users\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    createUser(user_name: string, email: string, password: string) {
        const query = `INSERT INTO users (user_name, email, password)\
        VALUES (${user_name}, ${email}, ${password});`;
        return this.makeQuery(query);
    }
    changePassword(user_id: number, newPassword: string) {
        const query = `UPDATE users\
        SET password = ${newPassword}\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    updateEmail(user_id: number, newEmail: string) {
        const query = `UPDATE users\
        SET email = ${newEmail}\
        WHERE id = ${user_id};`;
        return this.makeQuery(query)
    }
    changeUserName(user_id: number, newUserName: string) {
        const query = `UPDATE users\
        SET user_name = ${newUserName}\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    deleteUser(user_id: number) {
        const query = `DELETE FROM users\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
}

export default {Posts, Users, Comments, Table};