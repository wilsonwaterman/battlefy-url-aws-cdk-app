const Url = require("../models/url-schema.js");

exports.getURLs = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currPage = +req.query.page;
    const urlQuery = Url.find();
    let fetchedUrl;
    if (pageSize && currpage) {
        urlQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    urlQuery
    .then((doc) => {
        fetchedUrl = doc;
        return Url.countDocuments();
    })
    .then((count) => {
        res.status(200).json({
            message: "All links fetched",
            posts: fetchedUrl,
            maxPosts: count,
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Fetching URLs failed",
        });
    });
};

exports.resolveUrlFromShortlink = (req, res, next) => {
    Url.findByShortlink(req.params.shortlink)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "URL not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "URL resolving failed",
            });
        });
};
