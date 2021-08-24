import * as pg from 'pg';

class Table {
    getNewClient() {
        return new pg.Client({connectionString: process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}})
    }
    async makeQuery(query: string) {
        try {
            const client = this.getNewClient();
            await client.connect();
            const queryResult = await client.query(query);
            client.end();
            return queryResult.rows;
        }
        catch (err) {
            throw err;
        }
    }
    async makeParamQuery(query: string, values: string[]) {
        try {
            const client = this.getNewClient();
            await client.connect();
            const queryResult = await client.query(query, values);
            client.end();
            return queryResult.rows
        }
        catch (err) {
            throw(err);
        }
    }
}

class Posts extends Table {
    async initialize() {
        const startQuery = "CREATE TABLE posts (\
        id SERIAL PRIMARY KEY,\
        title VARCHAR(100) NOT NULL,\
        topic VARCHAR(30),\
        time_stamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),\
        body VARCHAR(5000),\
        user_name VARCHAR(40) REFERENCES users(user_name));"
        return await this.makeQuery(startQuery);
    }
    getAllOrderedByDate() {
        const query = 'SELECT *\
        FROM posts\
        ORDER BY time_stamp DESC;'
        return this.makeQuery(query);
    }
    getAllByTopic(topic: string) {
        const query = 'SELECT *\
        FROM posts\
        WHERE topic = $1;'
        return this.makeParamQuery(query, [topic]);
    }
    getPostById(post_id: number) {
        const query = `SELECT *\
        FROM posts\
        WHERE id = $1;`;
        return this.makeParamQuery(query, [String(post_id)]);
    }
    createPost(title: string, topic: string, body: string, user_name: string) {
        const query = `INSERT INTO posts (title, topic, body, user_name)\
        VALUES ('$1', '$2', '$3', '$4')\
        RETURNING id;`;
        return this.makeParamQuery(query, [title, topic, body, user_name]);
    }
    editPost(body: string, post_id: number) {
        const query = `UPDATE posts\
        SET body = '$1'\
        WHERE id = $2;`;
        return this.makeParamQuery(query, [body, String(post_id)]);
    }
    getAuthorByPostId(post_id: number) {
        const query = `SELECT user_name\
        FROM posts\
        WHERE id = $1;`;
        return this.makeParamQuery(query, [String(post_id)]);
    }
    async deletePost(post_id: number) {
        const deletePostQuery = `DELETE FROM posts\
        WHERE id = $1;`;
        const deletePostCommentsQuery = `DELETE FROM comments\
        WHERE post_id = $1;`;
        await this.makeParamQuery(deletePostCommentsQuery, [String(post_id)]);
        return await this.makeParamQuery(deletePostQuery, [String(post_id)]);
    }
}

class Comments extends Table {
    async initialize() {
        const startQuery = "CREATE TABLE comments (\
        id SERIAL PRIMARY KEY,\
        user_name VARCHAR(40) REFERENCES users(user_name),\
        body VARCHAR(1000),\
        time_stamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),\
        post_id INTEGER REFERENCES posts(id),\
        children INTEGER[] NOT NULL DEFAULT '{}');";
        return await this.makeQuery(startQuery);
    }
    createComment(user_name: string, body: string, post_id: number) {
        const query = `INSERT INTO comments (user_name, body, post_id)\
        VALUES ('$1', '$2', $3);`
        return this.makeParamQuery(query, [user_name, body, String(post_id)]);
    }
    editComment(id: number, body: string) {
        const query = `UPDATE comments\
        SET body = '$1'\
        WHERE id = $2;`;
        return this.makeParamQuery(query, [body, String(id)]);
    }
    deleteComment(id: number) {
        const query = `DELETE FROM posts\
        WHERE id = $1;`;
        return this.makeParamQuery(query, [String(id)]);
    }
    getCommentsByPostId(post_id: number) {
        const query = `SELECT *\
        FROM comments\
        WHERE post_id = $1;`;
        return this.makeParamQuery(query, [String(post_id)]);
    }
    getCommentAuthorByCommentId(id: number) {
        const query = `SELECT user_name\
        FROM comments\
        WHERE id = $1;`;
        return this.makeParamQuery(query, [String(id)]);
    }
}

class Users extends Table {
    async initialize() {
        const startQuery = "CREATE TABLE users(\
        id SERIAL PRIMARY KEY,\
        user_name VARCHAR(40) UNIQUE NOT NULL,\
        email VARCHAR(120),\
        upvoted INTEGER[] NOT NULL DEFAULT '{}',\
        downvoted INTEGER[] NOT NULL DEFAULT '{}',\
        password TEXT,\
        current_session TEXT);";
        return await this.makeQuery(startQuery);
    }
    getUserPublicInfo(user_name: string) {
        const query = `SELECT user_name, upvoted, downvoted\
        FROM users\
        WHERE user_name = '${user_name}';`;
        return this.makeQuery(query);
    }
    getUserIdFromUserName(user_name: string) {
        const query = `SELECT id\
        FROM users\
        WHERE user_name = '${user_name}';`;
        return this.makeQuery(query);
    }
    getPasswordByUserId(user_id: number) {
        const query = `SELECT password\
        FROM users\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    getUserFullInfo(user_name: string) {
        const query = `SELECT *\
        FROM users\
        WHERE user_name = '${user_name}';`;
        return this.makeQuery(query);
    }
    createUser(user_name: string, email: string, password: string, current_session: string) {
        const query = `INSERT INTO users (user_name, email, password, current_session)\
        VALUES ($1, $2, $3, $4);`;
        const values = [user_name, email, password, current_session];
        return this.makeParamQuery(query, values);
    }
    changePassword(user_id: number, newPassword: string) {
        const query = `UPDATE users\
        SET password = '${newPassword}'\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    changeEmail(user_id: number, newEmail: string) {
        const query = `UPDATE users\
        SET email = '${newEmail}'\
        WHERE id = ${user_id};`;
        return this.makeQuery(query)
    }
    changeUserName(user_id: number, newUserName: string) {
        const query = `UPDATE users\
        SET user_name = '${newUserName}'\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    deleteUser(user_id: number) {
        const query = `DELETE FROM users\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    getAllCommentsByUser(user_name: string) {
        const query = `SELECT *\
        FROM comments\
        WHERE user_name = '${user_name}'\
        ORDER BY time_stamp;`;
        return this.makeQuery(query);
    }
    getAllPostsByUser(user_name: string) {
        const query = `SELECT *\
        FROM posts\
        WHERE user_name = '${user_name}'
        ORDER BY time_stamp DESC;`;
        return this.makeQuery(query);
    }
    getUserFromSession(sessionID: string) {
        const query = `SELECT user_name\
        FROM users\
        WHERE current_session = '${sessionID}';`;
        return this.makeQuery(query);
    }
    endSession(user_name: string) {
        const query = `UPDATE users\
        SET current_session = ' '\
        WHERE user_name = '${user_name}';`;
        return this.makeQuery(query);
    }
    startSession(user_name: string, sessionID: string) {
        const query = `UPDATE users\
        SET current_session = '${sessionID}'\
        WHERE user_name = '${user_name}';`;
        return this.makeQuery(query);
    }
}

export const posts = new Posts();
export const users = new Users();
export const comments = new Comments();

