export function needAuth(req, res, next) {
  if (!req.auth) {
    return res.status(401)
  }
  next()
}

export function checkAuth(req, res, next) {
  req.auth = null
  if (req.token) {
    const obj = JSON.parse(req.token)
    if ('id' in obj) {
      req.auth = {
        id: obj.id,
      }
    }
  }
  next()
}
