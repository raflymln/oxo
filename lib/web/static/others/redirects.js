module.exports = {
    route: '/r/:heading',
    method: 'get',
    run: (bot, db, req, res) => {
        const redir = config.web.links[req.params.heading];
        res.redirect((redir) ? redir : '/');
    }
}