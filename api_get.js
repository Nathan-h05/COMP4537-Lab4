// Chatgpt was used in creation of the code

// Imports
const url = require('url');
const { dictionary, globalRequestCount } = require('./dictionary.js');
const { normalizeWord, isValidText } = require('./utils.js'); 

exports.get = (req, res) => {
    const q = url.parse(req.url, true).query; // Parse the URL to get query parameters
    const word = normalizeWord(q.word.toLowerCase()); // Normalize and lowercase word

    if (!word) { // Check if word is missing or empty
        res.writeHead(400, { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' 
        });
        res.end(JSON.stringify({ 
            message: 'Word parameter is required.',
            totalRequests: globalRequestCount.requestCount 
        }));
        return;
    }

    // Validate word and definition
    if (!isValidText(word)) {
        res.writeHead(400, { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' 
        });
        res.end(JSON.stringify({ 
            message: 'Word must contain only letters, spaces, hyphens, and apostrophes.',
            totalRequests: globalRequestCount.requestCount
        }));
        return;
    }

    if (dictionary[word]) { // Check if word exists in dictionary
        res.writeHead(200, { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
            word: word,
            definition: dictionary[word],
            totalRequests: globalRequestCount.requestCount
        }));
    } else { // Word not found in dictionary
        res.writeHead(404, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
        });
        res.end(JSON.stringify({ 
            message: `Request# ${globalRequestCount.requestCount}, word '${word}' not found!`,
            totalRequests: globalRequestCount.requestCount
        }));
    }
};