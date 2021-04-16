import * as db from './databaseHandler';

const initializeAll = async () => {
    await db.users.initialize();
    await db.posts.initialize();
    await db.comments.initialize();
}

initializeAll();