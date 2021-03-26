import * as passport from 'passport';
import * as localStrategy from 'passport-local';
import * as db from'../databaseHandler'
import * as bcrypt from 'bcrypt';

passport.use(new localStrategy( async (username: string, password: string, done) => {
    const userIdQuery = await db.users.getUserIdFromUserName(username);
    const userId: number = userIdQuery.rows[0];
    const storedPasswordQuery = await db.users.getPasswordByUserId(userId);
    const storedPassword: string = storedPasswordQuery.rows[0];
    const isValidPassword: boolean = bcrypt.compare(password, storedPassword) //this compares a plaintext password to a hashed password
    if (isValidPassword) {
        done(null, username);
        return;
    }
    done(null, false)
}))