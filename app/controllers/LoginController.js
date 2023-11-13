class LoginController {
    //GET[] / index
    index(req, res) {
        res.render('../../public/index')
    }
}

module.exports = new LoginController();