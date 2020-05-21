/**
 * Created by gaozy on 5/18/20.
 */

var express = require('express');
const http = require('http');

var router = express.Router();

const dbHostname = "c240g2-031325.wisc.cloudlab.us";
const dbPort = 3000;
const dbPath = "/db";
var gameServer='';
/*
QUESTIONS={
    1: "1. Overall rating of the gaming experience",
    2: "2. Game control: how easy to play the game",
    3: "3. Responsiveness: how responsive the game is"
};
*/

QUESTIONS={
    1: "1. Responsiveness: how responsive the game is"
};

router.get('/:hostname/:ping/:totalTime', function(req, res){
    // console.log(req.params.l+','+req.params.ping);
    //console.log('gameServer: '+global.gameServer);
    res.render('question', { title: 'Survey', hostname:req.params.hostname, ping:req.params.ping, totalTime:req.params.totalTime, questions:QUESTIONS});
});

router.post('/:hostname/:ping/:totalTime', function(req, res){
    console.log('gameServer: '+global.gameServer);
    var result = JSON.parse(JSON.stringify(req.body));
	result.hostname = req.params.hostname;
    result.l = global.gameServer;
    result.ping = req.params.ping;
    result.totalTime = req.params.totalTime;
    result.remoteTime = new Date();
    result.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    result.agent = req.get('user-agent');
    //console.log(req);
    //console.log(JSON.stringify(req.body));

    var post_data = JSON.stringify(result);
    var post_options = {
        hostname: dbHostname,
        port: dbPort,
        path: dbPath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(resp) {
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            // console.log('Response: ' + chunk);
            res.redirect('/');
            // res.sendStatus(200);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

});

router.get('/speedtest', function(req, res){
    // console.log("req:"+req);
    res.sendStatus(200);
});

module.exports = router;
