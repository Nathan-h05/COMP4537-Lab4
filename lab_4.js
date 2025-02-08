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
    else { // request is non existent we give an internal error
        res.writeHead(404, {'Content-Type': 'text/html',});
        res.write(
            `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw;">
                    <h1 style="color: red; text-align: center;">404 Page not found</h1>
            </div>`
        );
        res.end();
    }   
}