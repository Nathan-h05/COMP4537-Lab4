let url = require('url'); // url parsing

//require the dictionary for fetching words

//Handles Get Request with URL queries
exports.get = (req, res) => {
    console.log('Inside Get Call');

    console.log(req.body);
    console.log(req.method);
};