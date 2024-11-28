// Save the token in the blacklist when the user logs out
const blacklist = new Set();

function addToBlacklist(token) {
    blacklist.add(token);
}

function isBlacklisted(token) {
    return blacklist.has(token);
}

export { addToBlacklist, isBlacklisted }

