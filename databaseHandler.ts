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
            body VARCHAR(5000);'
        this.makeQuery(startQuery);
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
            parent INTEGER;'
        this.makeQuery(startQuery);
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