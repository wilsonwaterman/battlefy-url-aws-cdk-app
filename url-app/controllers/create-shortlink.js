const Url = require("../models/url-schema");

exports.createUrlEntry = (req, res, next) => {
    //call function to convert and return shortlink here
    const urlToStore = new Url ({
        url: req.body.url,
        shortlink: generateShortlink(req.body.url),
    });
    console.log(urlToStore);
    urlToStore
        .save()
        .then((result) => {
            res.status(201).json({
                message: "URL and shortlink added successfully",
                post: {
                    ...result,
                    id: result._id,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "URL storage and shortlink generation failed",
            });
        });
};

function generateShortlink(originalUrl) {
    var shortlink = "wilsonurl.";

    for (i=0; i<originalUrl.length; i++) {
        var c = originalUrl.charAt(i);
        if ((i%5) && ((c != ".") && (c != "/") && (c != ":"))) {
            shortlink += c;
        }
    }
    

    return shortlink;

}
