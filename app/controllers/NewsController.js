class NewsController {
    //GET[] / index
    index(req, res) {
        res.render('../public/views/pages/login')
    }
}

module.exports = new NewsController();