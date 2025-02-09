let url = require('url'); // url parsing
// let msg = require('../../../lang/en/en.js'); // langauge file access

const {post} = require('./api_post.js');
const {get} = require('./api_get.js');

exports.lab4_activate = (req, res) => {
    let q = url.parse(req.url, true);

    //Re routes based on request method
    if(req.method === 'GET') 
        get(req, res); 
    else if (req.method === 'POST') 
        post(req, res);
    else { 
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: '404 Page not found' }));
    }   
}