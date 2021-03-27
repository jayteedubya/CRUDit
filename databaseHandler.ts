import * as pg from 'pg';

class Table {
    getNewClient() {
        return new pg.Client({connectionString: process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}});
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
}

class Posts extends Table {
    async initialize() {
        const startQuery = "CREATE TABLE posts (\
        id SERIAL PRIMARY KEY,\
        title VARCHAR(100) NOT NULL,\
        topic VARCHAR(30),\
        upvotes INTEGER DEFAULT 0,\
        time_stamp TIMESTAMP NOT NULL DEFAULT NOW(),\
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
    getAllOrderedByRank() {
        const query = 'SELECT *\
        FROM posts\
        ORDER BY upvotes DESC;'
        return this.makeQuery(query);
    }
    getAllByTopic(topic: string) {
        const query = `SELECT *\
        FROM posts\
        WHERE topic = '${topic}';`
        return this.makeQuery(query);
    }
    getPostById(post_id: number) {
        console.log(post_id);
        const query = `SELECT *\
        FROM posts\
        WHERE id = ${post_id};`;
        return this.makeQuery(query);
    }
    createPost(title: string, topic: string, body: string, user_name: string) {
        const query = `INSERT INTO posts (title, topic, body, user_name)\
        VALUES ('${title}', '${topic}', '${body}', '${user_name}')\
        RETURNING id;`;
        return this.makeQuery(query);
    }
    editPost(body: string, post_id: number) {
        const query = `UPDATE posts\
        SET body = '${body}'\
        WHERE id = ${post_id};`;
        return this.makeQuery(query);
    }
    deletePost(post_id: number) {
        const query = `DELETE FROM posts\
        WHERE id = ${post_id};`;
        return this.makeQuery(query);
    }
    upvote(post_id: number) {
        const query = `UPDATE posts\
        SET upvotes = upvotes + 1
        WHERE id = ${post_id}`;
        return this.makeQuery(query);
    }
    downvote(post_id: number) {
        const query = `UPDATE posts\
        SET upvotes = upvotes - 1
        WHERE id = ${post_id}`;
        return this.makeQuery(query);
    }
}

class Comments extends Table {
    async initialize() {
        const startQuery = "CREATE TABLE comments (\
        id SERIAL PRIMARY KEY,\
        user_name VARCHAR(40) REFERENCES users(user_name),\
        body VARCHAR(1000),\
        time_stamp DATE NOT NULL DEFAULT NOW(),\
        post_id INTEGER REFERENCES posts(id),\
        children INTEGER[] NOT NULL DEFAULT '{}');";
        return await this.makeQuery(startQuery);
    }
    createComment(user_name: string, body: string, post_id: number) {
        const query = `INSERT INTO comments (user_name, body, post_id)\
        VALUES ('${user_name}', '${body}', ${post_id});`
        return this.makeQuery(query);
    }
    editComment(id: number, body: string) {
        const query = `UPDATE comments\
        SET body = '${body}'\
        WHERE id = ${id};`;
        return this.makeQuery(query);
    }
    deleteComment(id: number) {
        const query = `DELETE FROM posts\
        WHERE id = ${id};`;
        return this.makeQuery(query);
    }
    getCommentsByPostId(post_id: number) {
        const query = `SELECT *\
        FROM comments\
        WHERE post_id = ${post_id};`;
        return this.makeQuery(query);
    }
    addChildComment(parent_id: number, child_id: number) {
        const query = `UPDATE comments\
        SET children = array_append(children, ${child_id})\
        WHERE id = ${parent_id};`;
        return this.makeQuery(query);
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
        password TEXT);";
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
    getUserFullInfo(user_id: number) {
        const query = `SELECT *\
        FROM users\
        WHERE id = ${user_id};`;
        return this.makeQuery(query);
    }
    createUser(user_name: string, email: string, password: string) {
        const query = `INSERT INTO users (user_name, email, password)\
        VALUES ('${user_name}', '${email}', '${password}');`;
        return this.makeQuery(query);
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
        WHERE user_name = '${user_name}';`;
        return this.makeQuery(query);
    }
}



export const posts = new Posts();
export const users = new Users();
export const comments = new Comments();