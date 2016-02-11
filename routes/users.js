var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('To display User, respond with a resource');
    /*res.render('user', {
         user: req.user
     });*/
});

module.exports = router;