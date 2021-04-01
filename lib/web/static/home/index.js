module.exports = {
    route: '/',
    method: 'get',
    run: (bot, db, req, res) => {
        res.redirect('https://docs.oxo.my.id')
    }
}