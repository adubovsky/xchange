var express = require('express'),
    Account = require('../models/account'),
    router = express.Router(),
    isAuth = require('../middleware/auth'),
    path = require('path');

router.get('/', function (req, res) {
    res.sendFile('/index.html');
});

router.get('/partials/admin/*', isAuth('admin'), function (req, res) {
    res.sendFile(path.join('/partials/admin/', req.params[0]));
});

module.exports = router;