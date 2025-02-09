// Chatgpt was used in creation of the code

// Imports
const { dictionary, globalRequestCount } = require('./dictionary.js');
const { normalizeWord, isValidText } = require('./utils.js');

exports.post = (req, res) => {
    let body = ''; // empty string for request body
    req.on('data', chunk => {
        body += chunk.toString(); // Collect the data from the request body
    });
    req.on('end', () => {
        const data = JSON.parse(body); // Parse the body as JSON
        const word = normalizeWord(data.word.toLowerCase()); // Normalize and lowercase the word
        const definition = data.definition;

        if (!word || !definition) { // Check if word or definition is missing
            res.writeHead(400, {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*' 
            });
            res.end(JSON.stringify({ 
                message: 'Both word and definition are required.',
                totalRequests: globalRequestCount.requestCount
            }));
            return;
        }

        // Validate word and definition
        if (!isValidText(word) || !isValidText(definition)) {
            res.writeHead(400, {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*' 
            });
            res.end(JSON.stringify({ 
                message: 'Word and definition must contain only letters, spaces, hyphens, and apostrophes.',
                totalRequests: globalRequestCount.requestCount
            }));
            return;
        }

        if (dictionary[word]) { // Check if word already exists in dictionary
            res.writeHead(409, { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*' 
            });
            res.end(JSON.stringify({ 
                message: `Warning! '${word}' already exists.`,
                totalRequests: globalRequestCount.requestCount
            }));
        } else { 
            dictionary[word] = definition; // Add new word and definition to dictionary
            res.writeHead(201, { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*' 
            });
            res.end(JSON.stringify({ 
                message: `New entry recorded: "${word} : ${definition}"`,
                totalEntries: Object.keys(dictionary).length,
                totalRequests: globalRequestCount.requestCount 
            }));
        }
    });
};