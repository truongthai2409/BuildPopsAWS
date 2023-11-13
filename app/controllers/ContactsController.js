class NewsContactsController {
    //GET[] / index
    index(req, res) {
        let data = req.data;
        // let newData = data
        res.render('../public/views/pages/contacts', {reqData: data})
    }
    detail(req, res) {
        let data = req.data;
        // let newData = data
        res.render('../public/views/pages/detail_staffs', {reqData: data})
    }
    create(req, res){
        res.render('../public/views/pages/create_staffs')
    }
}

module.exports = new NewsContactsController();