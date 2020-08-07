import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github'
import { Strategy } from 'passport-local'
export default function setup() {
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://13.125.125.191:3000/auth/callback',
      },
      function (accessToken, refreshToken, profile, callback) {
        const { id } = profile

        callback(null, { id, accessToken, refreshToken })
      }
    )
  )
  passport.use(
    new Strategy(
      {
        usernameField: 'id',
        passwordField: 'password',
      },
      function (id, password, done) {
        // TODO: DB에서 제대로 된 유저와 비밀번호가 맞는지 확인하기.
        if (id === 'agrajak') {
          return done(null, {
            id,
          })
        }
        return done(null, false, {
          message: 'Failed to login',
        })
      }
    )
  )
}
