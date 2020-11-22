const express = require('express');
const router = express.Router();
const linkModel = require('../models/link');

router.get('/:shortenUrl', function(req, res) {
    const shortenUrl = req.params.shortenUrl;
    linkModel.findOne({shortenedUrl: shortenUrl}, function (err, data) {
        if (err) {
            res.status(500);
            res.json({error: "Server Error"});
        }
        else if (!data) {
            res.status(404);
            res.json({error: "Not Found"});
        }
        else{
            let response = {redirectTo: ""};
            res.header("Location", data.locationUrl);
            response.redirectTo = data.locationUrl;
            res.status(200);
            res.json(response);
            ++data.viewCount;
            data.save();
        }
    });
});

router.get('/:shortenUrl/views', function(req, res) {
    const shortenUrl = req.params.shortenUrl;
    linkModel.findOne({shortenedUrl: shortenUrl}, function (err, data) {
        if (err) {
            res.status(500);
            res.json({error: "Server Error"});
        }
        else if (!data) {
            res.status(404);
            res.json({error: "Not Found"});
        }
        else{
            res.status(200);
            res.json({viewCount: data.viewCount});
        }
    });
});

module.exports = router;
