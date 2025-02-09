function normalizeWord(word) {
    return word
        .trim() // Remove leading/trailing spaces
        .replace(/\s*\/+$/, '') // Remove trailing slashes and any spaces before them
        .replace(/\s+/g, ' '); // Normalize multiple spaces to a single space
}

function isValidText(input) {
    // Regular expression to allow letters, spaces, hyphens, and apostrophes
    const regex = /^[a-zA-Z\s\-']+$/;
    return regex.test(input);
}

// Export the functions
module.exports = {
    normalizeWord,
    isValidText
};