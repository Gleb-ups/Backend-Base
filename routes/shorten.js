const express = require('express');
const validUrl = require('../utils/url');
const linkModel = require('../models/link');
const nanoid = require('nanoid').nanoid;
const mainUrl = require('../constants').SERVER_URL;

const router = express.Router();

router.post('/', function (req, res, next) {
    let response = {
        status: "",
        shortenedUrl: "",
        error: "",
    };

    let urlToShorten = req.body.urlToShorten;
    if (!urlToShorten) {
        response.status = "Error";
        response.error = `Field "urlToShorten" is required`;
        res.status(400)
        res.json(response)
    } else if (!validUrl(urlToShorten)) {
        response.status = "Error";
        response.error = `Field "urlToShorten" must be a valid url`;
        res.status(400)
        res.json(response)
    } else {
        if (urlToShorten[urlToShorten.length - 1] === '/')
            urlToShorten = urlToShorten.substring(0, urlToShorten.length - 1);   // delete '/' in the end of url
        linkModel.findOne({locationUrl: urlToShorten}, function (err, data) {
            if (err) {
                response.status = "Error";
                response.error = "Server Error";
                res.status(500);
                res.json(response);
            } else if (data) {
                response.status = "Exist";
                response.shortenedUrl = mainUrl + data.shortenedUrl;
                res.status(200);
                res.json(response);
            } else {
                uniqId = nanoid(8);
                const link = new linkModel({
                    locationUrl: urlToShorten,
                    shortenedUrl: uniqId,
                    viewCount: 0
                })
                link.save().then(() => {
                    response.status = "Created";
                    response.shortenedUrl = mainUrl + uniqId;
                    res.status(200);
                    res.json(response);
                });
            }
        });
    }
});


module.exports = router;
