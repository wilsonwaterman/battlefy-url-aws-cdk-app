const Url = require("../models/url-schema");

exports.deleteUrl = (req, res, next) => {
    Url.deleteOne({ _id: req.params.id })
        .then((resp) => {
            res.status(200).json({ message: "URL and shortlink removed successfully" });
        })
        .catch((error) => {
            res.status(500).json({
                message: "URL and shortlink delete failed",
            });
        });
};
