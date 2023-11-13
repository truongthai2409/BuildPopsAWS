const express = require('express');
const router = express.Router();
// const loginRouter = require('../controllers/LoginController');

router.get('/resetpass', (req, res, next) => {
    res.render('../public/views/pages/resetpass')
});
router.get('/email-verifications/:verify_token', (req, res, next) => {
    res.render('../public/views/pages/resetpass')
});
module.exports = router;