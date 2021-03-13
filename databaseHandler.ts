import pg from 'pg';

class Table {
    getNewClient() {
        return new pg.Client();
    }
    async makeQuery(query: string) {
        const client = this.getNewClient();
        client.connect();
        const queryResult = await client.query(`{query}`);
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
            time_stamp DATE NOT NULL DEFAULT NOW()\
            body VARCHAR(5000)\
            user_id INTEGER REFERENCES users(id);'
        this.makeQuery(startQuery).then(result => console.log(result)).catch(err => console.warn(err));
        return;
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
        this.makeQuery(query).then(result => console.log(result)).catch(err => console.warn(err));
        return;
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
            parent INTEGER;';
        this.makeQuery(startQuery);
        return;
    }
    //move error handling to server
    createComment(user_id: number, body: string, post_id: number) {
        const query = `INSERT INTO comments (user_id, body, post_id)\
        VALUES (${user_id}, ${body}, ${post_id});`;
        this.makeQuery(query).then(result => console.log(result)).catch(err => console.warn(err));
    }
    editComment(id: number, body: string) {
        const query = `UPDATE comments\
        SET body = ${body}\
        WHERE id = ${id};`;
        this.makeQuery(query).then(result => console.log(result)).catch(err => console.warn(err))
    }
    deleteComment(id: number) {
         const query = `DELETE FROM posts\
         WHERE id = ${id};`;
         this.makeQuery(query).then(result => console.log(result)).catch(err => console.warn(err));
         return;
    }
    getCommmentsByPostId(post_id: number) {
        const query = `SELECT *\
        FROM comments\
        WHERE post_id = ${post_id};`;
        this.makeQuery(query).then(result => console.log(result)).catch(err => console.warn(err));
        return;
    }
    getAllCommentsByUser(user_id: number) {
        const query = `SELECT *\
        FROM comments\
        WHERE user_id = ${user_id};`;
        this.makeQuery(query).then(result => console.log(result)).catch(err => console.warn(err));
        return;
    }

}

class Users extends Table {
    initialize() {
        const startQuery = 'CREATE TABLE users(\
            id SERIAL PRIMARY KEY,\
            user_name VARCHAR(40) NOT NULL,\
            email VARCHAR(120)\
            upvoted INTEGER[]\
            downvoted INTEGER[]\
            password TEXT;'
    }
}