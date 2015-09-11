function checkAuthRole(role) {

    function isAuth(req, res, next) {
        if (req.user) {
            if (role && role !== req.user.role) {
                res.status(403);
                res.end('');
            } else {
                next();
            }
        } else {
            res.status(401);
            res.end('');
        }
    }

    return isAuth
}


module.exports = checkAuthRole;