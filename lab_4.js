// let url = require('url'); // url parsing
// // let msg = require('../../../lang/en/en.js'); // langauge file access

// const {post} = require('./api_post.js');
// const {get} = require('./api_get.js');

// exports.lab4_activate = (req, res) => {
//     let q = url.parse(req.url, true);

//     //Re routes based on request method
//     console.log('Request')
//     if(req.method === 'GET') {
//         console.log('GET request received');
//         get(req, res); 
//     } else if (req.method === 'POST') {
//         console.log('POST request received');
//         post(req, res);
//     }else { 
//         console.log('POST request sdfad');
//         res.writeHead(404, { 
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*'
//      });
//         res.end(JSON.stringify({ message: '404 Page not found' }));
//     }   
// }


let url = require('url'); // url parsing
const { post } = require('./api_post.js');
const { get } = require('./api_get.js');

function addCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

exports.lab4_activate = (req, res) => {
    addCorsHeaders(res); // Add CORS headers

    let q = url.parse(req.url, true);

    // Handle preflight (OPTIONS) request
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end();
        return;
    }

    // Log the request method and URL for debugging
    console.log(`Request method: ${req.method}, URL: ${req.url}`);

    // Re-routes based on request method
    if (req.method === 'GET') {
        console.log('GET request received');
        get(req, res);
    } else if (req.method === 'POST') {
        console.log('POST request received');
        post(req, res);
    } else {
        console.log('Unexpected request method');
        res.writeHead(404, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end(JSON.stringify({ message: '404 Page not found' }));
    }
};

