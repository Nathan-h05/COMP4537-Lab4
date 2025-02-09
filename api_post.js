// Import dictonary.js
const dictionary = require('./dictionary.js').dictionary;

function normalizeWord(word) {
    return word
        .trim() // Remove leading/trailing spaces
        .replace(/\s*\/+$/, '') // Remove trailing slashes and any spaces before them
        .replace(/\s+/g, ' '); // Normalize multiple spaces to a single space
}

exports.post = (req, res) => {
    let body = ''; // empty string for request body
    req.on('data', chunk => {
        body += chunk.toString(); // Collect the data from the request body
    });
    req.on('end', () => {
        const data = JSON.parse(body); // Parse the body as JSON
        // const word = data.word.toLowerCase(); // Extract and convert word to lowercase
        const word = normalizeWord(data.word.toLowerCase()); // Normalize and lowercase the word
        const definition = data.definition;

        if (!word || !definition) { // Check if word or definition is missing
            res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ 
                message: 'Both word and definition are required.' }));
            return;
        }

        if (dictionary[word]) { // Check if word already exists in dictionary
            res.writeHead(409, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ message: `Warning! '${word}' already exists.` }));
        } else { 
            dictionary[word] = definition; // Add new word and definition to dictionary
            res.writeHead(201, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ 
                message: `New entry recorded: "${word} : ${definition}"`,
                totalEntries: Object.keys(dictionary).length
            }));
        }
    });
};