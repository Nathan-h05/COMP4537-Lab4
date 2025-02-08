//require dictionary to add stuff into it

//Handles Post request and adding words into dictionary from req.body
exports.post = (req, res) => {
    console.log('Inside Post call');

    console.log(req.body); // cant use this until we write the header and we are recieving an application/json
    console.log(req.method);
};