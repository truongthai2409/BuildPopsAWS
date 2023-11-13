class DashboardController {
    //GET[] / index
    index(req, res) {
        // console.log()
        const reqData = req.data
        res.render('../public/views/pages/dashboards', {reqData: reqData})
    }
}

module.exports = new DashboardController();