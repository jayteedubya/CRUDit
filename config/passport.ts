import * as passport from 'passport'
import * as bcrypt from 'bcrypt';
import * as local from 'passport-local';
import * as db from '../databaseHandler';

const localStrategy = local.Strategy;

passport.use(new localStrategy(async (user: string, password: string, done) => {
    try {
        const userId = await db.users.getUserIdFromUserName(user);
        const userInfo = await db.users.getUserFullInfo(userId)[0];
        const result = await bcrypt.compare(password, userInfo.password);  //boolean
        if (result) {
            done(null, {id: userInfo.id, username: userInfo.username,});
            return;
        }
        if (!result) {
            done(null, false);
            return;
        }
    }
    catch (err) {
        done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.users.getUserFullInfo(id);
        done(null, result[0]);
      }
    catch (err) {
        done(err);
    }
  
      
    })
  })
  