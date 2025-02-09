// Imports
const url = require('url');
const dictionary = require('./dictionary.js').dictionary;

function normalizeWord(word) {
    return word
        .trim() // Remove leading/trailing spaces
        .replace(/\s*\/+$/, '') // Remove trailing slashes and any spaces before them
        .replace(/\s+/g, ' '); // Normalize multiple spaces to a single space
}

exports.get = (req, res) => {
    const q = url.parse(req.url, true).query; // Parse the URL to get query parameters
    // const word = q.word.toLowerCase(); // Extract and convert word to lowercase
    const word = normalizeWord(q.word.toLowerCase()); // Normalize and lowercase word

    if (!word) { // Check if word is missing or empty
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: 'Word parameter is required.' }));
        return;
    }

    if (dictionary[word]) { // Check if word exists in dictionary
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            word: word,
            definition: dictionary[word],
            totalRequests: req.requestCount // Request count
        }));
    } else { // Word not found in dictionary
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: `Request# ${req.requestCount}, word '${word}' not found!` 
        }));
    }
};