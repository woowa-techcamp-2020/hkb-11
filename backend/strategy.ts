import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github'
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
}
