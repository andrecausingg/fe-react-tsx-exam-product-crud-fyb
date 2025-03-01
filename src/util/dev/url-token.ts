// Extract JWT token from URL
const url = window.location.href; // Get current URL
const tokenRegex = /\/verification\/([^\/?#]+)/; // Regex to match the token after '/verification/'
const match = url.match(tokenRegex); // Match the token in the URL

export const extractedUrlToken = match && match.length > 1 ? match[1] : null;
