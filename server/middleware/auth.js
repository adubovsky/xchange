function isAuth(req, res, next) {
    if(req.user){
        next();
    } else {
        res.status(401);
        res.end('');
    }
}

module.exports = isAuth;